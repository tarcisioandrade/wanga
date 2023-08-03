import { Request, Response } from "express";
import { PushToken } from "../models/PushToken.model";
import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";

require("dotenv").config();

const pushTokenModel = new PushToken();

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
});

type Receipts = {
  id: string;
  token: string;
};

export class NotificationController {
  constructor() {
    this.pushNotification = this.pushNotification.bind(this);
    this.addPushTokenNotification = this.addPushTokenNotification.bind(this);
    this.deleteTokenNotification = this.deleteTokenNotification.bind(this);
  }

  async addPushTokenNotification(req: Request, res: Response) {
    const { token } = req.body;

    try {
      if (!token) {
        res.status(400).json({
          message: "The token was not provided",
        });
        return;
      }

      if (!Expo.isExpoPushToken(token)) {
        res.status(400).json({
          message: "Invalid token",
        });
        return;
      }
      const tokenHasAdded = await pushTokenModel.getToken(token);

      if (tokenHasAdded) {
        res.sendStatus(200);
        return;
      }

      await pushTokenModel.addToken(token);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async pushNotification(req: Request, res: Response) {
    const { title, message } = req.body;
    try {
      if (!message || !title) {
        res.status(400).json({
          message: "Please provide all info to schedule notification.",
        });
        return;
      }

      let messages: ExpoPushMessage[] = [];

      const somePushTokens = await pushTokenModel.getAllTokens();

      if (!somePushTokens) {
        res.status(400).json({
          message: "Failed in get tokens.",
        });
        return;
      }

      if (!somePushTokens.length) {
        res.status(400).json({
          message: "No have push token to schedule notification",
        });
        return;
      }

      for (let pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken.token)) {
          console.log(`Push token ${pushToken.token} é inválido`);
          await pushTokenModel.deleteToken(pushToken.token);
          continue;
        }

        messages.push({
          to: pushToken.token,
          sound: "default",
          title,
          body: message,
        });
      }

      if (!messages.length) {
        res.status(400).json({
          message: "No messages to delivery.",
        });

        return;
      }

      const chunks = expo.chunkPushNotifications(messages);
      const receiptsArray: Receipts[] = [];

      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          receipts.forEach((receipt, index) => {
            const pushToken = messages[index].to;
            const token =
              typeof pushToken === "string" ? pushToken : pushToken[0];

            if (receipt.status === "error") {
              console.error(
                `Falha ao enviar notificação para o token ${pushToken}`
              );

              pushTokenModel.deleteToken(token);
            } else if (receipt.status === "ok") {
              receiptsArray.push({
                id: receipt.id,
                token,
              });
            }
          });
        } catch (error) {
          console.error("Erro ao enviar notificações:", error);
        }
      }

      if (!receiptsArray.length) {
        res.status(400).json({
          message: "No receiptIds to delivery.",
        });

        return;
      }

      const receiptsId = receiptsArray.map((rec) => rec.id);
      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptsId);

      for (let receiptChunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(
            receiptChunk
          );

          for (let receiptId in receipts) {
            let receiptTarget = receipts[receiptId];

            if (receiptTarget.status === "ok") {
              continue;
            } else if (receiptTarget.status === "error") {
              console.error(
                `There was an error sending a notification: ${receiptTarget.message}`
              );

              const tokenToRemove = receiptsArray.find(
                (rec) => rec.id === receiptId
              );

              if (tokenToRemove) {
                await pushTokenModel.deleteToken(tokenToRemove.token);
              }
            }
          }
        } catch (error) {
          console.error("receipt Error", error);
          res.status(400).json({
            error,
          });
          return;
        }
      }
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async deleteTokenNotification(req: Request, res: Response) {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        message: "Please send token to delete.",
      });
      return;
    }

    try {
      await pushTokenModel.deleteToken(token);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

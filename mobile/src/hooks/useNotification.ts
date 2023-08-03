import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { addPushToken, delPushToken } from "src/api/wangaServices";
import * as Device from "expo-device";

export const useNotification = () => {
  const alterNotification = async (status: boolean) => {
    if (!status) {
      await AsyncStorage.removeItem("@notification-disabled");
      return;
    }
    Promise.all([
      AsyncStorage.setItem("@notification-disabled", JSON.stringify(status)),
      deleteTokenFromDB(),
    ]);
  };

  const getAllowNotification = async () => {
    return await AsyncStorage.getItem("@notification-disabled");
  };

  const registerDevicePushTokenAsync = async (
    token: Notifications.ExpoPushToken
  ) => {
    try {
      await addPushToken(token.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTokenFromDB = async () => {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      delPushToken(token.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async function registerForPushNotificationsAsync(alertUser?: boolean) {
    const notificationDisabled = await getAllowNotification();

    if (notificationDisabled) return;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted" && !notificationDisabled) {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted" && !notificationDisabled) {
        await alterNotification(true);

        if (alertUser) {
          Alert.alert(
            "Notificações desabilitadas",
            "Para receber notificações, habilite-as nas configurações do seu dispositivo.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Abrir Configurações",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
          throw new Error("User doesn't allow for notification.");
        }

        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();
      registerDevicePushTokenAsync(token);
    }
  }

  return {
    alterNotification,
    getAllowNotification,
    registerForPushNotificationsAsync,
  };
};

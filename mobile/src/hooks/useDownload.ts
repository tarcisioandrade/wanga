import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatFileSizeInMB } from "src/utils/formatFileSizeInMB";
import * as Crypto from "expo-crypto";

export type DownloadHistoric = {
  id: string;
  image: string | null;
  fileName: string;
  downloadDate: string;
  id_manga: number;
  size: string;
};

const EXTENSION_IMAGE_REGEXP = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
const { StorageAccessFramework } = FileSystem;

export const useDownload = () => {
  const saveDownloadInHistoric = async (
    albumName: string,
    fileSize: number,
    id_manga: number,
    image: string | undefined
  ) => {
    const fileSizeToMB = formatFileSizeInMB(fileSize);
    const uuid = Crypto.randomUUID();

    const downloadDetails: DownloadHistoric = {
      id: uuid,
      image: image ?? null,
      fileName: albumName,
      downloadDate: new Date().toISOString(),
      id_manga,
      size: `${fileSizeToMB}MB`,
    };

    let existingHistoric = await AsyncStorage.getItem("downloadHistoric");
    const history = existingHistoric
      ? (JSON.parse(existingHistoric) as DownloadHistoric[])
      : [];

    history.push(downloadDetails);

    AsyncStorage.setItem("downloadHistoric", JSON.stringify(history));
  };

  const getDownloadHistoric = async () => {
    const history = await AsyncStorage.getItem("downloadHistoric");

    return history ? (JSON.parse(history) as DownloadHistoric[]) : null;
  };

  const updateDownloadHistoric = async (newValue: DownloadHistoric[]) => {
    await AsyncStorage.setItem("downloadHistoric", JSON.stringify(newValue));
  };

  const handleDownload = async (
    imageUrl: string,
    i: number,
    dirGranted: string
  ) => {
    const extensionImage = imageUrl.match(EXTENSION_IMAGE_REGEXP)![1];
    const fileName = `${i}.${extensionImage}`;
    let fileUri = FileSystem.documentDirectory + fileName;

    try {
      const res = await FileSystem.downloadAsync(imageUrl, fileUri);
      const fileSize = parseFloat(res.headers["content-length"]);
      saveAndroidFile(
        fileUri,
        fileName,
        res.headers["content-type"],
        dirGranted
      );

      return fileSize;
    } catch (e) {
      console.error("download error:", e);
    }
  };

  const saveAndroidFile = async (
    fileUri: string,
    fileName: string,
    mimeType: string,
    directoryUri: string
  ) => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      try {
        await StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          mimeType
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (e) {
        throw e;
      }
    } catch (err) {}
  };

  return {
    handleDownload,
    saveDownloadInHistoric,
    getDownloadHistoric,
    updateDownloadHistoric,
  };
};

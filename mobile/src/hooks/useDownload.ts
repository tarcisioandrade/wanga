import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
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

  //TODO: Testar a criação de pasta no prebuild;
  const handleDownload = async (
    imageUrl: string,
    i: number,
    albumName: string
  ) => {
    const extensionImage = imageUrl.match(EXTENSION_IMAGE_REGEXP)![1];

    // let rootDirectory = FileSystem.documentDirectory + "Wanga/";
    // let albumDirectory = rootDirectory + albumName + "/";
    // let fileUri = albumDirectory + `${i}.jpg`;
    let fileUri = FileSystem.documentDirectory + `${i}.${extensionImage}`;

    try {
      // const rootFolderInfo = await FileSystem.getInfoAsync(rootDirectory);
      // if (!rootFolderInfo.exists) {
      //   await FileSystem.makeDirectoryAsync(rootDirectory, {
      //     intermediates: true,
      //   });
      // }

      // const albumFolderInfo = await FileSystem.getInfoAsync(albumDirectory);
      // if (!albumFolderInfo.exists) {
      //   await FileSystem.makeDirectoryAsync(albumDirectory, {
      //     intermediates: true,
      //   });
      // }

      const res = await FileSystem.downloadAsync(imageUrl, fileUri);
      const fileSize = parseFloat(res.headers["content-length"]);

      saveFile(res.uri, albumName);

      return fileSize;
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  const saveFile = async (fileUri: string, albumName: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync(albumName);

      if (album == null) {
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (err) {
      console.error("Save err: ", err);
      throw err;
    }
  };

  return {
    handleDownload,
    saveDownloadInHistoric,
    getDownloadHistoric,
    updateDownloadHistoric,
  };
};

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type DownloadHistory = {
  fileName: string;
  downloadDate: string;
  directory: string;
};

const EXTENSION_IMAGE_REGEXP = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

export const useDownload = () => {
  const saveDownloadInHistory = async (albumName: string) => {
    const downloadDetails: DownloadHistory = {
      fileName: albumName,
      downloadDate: new Date().toISOString(),
      directory: FileSystem.documentDirectory + albumName,
    };

    let existingHistory = await AsyncStorage.getItem("downloadHistory");
    const history = existingHistory
      ? (JSON.parse(existingHistory) as DownloadHistory[])
      : [];

    history.push(downloadDetails);

    AsyncStorage.setItem("downloadHistory", JSON.stringify(history));
  };

  const getDownloadHistory = async () => {
    const history = await AsyncStorage.getItem("downloadHistory");

    return history ? (JSON.parse(history) as DownloadHistory[]) : null;
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
      saveFile(res.uri, albumName);
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

  return { handleDownload, saveDownloadInHistory, getDownloadHistory };
};

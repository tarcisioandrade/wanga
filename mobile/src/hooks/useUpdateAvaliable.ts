import { useState } from "react";
import { getApplication } from "src/api/wangaServices";
import * as DeviceInfo from "react-native-device-info";

function formatterVersion(version: string) {
  return parseFloat(version.replace(".", ""));
}

export const useUpdateAvaliable = () => {
  const [loading, setLoading] = useState(false);

  const currentClientVersion = DeviceInfo.getVersion();

  const handleUpdate = async () => {
    if (__DEV__) return false;
    try {
      setLoading(true);
      const app = await getApplication();

      const updateAvaliable =
        formatterVersion(app.application.version) >
        formatterVersion(currentClientVersion);

      return updateAvaliable;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate, loading, currentClientVersion };
};

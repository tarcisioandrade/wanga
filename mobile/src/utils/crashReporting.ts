import crashlytics from "@react-native-firebase/crashlytics";
import { isAxiosError } from "axios";

export const reportCrash = (error: unknown, describe: string) => {
  if (__DEV__) {
    console.error(error, describe);
  } else {
    if (isAxiosError(error) || error instanceof Error) {
      crashlytics().recordError(error, describe);
    }
  }
};

import { useState } from "react";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { reportCrash } from "src/utils/crashReporting";

export const useAdsConfig = () => {
  const [adsLoading, setAdsLoading] = useState(false);

  const initialize = async () => {
    setAdsLoading(true);
    try {
      await mobileAds().setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForUnderAgeOfConsent: true,
      });

      // Debug
      // await mobileAds().openAdInspector();

      mobileAds().initialize();
    } catch (error) {
      reportCrash(error, "Ads Initialize");
    } finally {
      setAdsLoading(false);
    }
  };

  return { initialize, adsLoading };
};

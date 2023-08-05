import React, { createContext, useState, ReactNode, useContext } from "react";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : process.env.ADS_INTERSTITIAL_ID;

const interstitial = InterstitialAd.createForAdRequest(adUnitId as string, {
  requestNonPersonalizedAdsOnly: true,
});

interface AdsContextProps {
  loadInterstitial: () => () => void;
  interstitialShow: () => void;
}

const AdsContext = createContext({} as AdsContextProps);

export const useInterstitialAds = () => useContext(AdsContext);

type Props = {
  children: ReactNode;
};

export const AdsProvider = ({ children }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const loadInterstitial = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    interstitial.load();

    return unsubscribe;
  };

  const interstitialShow = () => {
    if (loaded) interstitial.show();
    setLoaded(false);
  };

  return (
    <AdsContext.Provider
      value={{
        loadInterstitial,
        interstitialShow,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

import "react-native-gesture-handler";
import Routes from "./src/routes/Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAppStateChange } from "./src/hooks/useAppStateChange";
import Toast from "react-native-toast-message";
import { toastConfig } from "src/components/CustomToast";
import GlobalConfigs from "src/components/GlobalConfigs";
import { ThemeProvider } from "src/contexts/ThemeContext";
import { UserProvider } from "src/contexts/UserContext";
import * as Notifications from "expo-notifications";
import { useNotification } from "src/hooks/useNotification";
import { useEffect } from "react";
import { AdsProvider } from "src/contexts/AdsContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

export default function App() {
  const queryClient = new QueryClient();
  const { registerForPushNotificationsAsync } = useNotification();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useAppStateChange();

  // A navegação para a página no mangá (screen/manga) foram desabilitadas para compilação, pesquise por 'navigate("manga",' e habilite-as novamente.

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <AdsProvider>
            <GlobalConfigs>
              <Routes />
              <Toast config={toastConfig} />
            </GlobalConfigs>
          </AdsProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

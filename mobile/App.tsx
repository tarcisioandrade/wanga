import "react-native-gesture-handler";
import Routes from "./src/routes/Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAppStateChange } from "./src/hooks/useAppStateChange";
import Toast from "react-native-toast-message";
import { toastConfig } from "src/components/CustomToast";
import { useConfirmExit } from "src/hooks/useConfirmExit";
import GlobalConfigs from "src/components/GlobalConfigs";
import { ThemeProvider } from "src/contexts/ThemeContext";
import { UserProvider } from "src/contexts/UserContext";
import * as Notifications from "expo-notifications";
import { useNotification } from "src/hooks/useNotification";
import { useEffect } from "react";

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
  useConfirmExit();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <GlobalConfigs>
            <Routes />
            <Toast config={toastConfig} />
          </GlobalConfigs>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

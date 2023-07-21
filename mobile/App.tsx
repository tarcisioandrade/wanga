import "react-native-gesture-handler";
import Routes from "./src/routes/Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAppStateChange } from "./src/hooks/useAppStateChange";
import Toast from "react-native-toast-message";
import { toastConfig } from "src/components/CustomToast";
import { useConfirmExit } from "src/hooks/useConfirmExit";
import GlobalConfigs from "src/components/GlobalConfigs";
import { ThemeProvider } from "src/contexts/ThemeContext";

export default function App() {
  const queryClient = new QueryClient();

  useAppStateChange();
  useConfirmExit();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalConfigs>
          <Routes />
          <Toast config={toastConfig} />
        </GlobalConfigs>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

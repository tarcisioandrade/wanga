import { NavigationContainer } from "@react-navigation/native";
import CategoryDrawer from "./CategoryDrawerNavigator";

const Routes = () => {
  return (
    <NavigationContainer>
      <CategoryDrawer />
    </NavigationContainer>
  );
};

export default Routes;

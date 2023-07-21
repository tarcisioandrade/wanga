import { createDrawerNavigator } from "@react-navigation/drawer";
import { CategoryDrawerParamList } from "src/@types/navigation";
import MenuDrawerNavigator from "./MenuDrawerNavigator";
import CategoryDrawer from "src/components/CategoryDrawer";

const { Screen, Navigator } = createDrawerNavigator<CategoryDrawerParamList>();

const CategoryDrawerNavigator = () => {
  return (
    <Navigator
      initialRouteName="drawerMenu"
      screenOptions={{
        headerTitle: "",
        drawerStyle: {
          backgroundColor: "transparent",
        },
        headerShown: false,
        drawerPosition: "right",
        swipeEnabled: false,
      }}
      drawerContent={(props) => <CategoryDrawer {...props} />}
      useLegacyImplementation
      id="CategoryDrawer"
    >
      <Screen name="drawerMenu" component={MenuDrawerNavigator} />
    </Navigator>
  );
};

export default CategoryDrawerNavigator;

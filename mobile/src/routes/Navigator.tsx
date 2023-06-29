import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import { RootStackParamList } from "../@types/navigation";
import Header from "../components/Header";
import Favorites from "../screens/Favorites";
import Historic from "../screens/Historic";
import CustomDrawer from "../components/CustomDrawer";

const { Screen, Navigator } = createDrawerNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="home"
        screenOptions={{
          headerTitle: "",
          header: ({ navigation }) => (
            <Header openMenu={navigation.openDrawer} />
          ),
          drawerStyle: {
            backgroundColor: "transparent",
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
        useLegacyImplementation
      >
        <Screen
          name="home"
          options={{
            title: "Home",
          }}
          component={Home}
        />
        <Screen
          name="favorites"
          options={{
            title: "Favoritos",
          }}
          component={Favorites}
        />
        <Screen
          name="historic"
          options={{
            title: "Histórico",
          }}
          component={Historic}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;

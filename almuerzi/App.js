import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AuthLoading from "./screens/AuthLoading";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";

import MealsScreen from "./screens/Meals";
import Modal from "./screens/Modal";

const OnBoardingNavigatior = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppNavigator = createStackNavigator(
  {
    Meals: {
      screen: MealsScreen,
      title: "Comidas disponibles"
    }
  },
  {
    initialRouteName: "Meals"
  }
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Modal: Modal
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const BaseStack = createSwitchNavigator(
  {
    AuthLoading,
    OnBoarding: OnBoardingNavigatior,
    Root: RootStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
export default createAppContainer(BaseStack);

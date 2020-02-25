import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading, SplashScreen } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import LoginOrCreate from "./src/LoginScreen/LoginOrCreate";
import LoginHandler from "./src/LoginScreen/LoginHandler";
import CreateAccountHandler from "./src/LoginScreen/CreateAccountHandler";
import CreateDisplayName from "./src/LoginScreen/CreateDisplayName";
import HomeScreen from "./src/HomeScreen/HomeScreen";
import ChangePassword from "./src/HomeScreen/Account/ChangePassword";
import ChangeEmail from "./src/HomeScreen/Account/ChangeEmail";
import TodaysPoll from "./src/HomeScreen/TodaysPoll/TodaysPoll";

// function Login() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Login Screen</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();
const initialRouteName = "Main";

// const UserContext = React.createContext()

export default class App extends React.Component {
  state = {
    isReady: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginOrCreate">
          <Stack.Screen
            name="LoginOrCreate"
            component={LoginOrCreate}
            options={{ title: "Welcome to Pollcat" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginHandler"
            component={LoginHandler}
            options={{ title: "Login" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccountHandler"
            component={CreateAccountHandler}
            options={{ title: "Create Account" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateDisplayName"
            component={CreateDisplayName}
            options={{ title: "Create Display Name" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ title: "Change Password" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangeEmail"
            component={ChangeEmail}
            options={{ title: "Change Email" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TodaysPoll"
            component={TodaysPoll}
            options={{ title: "Today's Poll" }}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

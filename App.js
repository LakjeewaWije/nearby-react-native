import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SignUpScreen from './SignUpScreen';
import AuthLoadingScreen from './authLoadingScreen';

// const Navigation = createStackNavigator(
//   {
//     Login: {
//       screen: LoginScreen,
//       navigationOptions: {
//         header: null,
//       }
//     },
//     SingUp: {
//       screen: SignUpScreen,
//       navigationOptions: {
//         header: null,
//       }
//     },
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         header: null,
//       }
//     }
//   }
// );
// export default createAppContainer(Navigation);



const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    }
  });

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
  },
  SingUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
    }
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));


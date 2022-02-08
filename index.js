// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

// import { Navigation } from "react-native-navigation";
// -import {AppRegistry} from 'react-native';
// import App from "./App";
// -import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";
import route from "./Route/route";
import Session from "./Config/Session";

// AppRegistry.registerComponent(appName, () => App);
// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);

Navigation.events().registerAppLaunchedListener(() => {
Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
    bottomTab: {
      fontSize: 12,
      selectedFontSize: 12,
      textColor: "#c3c3c3",
      selectedTextColor: "#ffffff",
      fontFamily: "Montserrat-SemiBold",
    },
    bottomTabs: {
      backgroundColor: "#307EA0",
      titleDisplayMode: "alwaysShow",
    },
    // animations: {
    //   push: {
    //     enabled: false,
    //   },
    // },
  });
// this.navigationLogic()
Navigation.setRoot({
    root: route.afterLogin,
  });

});
 // Method that chooses to show between the other screens
 navigationLogic = async () => {
    
  
    const isAppIntroShown = await Session.getIsAppIntroShown();
    const userToken = await Session._getToken();

  
    console.log("isAppIntroShown: ", isAppIntroShown);
    console.log("userToken: ", userToken);
  
      if (userToken === null) {
        //First time login
        Navigation.setRoot({
          root: route.beforeLogin,
        });
      } else {
        // Already logged in
        global.userToken = userToken;
          Navigation.setRoot({ root: route.afterLogin });
      }
  };
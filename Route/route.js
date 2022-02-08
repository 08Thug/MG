import { Navigation } from "react-native-navigation";
import Login from "./../Components/Login";
import Forgot from "./../Components/Forgot";
import Register from "./../Components/Register";
import Home from "./../Components/Home";
import PropertyList from "./../Components/PropertyList"

/**
 * navigation registration
 */

Navigation.registerComponent("login", () => Login);
Navigation.registerComponent("forgot", () => Forgot);
Navigation.registerComponent("register", () => Register);
Navigation.registerComponent("home", () => Home);
Navigation.registerComponent("propertylist", () => PropertyList);


const beforeLogin = {
    stack: {
      children: [
        {
          component: {
            name: "login",
            
          },
        },
      ],
    },
  };

  const afterLogin = {
    stack: {
      children: [
        {
          component: {
            name: "home",
          
          },
        },
      ],
    },
  };

export default (route = {
    beforeLogin: beforeLogin,
    afterLogin: afterLogin,
    // gettingStarted: gettingStarted,
  });
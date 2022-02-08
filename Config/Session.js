// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Session = {
    /* Get started page shown or not */
  isAppIntroShown: async (value) => {
    try {
      await AsyncStorage.setItem("initial", value);
    } catch (error) {
      // Error saving data
    }
  },

  getIsAppIntroShown: async () => {
    try {
      const value = await AsyncStorage.getItem("initial");
      console.log("value: ", value);
      return value;
    } catch (error) {}
  },
   //Methods used to set user name
   setUserName: async (value) => {
    console.log("valued: ", value);
    try {
      await AsyncStorage.setItem("user_name", value);
    } catch (error) {
      // Error saving data
    }
  },
  getUserName: async () => {
    try {
      const value = await AsyncStorage.getItem("user_name");
      return value;
    } catch (error) {
      console.log(error);
    }
  },
};
export default Session;


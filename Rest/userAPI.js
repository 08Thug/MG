import {
    LOGIN,
    REGISTER,PROPERTY_LIST
  } from "./../Config/RestAPI";
  import commonModel from "./../Model/commonModel";
//   import i18n from "i18n-js";
  import axios from "axios";
//   import Session from "../Config/Session";
  
  // API call to login using email & password
  export const loginAPI = (params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(LOGIN, params, {
          headers: {
            "Content-Type": "application/json",
            // language: i18n.currentLocale(),
          },
        })
        .then((response) => {
          console.log("Login response", JSON.stringify(response));
          if (response.data.status == true) {
            // commonModel.return_id = {
            //   token: response.data.token,
            //   profile_status: response.data.profile_status,
            //   verification:response.data.verification,
            //   verification_type:response.data.verification_type
            // };
            commonModel.status = true;
            commonModel.message = response.data.message;
          } else {
            commonModel.status = false;
            // // to handle array and string types
            // if (Array.isArray(response.data.errors)) {
            //   commonModel.message =
            //     response.data.errors.length > 0 ? response.data.errors[0] : "";
            // } else commonModel.message = response.data.errors;
          }
          resolve(commonModel);
        })
        .catch((error) => {
          console.log("Login error", JSON.stringify(error.response));
          commonModel.status = false;
          commonModel.message = error.message;
          resolve(commonModel);
        });
    });
  };

  // Property list
export const getPropertyListAPI = async ( page) => {
  // const token = await Session._getToken();
  // console.log("token: ", token);

  var url = `${PROPERTY_LIST}?page=${page}`;
  console.log("url: ", url);

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          // language: i18n.currentLocale(),
          
          // authorization: token,
        },
      })
      .then((response) => {
        console.log("PROPERTY_LIST response", JSON.stringify(response));
        // if (response.status == "success") {
          // commonModel.status = true;
          // commonModel.message = response.message;
        //   commonModel.dataArray = new commonModel().deserializeBillListJSON(
        //     response.data.data
        //   );
        // commonModel.dataArray = response.result.data;
        //   commonModel.return_id=response.result.data;
        // } else {
        //   commonModel.status = false;
        //   commonModel.message = response.data.errors;
        // }
        // resolve(commonModel);
      })
      .catch((error) => {
        console.log("PROPERTY_LIST error", JSON.stringify(error.response.data.error));
        commonModel.status = false;
        commonModel.message = error.message;
        resolve(commonModel);
      });
  });
};
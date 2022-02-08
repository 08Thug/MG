// import React from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   TouchableWithoutFeedback,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   InputAccessoryView,
//   Keyboard,
//   BackHandler,
// } from "react-native";
// import { FilledTextField } from "react-native-material-textfield";
// import formStyle from "./../Styles/control";
// import fontStyle from "./../Styles/font";
// import colorStyle from "./../Styles/color";
// import buttonStyle from "./../Styles/button";
// import boxStyle from "./../Styles/box";
// import { Header } from "react-native-elements";
// // import { setI18nConfig, translate } from "./../../Config/Language";
// import { Navigation } from "react-native-navigation";
// import { Icon } from "react-native-elements";
// import CommonHelpers from "./../Utils/CommonHelper";
// import { registerAPI } from "./../Rest/userAPI";
// import CountryPicker from "react-native-country-picker-modal";
// import Mixpanel from "react-native-mixpanel";
// import Spinner from "./../UI/Spinner";
// import Session from "./../Config/Session";

// export default class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.firstnameRef = React.createRef();
//     this.lastnameRef = React.createRef();
//     this.emailRef = React.createRef();
//     this.phonenumberRef = React.createRef();
//     this.passwordRef = React.createRef();
//     setI18nConfig();
//     this.state = {
//       firstname: "",
//       lastname: "",
//       email: "",
//       phonenumber: "",
//       password: "",
//       showHidePwd: false,
//       pwdEye: "eye-slash",
//       emailError: false,
//       passwordError: false,
//       firstnameError: false,
//       lastnameError: false,
//       phonenumberError: false,
//       spinner: false,
//       isPrivacy: false,
//       countryCode: "IN",
//       countryCallingCide: "91",
//       countryPickerVisible: false,
//     };
//   }

//   componentDidMount() {
//     this.navigationEventListener = Navigation.events().bindComponent(this);
//   }

//   componentDidAppear = () => {
//     console.log("appppppp");
//     // add back listener
//     this.backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       this.backAction
//     );
//   };

//   componentDidDisappear = () => {
//     // remove back listener
//     this.backHandler.remove();
//   };

//   // App Exit popup
//   backAction = () => {
//     Navigation.setRoot({
//       root: route.beforeLoginFromFP,
//     });
//     return true;
//   };

//   goBack = () => {
//     console.warn("testing testing");
//     Navigation.setRoot({
//       root: route.beforeLoginFromFP,
//     });
//   };

//   updateInputVal = (val, prop, errorKey) => {
//     const state = this.state;
//     state[prop] = val;
//     state[errorKey] = false;
//     this.setState(state);
//   };

//   showOrHidePassword = () => {
//     if (this.state.showHidePwd) {
//       this.setState({ showHidePwd: false });
//       this.setState({ pwdEye: "eye-slash" });
//     } else {
//       this.setState({ showHidePwd: true });
//       this.setState({ pwdEye: "eye" });
//     }
//   };

//   closeKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   selectPrivacy = () => {
//     console.warn(this.state.isPrivacy);
//     this.setState({
//       isPrivacy: this.state.isPrivacy ? false : true,
//     });
//   };

//   onSubmit = async () => {
//     this.closeKeyboard();
//     if (this.validateFields()) {
//       if (this.state.isPrivacy) {
//         var params = {
//           first_name: this.state.firstname,
//           last_name: this.state.lastname,
//           email: this.state.email.toLowerCase(),
//           phone: this.state.phonenumber,
//           password: this.state.password,
//           country_code: this.state.countryCallingCide,
//           player_id: await Session.getPlayerId(),
//         };
//         console.log("the value of emails",this.state.email.toLowerCase())
//         this.setState({
//           spinner: true,
//         });
//         let that = this;
//         registerAPI(params).then((result) => {
//           that.setState({
//             spinner: false,
//           });

//           if (result.status == true) {
//             Mixpanel.identify(result.return_id);
//             Mixpanel.set({
//               $email: this.state.email,
//               $first_name: this.state.firstname,
//               $last_name: this.state.lastname,
//               $phone: this.state.phonenumber,
//               $date_of_registration: new Date().toISOString(),
//             });

//             Mixpanel.trackWithProperties("Register", {
//               "First Name": this.state.firstname,
//               "Last Name": this.state.lastname,
//               "Date of Registration": new Date().toISOString(),
//               "Email Address": this.state.email,
//               "Phone Number": this.state.phonenumber,
//               distinct_id: result.return_id,
//             });

//             // CommonHelpers.showFlashMsg(result.message, "success");

//             Navigation.push(that.props.componentId, {
//               component: {
//                 name: "verification",
//                 passProps: {
//                   type: "otp",
//                   from: "register",
//                   field: "email",
//                   value: that.state.email,
//                 },
//                 options: {
//                   animations: {
//                     push: {
//                       waitForRender: true,
//                     },
//                   },
//                 },
//               },
//             });
//             that.resetFormElements();
//           } else {
//             if (result.message == "Network Error") {
//               CommonHelpers.showFlashMsg(
//                 translate("No Network Connection"),
//                 "danger"
//               );
//             } else {
//               CommonHelpers.showFlashMsg(result.message, "danger");
//               var str=result.message
//               if(str.includes(translate("Number")))
//               {           
//                 this.setState({
//                   phonenumberError: true,
//                 });
//               } else {
//               this.setState({
//                 emailError: true,
//               });
//              }         
//             }
//           }
//         });
//       } else {
//         CommonHelpers.showFlashMsg(
//           translate(
//             "Accept our terms and condition before creating the account"
//           ),
//           "danger"
//         );
//       }
//     }
//   };

//   resetFormElements = () => {
//     this.firstnameRef.setValue("");
//     this.lastnameRef.setValue("");
//     this.emailRef.setValue("");
//     this.phonenumberRef.setValue(""), this.passwordRef.setValue("");
//     this.setState({
//       firstname: "",
//       lastname: "",
//       email: "",
//       phonenumber: "",
//       password: "",
//     });
//   };

//   validateFields() {
//     // First name validations
//     if (this.state.firstname.trim().length == 0) {
//       CommonHelpers.showFlashMsg(translate("first name is required"), "danger");
//       this.setState({
//         firstnameError: true,
//       });
//       return false;
//     }

//     if (this.state.firstname.trim().length < 3) {
//       CommonHelpers.showFlashMsg(
//         translate("first name must be 3 characters or more"),
//         "danger"
//       );
//       this.setState({
//         firstnameError: true,
//       });
//       return false;
//     }

//     if (this.state.firstname.trim().length > 20) {
//       CommonHelpers.showFlashMsg(
//         translate("first name can't exceed 20 characters"),
//         "danger"
//       );
//       this.setState({
//         firstnameError: true,
//       });
//       return false;
//     }

//     if (!CommonHelpers.validateName(this.state.firstname)) {
//       this.setState({
//         firstnameError: true,
//       });
//       CommonHelpers.showFlashMsg(
//         translate("firstname only allow alphabets, underscore and space"),
//         "danger"
//       );
//       return false;
//     }

//     // last name validations
//     if (this.state.lastname.trim().length == 0) {
//       CommonHelpers.showFlashMsg(translate("last name is required"), "danger");
//       this.setState({
//         lastnameError: true,
//       });
//       return false;
//     }

//     if (this.state.lastname.trim().length < 1) {
//       CommonHelpers.showFlashMsg(
//         translate("last name must be 1 characters or more"),
//         "danger"
//       );
//       this.setState({
//         lastnameError: true,
//       });
//       return false;
//     }

//     if (this.state.lastname.trim().length > 20) {
//       CommonHelpers.showFlashMsg(
//         translate("last name can't exceed 20 characters"),
//         "danger"
//       );
//       this.setState({
//         lastnameError: true,
//       });
//       return false;
//     }

//     if (!CommonHelpers.validateName(this.state.lastname)) {
//       this.setState({
//         lastnameError: true,
//       });
//       CommonHelpers.showFlashMsg(
//         translate("lastname only allow alphabets, underscore and space"),
//         "danger"
//       );
//       return false;
//     }

//     //email validation

//     if (this.state.email.trim().length == 0) {
//       CommonHelpers.showFlashMsg(translate("enterEmail"), "danger");
//       this.setState({
//         emailError: true,
//       });
//       return false;
//     }

//     if (!CommonHelpers.validateEmail(this.state.email)) {
//       this.setState({
//         emailError: true,
//       });
//       CommonHelpers.showFlashMsg(translate("validEmail"), "danger");
//       return false;
//     }

//     // phone number validation
//     if (this.state.phonenumber.trim().length == 0) {
//       CommonHelpers.showFlashMsg(
//         translate("phone number is required"),
//         "danger"
//       );
//       this.setState({
//         phonenumberError: true,
//       });
//       return false;
//     }

//     if (!CommonHelpers.validatePhoneNumber(this.state.phonenumber)) {
//       CommonHelpers.showFlashMsg(
//         translate("Oops, please enter a 10-digit phone number"),
//         "danger"
//       );
//       this.setState({
//         phonenumberError: true,
//       });
//       return false;
//     }

//     // Passwprd validations
//     if (this.state.password.trim().length == 0) {
//       CommonHelpers.showFlashMsg(translate("password is required"), "danger");
//       this.setState({
//         passwordError: true,
//       });
//       return false;
//     }

//     if (this.state.password.trim().length < 3) {
//       CommonHelpers.showFlashMsg(
//         translate("password must be 6 characters or more"),
//         "danger"
//       );
//       this.setState({
//         passwordError: true,
//       });
//       return false;
//     }

//     if (this.state.password.trim().length > 20) {
//       CommonHelpers.showFlashMsg(
//         translate("password can't exceed 20 characters"),
//         "danger"
//       );
//       this.setState({
//         passwordError: true,
//       });
//       return false;
//     }

//     if (!CommonHelpers.validatePassword(this.state.password)) {
//       this.setState({
//         passwordError: true,
//       });
//       return false;
//     }

//     return true;
//   }

//   onPhoneTextChange = (phoneVal) => {
//     console.warn("testing " + phoneVal.length);

//     var phone = phoneVal.replace(/[^\d]/g, "");
//     console.log("phone number1 is ",phone)
//     if (phone.length > 10) {
//         phone = phone.substring(0,10)
//     } 
//     if(phone.length == 0){
//       phone = phone;
//     } else if(phone.length < 4){
//       phone = '('+phone;
//     } else if(phone.length < 7){
//       phone = '('+phone.substring(0,3)+') '+phone.substring(3,6);
//     } else{
//       phone = '('+phone.substring(0,3)+') '+phone.substring(3,6)+'-'+phone.substring(6,10);
//     }

   
//     this.setState({
//       phonenumber: phone,
//       phonenumberError: false,
//     });
//     this.phonenumberRef.setValue(phone);
//   };

//   render() {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView style={styles.mainContainer}>
//           <KeyboardAvoidingView
//             style={styles.mainContainer}
//             behavior={Platform.OS == "ios" ? "padding" : "height"}
//           >
//             <TouchableWithoutFeedback onPress={() => this.goBack()}>
//               <Image
//                 source={require("./../../assets/images/backArrow.png")}
//                 style={styles.backArrow}
//               />
//             </TouchableWithoutFeedback>
//             <Image
//               style={styles.logoStyle}
//               source={require("./../../assets/images/logo.png")}
//             />

//             <ScrollView keyboardShouldPersistTaps={true}>
//               <View style={formStyle.formMargin}>
//                 <Text
//                   style={[
//                     fontStyle.regular,
//                     fontStyle.sizeLarge,
//                     colorStyle.grayColor,
//                   ]}
//                 >
//                   {translate("register")}
//                 </Text>
//               </View>
//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={translate("first name")}
//                   ref={(input) => {
//                     this.firstnameRef = input;
//                   }}
//                   value={this.state.firstname}
//                   returnKeyType={"next"}
//                   onSubmitEditing={() => {
//                     this.lastnameRef.focus();
//                   }}
//                   onChangeText={(val) =>
//                     this.updateInputVal(val, "firstname", "firstnameError")
//                   }
//                   tintColor={this.state.firstnameError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.firstnameError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={colorStyle.inputBackground}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View>
//               {/* <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={translate("last name")}
//                   ref={(input) => {
//                     this.lastnameRef = input;
//                   }}
//                   value={this.state.lastname}
//                   onChangeText={(val) =>
//                     this.updateInputVal(val, "lastname", "lastnameError")
//                   }
//                   returnKeyType={"next"}
//                   onSubmitEditing={() => {
//                     this.emailRef.focus();
//                   }}
//                   tintColor={this.state.lastnameError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.lastnameError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={colorStyle.inputBackground}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View> */}
//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={translate("email address")}
//                   keyboardType="email-address"
//                   ref={(input) => {
//                     this.emailRef = input;
//                   }}
//                   value={this.state.email}
//                   onChangeText={(val) =>
//                     this.updateInputVal(val, "email", "emailError")
//                   }
//                   returnKeyType={"next"}
//                   onSubmitEditing={() => {
//                     this.phonenumberRef.focus();
//                   }}
//                   tintColor={this.state.emailError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.emailError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={colorStyle.inputBackground}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View>
//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={"Address 1"}
//                 //   keyboardType="email-address"
//                   ref={(input) => {
//                     this.emailRef = input;
//                   }}
//                   value={this.state.email}
//                 //   onChangeText={(val) =>
//                 //     this.updateInputVal(val, "email", "emailError")
//                 //   }
//                   returnKeyType={"next"}
//                   onSubmitEditing={() => {
//                     this.phonenumberRef.focus();
//                   }}
//                   tintColor={this.state.emailError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.emailError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={colorStyle.inputBackground}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View>
//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={"Address 2"}
//                   keyboardType="email-address"
//                   ref={(input) => {
//                     this.emailRef = input;
//                   }}
//                   value={this.state.email}
//                 //   onChangeText={(val) =>
//                     // this.updateInputVal(val, "email", "emailError")
//                 //   }
//                   returnKeyType={"next"}
//                   onSubmitEditing={() => {
//                     this.phonenumberRef.focus();
//                   }}
//                   tintColor={this.state.emailError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.emailError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={colorStyle.inputBackground}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View>

//               <View style={formStyle.formMargin}>
//                 <View>
//                   <FilledTextField
//                     label={translate("phone number")}
//                     keyboardType="phone-pad"
//                     ref={(input) => {
//                       this.phonenumberRef = input;
//                     }}
//                     returnKeyType={"next"}
//                     onSubmitEditing={() => {
//                       this.passwordRef.focus();
//                     }}
//                     value={this.state.phonenumber}
//                     onChangeText={(val) => this.onPhoneTextChange(val)}
//                     tintColor={
//                       this.state.phonenumberError ? "#ff0000" : "#55A1B1"
//                     }
//                     baseColor={
//                       this.state.phonenumberError ? "#ff0000" : "#999999"
//                     }
//                     textColor="#999999"
//                     inputContainerStyle={[colorStyle.inputBackground]}
//                     labelTextStyle={fontStyle.regular}
//                     titleTextStyle={fontStyle.semibold}
//                     affixTextStyle={fontStyle.semibold}
//                     contentInset={{
//                       top: 12,
//                       label: 10,
//                       input: 12,
//                     }}
//                     inputAccessoryViewID={"phone_number"}
//                   />
//                 </View>
//                 {/* <TouchableWithoutFeedback
//                   onPress={() => {
//                     console.log(this.state.countryPickerVisible);
//                     this.setState({ countryPickerVisible: true });
//                   }}
//                 >
//                   <View
//                     style={[
//                       styles.flagStyle,
//                       // colorStyle.inputBackground,
//                       colorStyle.borderBottomColor,
//                     ]}
//                   >
//                     <CountryPicker
//                       withAlphaFilter
//                       withCallingCode
//                       visible={this.state.countryPickerVisible}
//                       // withModal
//                       countryCode={this.state.countryCode}
//                       onSelect={(country) => {
//                         console.log("country", country);
//                         this.setState({ countryCode: country.cca2 });
//                         this.setState({
//                           countryCallingCide: country.callingCode[0],
//                           countryPickerVisible: false,
//                         });
//                       }}
//                       // containerButtonStyle={styles.flagStyle}
//                     />
//                   </View>
//                 </TouchableWithoutFeedback> */}
//               </View>

//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={translate("password")}
//                   value={this.state.password}
//                   keyboardType="default"
//                   title={translate("password_title")}
//                   returnKeyType={"done"}
//                   ref={(input) => {
//                     this.passwordRef = input;
//                   }}
//                   onChangeText={(val) =>
//                     this.updateInputVal(val, "password", "passwordError")
//                   }
//                   secureTextEntry={!this.state.showHidePwd}
//                   tintColor={this.state.passwordError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.passwordError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={[
//                     colorStyle.inputBackground,
//                     fontStyle.regular,
//                   ]}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />

//                 <Icon
//                   name={this.state.pwdEye}
//                   containerStyle={formStyle.formIcon}
//                   type="font-awesome"
//                   color="#999"
//                   onPress={() => {
//                     this.showOrHidePassword();
//                   }}
//                 />
//               </View>

//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={"Contact Person"}
//                   value={this.state.password}
//                   keyboardType="default"
//                   title={translate("password_title")}
//                   returnKeyType={"done"}
//                   ref={(input) => {
//                     this.passwordRef = input;
//                   }}
//                 //   onChangeText={(val) =>
//                 //     this.updateInputVal(val, "password", "passwordError")
//                 //   }
//                   secureTextEntry={!this.state.showHidePwd}
//                   tintColor={this.state.passwordError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.passwordError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={[
//                     colorStyle.inputBackground,
//                     fontStyle.regular,
//                   ]}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View>

//               <View style={formStyle.formMargin}>
//                 <FilledTextField
//                   label={"contact Number"}
//                   value={this.state.password}
//                   keyboardType="default"
//                   title={translate("password_title")}
//                   returnKeyType={"done"}
//                   ref={(input) => {
//                     this.passwordRef = input;
//                   }}
//                 //   onChangeText={(val) =>
//                 //     this.updateInputVal(val, "password", "passwordError")
//                 //   }
//                   secureTextEntry={!this.state.showHidePwd}
//                   tintColor={this.state.passwordError ? "#ff0000" : "#55A1B1"}
//                   baseColor={this.state.passwordError ? "#ff0000" : "#999999"}
//                   textColor="#999999"
//                   inputContainerStyle={[
//                     colorStyle.inputBackground,
//                     fontStyle.regular,
//                   ]}
//                   labelTextStyle={fontStyle.regular}
//                   titleTextStyle={fontStyle.semibold}
//                   affixTextStyle={fontStyle.semibold}
//                   contentInset={{
//                     top: 12,
//                     label: 10,
//                     input: 12,
//                   }}
//                 />
//               </View>

//               <View style={formStyle.formMargin}>
//                 <TouchableWithoutFeedback
//                   onPress={() => {
//                     this.selectPrivacy();
//                   }}
//                 >
//                   <View style={styles.checkboxContainer}>
//                     {this.state.isPrivacy == true && (
//                       <Icon
//                         name="ios-checkbox-outline"
//                         type="ionicon"
//                         color="#307EA0"
//                         size={32}
//                       />
//                     )}

//                     {this.state.isPrivacy == false && (
//                       <Icon
//                         name="ios-square-outline"
//                         type="ionicon"
//                         color="#307EA0"
//                         size={38}
//                         style={styles.squareIcon}
//                       />
//                     )}

//                     <Text
//                       style={[
//                         fontStyle.regular,
//                         fontStyle.sizeRegular,
//                         colorStyle.darkgrayColor,
//                         styles.privacylabel,
//                       ]}
//                     >
//                       {translate("i agree to terms and conditions")}
//                     </Text>
//                   </View>
//                 </TouchableWithoutFeedback>
//               </View>

//               <View style={formStyle.formButton}>
//                 <TouchableWithoutFeedback
//                   onPress={() => {
//                     this.onSubmit();
//                     // Navigation.setRoot({
//                     //   root: route.securedLogin,
//                     // });
//                   }}
//                 >
//                   <Text
//                     style={[
//                       fontStyle.semibold,
//                       fontStyle.sizeMedium,
//                       colorStyle.linkColor,
//                       colorStyle.linkBorderColor,
//                       buttonStyle.default,
//                       styles.loginButtonWidth,
//                     ]}
//                   >
//                     {translate("create account")}
//                   </Text>
//                 </TouchableWithoutFeedback>
//               </View>
//             </ScrollView>
//           </KeyboardAvoidingView>
        
//           {this.state.spinner && <Spinner />}
//         </SafeAreaView>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mainContainer: { position: "relative", flex: 1 },
//   backArrow: {
//     width: 24,
//     resizeMode: "contain",
//     position: "absolute",
//     left: 15,
//     top: 15,
//     zIndex: 99,
//   },
//   logoStyle: {
//     width: "60%",
//     resizeMode: "contain",
//     marginLeft: "20%",
//     marginBottom: 40,
//     marginTop: 20,
//   },
//   inner: { padding: 24, flex: 1, justifyContent: "space-around" },
//   accessoryBtn: { textAlign: "right", padding: 10, margin: 10 },
//   accessoryBtnView: {
//     justifyContent: "flex-end",
//     alignContent: "flex-end",
//     alignItems: "flex-end",
//   },
//   checkboxContainer: { flexDirection: "row", minHeight: 50, marginBottom: 30 },
//   checkbox: { alignSelf: "center" },
//   privacylabel: { marginTop: 8, marginLeft: 15 },
//   squareIcon: { position: "relative", top: -3 },

//   countryFlag: {
//     position: "absolute",
//     right: 0,
//     width: "15%",
//     height: "90%",
//     borderBottomWidth: 1,
//   },
//   flagStyle: {
//     alignContent: "center",
//     alignSelf: "center",
//     textAlign: "center",
//     alignItems: "center",
//     marginTop: 20,
//     position: "absolute",
//     right: 0,
//   },
//   flexStyle: { flexDirection: "row", flex: 1, width: "100%" },
//   loginButtonWidth:{marginBottom:10}
// });

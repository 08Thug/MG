import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  BackHandler,
  Alert,
  ActivityIndicator,
  Modal,
  Keyboard,
} from "react-native";
import { Navigation } from "react-native-navigation";
import route from "./../Route/route";
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield";
// import { setI18nConfig, translate } from "./../../Config/Language";
import formStyle from "./../Styles/control";
import fontStyle from "./../Styles/font";
import colorStyle from "./../Styles/color";
import buttonStyle from "./../Styles/button";
import boxStyle from "./../Styles/box";
import { Icon } from "react-native-elements";
import { loginAPI } from "./../Rest/userAPI";

import CommonHelpers from "../Utils/CommonHelpers";
import Session from "./../Config/Session";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import navigation from "./../Styles/navigation";
import NetInfo from "@react-native-community/netinfo";
import { getUniqueId } from "react-native-device-info";
import Spinner from "./../UI/Spinner";
import Confirmation from "./../Modals/Confirmation";


global.userToken = "";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // setI18nConfig();
    this.state = {
      email: "",
      password: "",
      showHidePwd: false,
      pwdEye: "eye-slash",
      emailError: false,
      passwordError: false,
      spinner: false,
      isConnected: true,
      networkStatusTxt: "",
      appExitmodalVisible: false,
    //   preferredVerification: "",
      userName: "",
    //   showFingerprintModal: false,
    //   isBiometricAvailable: false, //whether mobile supports?
    //   isFingerPrint: false, //whether finger print or face id?
    };
    this.emailRef = React.createRef();
    this.pwdRef = React.createRef();
    // this.unsubscribe;
    this.onCloseModel = this.onCloseModel.bind(this);
    this.onOKClicked = this.onOKClicked.bind(this);
    // this.closeFingerPrintModal = this.closeFingerPrintModal.bind(this);
  }

  componentDidMount = async () => {
    this.navigationEventListener = Navigation.events().bindComponent(this);

    // let preferred_veri = await Session.getPreferredVerification();
    // let name = await Session.getUserName();
    // this.setState({ preferredVerification: preferred_veri, userName: name });

    // this.checkIfFingerprintSupported();

    // this.unsubscribe = NetInfo.addEventListener((state) => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   this.setState({ isConnected: state.isConnected });
    //   state.isConnected
    //     ? this.setState({ networkStatusTxt: "Back Online" })
    //     : this.setState({ networkStatusTxt: "No Internet connection" });
    // });
  };

  componentWillUnmount = () => {
    // this.unsubscribe();
    // if (this.backHandler) this.backHandler.remove();
  };

  componentDidAppear = () => {
    console.log("appppppp");
    // add back listener
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  };

  componentDidDisappear = () => {
    // remove back listener
    this.backHandler.remove();
  };

  // App Exit popup
  backAction = () => {
    this.setState({
      appExitmodalVisible: true,
    });
    return true;
  };

  onOKClicked = () => {
    this.setState({
      appExitmodalVisible: false,
    });
    BackHandler.exitApp();
  };

  onCloseModel = () => {
    this.setState({
      appExitmodalVisible: false,
    });
  };


  gotoRegister = () => {
    Keyboard.dismiss();

    Navigation.push(this.props.componentId, {
      component: {
        name: "register",
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };


  gotoForgot = () => {
    Keyboard.dismiss();

    Navigation.push(this.props.componentId, {
      component: {
        name: "forgot",
      },
      options: {
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    });
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;

    // to remove error red line
    state["emailError"] = false;
    state["passwordError"] = false;
    this.setState(state);
  };

  // Method to show/hide password and eye icon changes
  showOrHidePassword = () => {
    if (this.state.showHidePwd) {
      this.setState({ showHidePwd: false });
      this.setState({ pwdEye: "eye-slash" });
    } else {
      this.setState({ showHidePwd: true });
      this.setState({ pwdEye: "eye" });
    }
  };

 

  // Method to validate login form data
  validateLoginData = async () => {
    Keyboard.dismiss();

    // if (this.state.email == "") {
    //   CommonHelpers.showFlashMsg("Please Enter Email Id", "danger");
    //   this.setState({ emailError: true });
    // } else if (!CommonHelpers.validateEmail(this.state.email)) {
    //   CommonHelpers.showFlashMsg("Please Enter Valid Email Id", "danger");
    //   this.setState({ emailError: true });
    // } else if (this.state.password == "") {
    //   CommonHelpers.showFlashMsg("Please Enter Password", "danger");
    //   this.setState({ passwordError: true });
    // } else {
    //   // to show loader
    //   this.setState({
    //     spinner: true,
    //   });
    //   this.getPlayerId();
    // }
    Navigation.push(this.props.componentId, {
          component: {
            name: "home",
            options: {
              animations: {
                push: {
                  waitForRender: true,
                },
              },
            },
            passProps: {
              type: "otp",
              from: "register",
              field: CommonHelpers.validateEmail(that.state.email)
                ? "email"
                : "phone",
              value: that.state.email,
            },
          },
        });
  };

  getPlayerId = async () => {
    // if ((await Session.getPlayerId()) === null) this.getPlayerId();
    // else 
    this.apiCallLogin();
  };

  // Method to send login data to api
  apiCallLogin = async () => {
    // to remove error red line on text fields
    this.setState({ passwordError: false });
    this.setState({ emailError: false });

    // to show loader
    this.setState({
      spinner: true,
    });

    var params = {
      email: this.state.email,
      password: this.state.password,
    };
    let that = this;
    loginAPI(params).then((result) => {
      console.log("res", result);
      this.setState({
        spinner: false,
      });
      if (result.status) {

          global.userToken = result.return_id.token;
          // Parse JWT and get data
          const userData = Session.parseJwt(global.userToken);
          console.log("userData: ", userData);
          Session.setUserId(userData.user_id);
          Session.setUserName(userData.first_name + " " + userData.last_name);

          CommonHelpers.showFlashMsg(result.message, "success");

          // Move to next page
        //   this.redirectionAfterLogin(
        //     userData,
        //     result.return_id.token,
        //     result.return_id.verification,
        //     result.return_id.verification_type,
        //     result.return_id.pincode
        //   );
        }

        /*  Navigation after login */
    //   } else {
        if (result.message == "Network Error") {
          CommonHelpers.showFlashMsg(
            "No Network Connection",
            "danger"
          );
        } 
        else {
          CommonHelpers.showFlashMsg(result.message, "danger");
        }
    //   }
    });
  };

  resetFormElements = () => {
    this.emailRef.setValue("");
    this.pwdRef.setValue("");
    this.setState({
      email: "",
      password: "",
    });
  };

 

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={boxStyle.container}>
          {!this.state.isConnected ? (
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineText}>
                {this.state.networkStatusTxt}
              </Text>
            </View>
          ) : null}

          <KeyboardAwareScrollView
            contentContainerStyle={boxStyle.scrollViewCenter}
            keyboardShouldPersistTaps="always"
          >
            <View style={[boxStyle.centerBox, colorStyle.whiteBackground]}>
              <View>
                <Image
                  style={styles.logoStyle}
                  source={require("./../assets/images/login-signup.png")}
                />
                <View style={formStyle.formMargin}>
                  <Text
                    style={[
                      fontStyle.regular,
                      fontStyle.sizeExtraLarge,
                      colorStyle.blackColor,
                    ]}
                  >
                    {/* {translate("login")} */}
                    Welcome back
                  </Text>
                  <Text style={{paddingTop:3}}>
                    Login into your account
                  </Text>
                </View>
                <View style={formStyle.formMargin}>
                  <FilledTextField
                    label={"email address"}
                    keyboardType="email-address"
                    ref={(input) => {
                      this.emailRef = input;
                    }}
                    value={this.state.email}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.pwdRef.focus();
                    }}
                    blurOnSubmit={true}
                    onChangeText={(val) => this.updateInputVal(val, "email")}
                    tintColor={this.state.emailError ? "#ff0000" : "#55A1B1"}
                    baseColor={this.state.emailError ? "#ff0000" : "#999999"}
                    textColor="#999999"
                    inputContainerStyle={colorStyle.inputBackground}
                    labelTextStyle={fontStyle.regular}
                    titleTextStyle={fontStyle.semibold}
                    affixTextStyle={fontStyle.semibold}
                    contentInset={{
                      top: 12,
                      label: 10,
                      input: 12,
                    }}
                  />
                </View>

                <View style={formStyle.formMargin}>
                  <FilledTextField
                    label={"password"}
                    value={this.state.password}
                    ref={(input) => {
                      this.pwdRef = input;
                    }}
                    onChangeText={(val) => this.updateInputVal(val, "password")}
                    secureTextEntry={!this.state.showHidePwd}
                    blurOnSubmit={true}
                    tintColor={this.state.passwordError ? "#ff0000" : "#55A1B1"}
                    baseColor={this.state.passwordError ? "#ff0000" : "#999999"}
                    textColor="#999999"
                    inputContainerStyle={[
                      colorStyle.inputBackground,
                      // fontStyle.regular,
                    ]}
                    labelTextStyle={fontStyle.regular}
                    titleTextStyle={fontStyle.semibold}
                    affixTextStyle={fontStyle.semibold}
                    contentInset={{
                      top: 12,
                      label: 10,
                      input: 12,
                    }}
                  />

                  <Icon
                    name={this.state.pwdEye}
                    containerStyle={formStyle.formIcon}
                    type="font-awesome"
                    color="#999"
                    onPress={() => {
                      this.showOrHidePassword();
                    }}
                  />
                </View>

                <View style={styles.forgotLink}>
                  <TouchableWithoutFeedback onPress={() => this.gotoForgot()}>
                    <Text
                      style={[
                        fontStyle.regular,
                        fontStyle.sizeMedium,
                        colorStyle.linkColor,
                        styles.forgotLinkText,
                      ]}
                    >
                      {/* {translate("forgot password")} */}
                      forgot password
                    </Text>
                  </TouchableWithoutFeedback>
                </View>

<View>
<TouchableWithoutFeedback
                    onPress={() => {
                      this.validateLoginData();
                    }}
                  >
                    <Text
                      style={[
                        fontStyle.semibold,
                        fontStyle.sizeMedium,
                        colorStyle.linkColor,
                        colorStyle.linkBorderColor,
                        buttonStyle.default,
                        styles.loginButtonWidth,
                      ]}
                    >
                      Or sign in with
                    </Text>
                  </TouchableWithoutFeedback>
</View>
                {/* <View style={formStyle.formButton}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.validateLoginData();
                    }}
                  >
                    <Text
                      style={[
                        fontStyle.semibold,
                        fontStyle.sizeMedium,
                        colorStyle.linkColor,
                        colorStyle.linkBorderColor,
                        buttonStyle.default,
                        styles.loginButtonWidth,
                      ]}
                    >
                      login
                    </Text>
                  </TouchableWithoutFeedback>
                </View> */}

                {/* <View style={[formStyle.formButton, styles.signupText]}>
                  <TouchableWithoutFeedback onPress={this.gotoRegister}>
                    <Text
                      style={[
                        fontStyle.regular,
                        fontStyle.sizeRegular,
                        colorStyle.darkgrayColor,
                      ]}
                    >
                      new users?
                      <Text style={[colorStyle.linkColor]}>
                        signup
                      </Text>
                    </Text>
                  </TouchableWithoutFeedback>
                </View> */}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.appExitmodalVisible}
            onRequestClose={() => {
              this.onCloseModel();
            }}
            // onDismiss={() => this.gotoLogin()}
          >
            <Confirmation
              modalMsg={"Are you sure you want to exit the app?"}
              onCancel={this.onCloseModel}
              onOk={this.onOKClicked}
            />
          </Modal>
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showFingerprintModal}
          >
            <FingerPrint
              from="auth"
              verification_add_or_edit=""
              onClose={this.closeFingerPrintModal}
            />
          </Modal> */}
          {this.state.spinner && <Spinner />}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    width: "60%",
    resizeMode: "contain",
    marginLeft: "20%",
    marginBottom: 40,
    marginTop: 20,
  },
  forgotLink: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  forgotLinkText: {
    textAlign: "right",
  },
  loginButtonWidth: {
    width: 100,
  },
  signupText: {
    marginTop: 20,
    marginBottom: 20,
  },
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 50,
  },
  offlineText: { color: "#fff", fontSize: 20, textAlign: "center" },
});

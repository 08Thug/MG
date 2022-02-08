// import Base from "../Base";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import color from "./../Styles/color";
import { getPropertyListAPI } from "./../Rest/userAPI";
import CommonHelpers from "./../Utils/CommonHelpers";
import { Header } from "react-native-elements";
import navigation from "./../Styles/navigation";
import font from "./../Styles/font";
import button from "./../Styles/button";
import box from "./../Styles/box";
// import { translate } from "../../Config/Language";
import route from "./../Route/route";
import { Navigation } from "react-native-navigation";
// import Database from "../../Utils/database";
// import { CURRENCY_CODE } from "../../Config/RestApi";
import image from "./../Styles/image";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
// import DropDownPicker from "react-native-dropdown-picker";
// import { connect } from "react-redux";
// import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import Spinner from "./../UI/Spinner";
// import { actionfetchBills } from "../../redux/actions/refreshAction";
// import Confirmation from "./../Modal/Confirmation";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.bill_type = "";
    this.page_title = "";
    this.temp_list = [];
    this.page = 0;
    this.offset = 10;
    this.state = {
      spinner: false,
      delSpinner: false,
      propertyList: [
        {
          property_name:"	1Share Office",address1:"Jodhka House, 12 Sant Nagar, East of Kailash, East of Kailash, New Delhi, Delhi - 110065"
        },
        {
          property_name:"22Workspace Location 1",address1:"1/22, Asaf Ali Rd, Kamla Market, Ajmeri Gate, New Delhi, Delhi - 110002"
        },
        {
          property_name:"22Workspace Location 2",address1:"3/8, Asaf Ali Road, Katra Chobey Lal, Chandni Chowk, New Delhi, Delhi - 110002"
        },
        {
          property_name:"24 Coworking",address1:"Plot No 24 ABCD, Govt, Charkop Industrial Estate, Kandivali West, Mumbai, Maharashtra - 400067"
        },
        {
          property_name:"365 Shared Space Hsr",address1:"153, Sector 5,1st Block, Hsr Layout, HSR Layout, Bengaluru, Karnataka - 560102"
        }
      ],
      page: 0,
      hasNextPage: false,
      isLoadMore: false,
      isRefreshing: false, //for pull to refresh
      delModalVisible: false,
      actionSheetType: "",
    };
    // this.onCloseModel = this.onCloseModel.bind(this);
    // del confirmation
    // this.onDelClicked = this.onDelClicked.bind(this);

    this.selected_bill_id = "";
    this.selected_bill_index = -1;
    this.selected_item = "";
  }

  componentDidMount() {
    this.apiCallPropertyList(false, false);
  }

  componentWillUpdate() {
    console.log("w", this.props);
  }

  extractKey = ({ id }) => {
    id;
    console.log("id: ", id);
  };


  // Property list 
  apiCallPropertyList = (isPulltoRefresh, isLoadMore) => {
    console.log("this.state.page: ", this.state.page);
    if (!isPulltoRefresh && !isLoadMore)
      this.setState({
        spinner: true,
      });
      getPropertyListAPI(this.state.page).then(
      (result) => {
        this.setState({
          spinner: false,
        });
        console.log("this.state.page: ", result.message);

        if (result.status) {
          if (isPulltoRefresh) this.setState({ propertyList: [] });
          // this.setState({
          //   propertyList:
          //     this.state.page === 0
          //       ? result.dataArray
          //       : [...this.state.propertyList, ...result.dataArray],
          // });
          // this.setState({ hasNextPage: result.return_id });
        } else {
          if(result.message == "Network Error") {
            CommonHelpers.showFlashMsg("No Network Connection", "danger");
          } else {
            CommonHelpers.showFlashMsg(result.message, "danger");
          }
        }
        this.setState({
          isLoadMore: false,
          isRefreshing: false
        });
      }
    );
  };

  // Pull to refresh
  onRefresh() {
    this.setState({ isRefreshing: true, page: 0 }); // true isRefreshing flag for enable pull to refresh indicator
    this.apiCallPropertyList(true, false);
  }

  // Pagination logic
  loadMoreRandomData = () => {
    if (this.state.hasNextPage)
      this.setState({ isLoadMore: true, page: this.state.page + 1 }, () =>
        this.apiCallPropertyList(false, true)
      );
  };

  openPropertyDetail = (item) => {
    console.log("Pressed")
    Navigation.push(this.props.componentId, {
      component: {
        name: "propertylist",
        // passProps: {
        //   bill_item: item,
        // },
        options: {
          bottomTabs: {
            visible: false,
            animate: false,
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };



  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.openPropertyDetail(item);
        }}
      >
        <View style={[color.settingsButtonBorder, styles.dueItem]}>
        {/* { item.image.length==0 && */}
            <Image style={[styles.goalImage, image.imageCover, color.grayBackColor]} source={require('./../../../assets/images/goal1.png')} /> 
           {/* } */}

          {/* { item.image.length>0 &&
            <Image
            source={{uri:PROPERTY_IMG_URL + 'image/'+item.image}}
            style={[styles.goalImage, image.imageContain]}
            />
          } */}
        <View style={[styles.subconentAlign]}>
          <View style={[styles.leftContent]}>
            <Text style={[font.semibold, font.sizeRegular, color.linkColor]}>
              {item.property_name}
            </Text>

            <Text style={[font.regular, font.sizeSmall, color.grayColor]}>
              {/* {CURRENCY_CODE} */}
              {item.address1}
            </Text>
          </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoadMore) return null;
    return <ActivityIndicator style={{ color: "#000" }} />;
  };

  render() {
    return (
      <>
        
        <SafeAreaView style={styles.flexContent}>
          <Header
            centerComponent={{
              text: this.page_title,
              style: [
                // navigation.navTitle,
                color.linkColor,
                font.bold,
                font.sizeLarge,
                color.linkColor,
                styles.addButtonStyle,
              ],
            }}
            containerStyle={[color.whiteBackground, navigation.headerContainer]}
          leftComponent={
            <TouchableWithoutFeedback
              onPress={() => {
              
              }}
            >
              <Image
              style={[image.userImage]}
              source={require("./../assets/images/menu.png")} />

          
            </TouchableWithoutFeedback>
          }
          >
            
          </Header>

          {/* <ScrollView > */}
          {/* {this.state.spinner && (
            <View
              style={[
                box.shadow_box,
                styles.accountsList,
                color.whiteBackground,
              ]}
            >
              <View style={[color.settingsButtonBorder, styles.accountsItem]}>
                <View style={[styles.leftContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>

                <View style={[styles.rightContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonDollarStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View style={[color.settingsButtonBorder, styles.accountsItem]}>
                <View style={[styles.leftContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>

                <View style={[styles.rightContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonDollarStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View style={[color.settingsButtonBorder, styles.accountsItem]}>
                <View style={[styles.leftContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>

                <View style={[styles.rightContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonDollarStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View style={[color.settingsButtonBorder, styles.accountsItem]}>
                <View style={[styles.leftContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>

                <View style={[styles.rightContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonDollarStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View style={[color.settingsButtonBorder, styles.accountsItem]}>
                <View style={[styles.leftContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>

                <View style={[styles.rightContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonDollarStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View style={[color.settingsButtonBorder, styles.accountsItem]}>
                <View style={[styles.leftContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonTextStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>

                <View style={[styles.rightContent]}>
                  <SkeletonPlaceholder>
                    <View>
                      <View style={[styles.skeletonDollarStyle]} />
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
            </View>
          )} */}
          {this.state.propertyList.length > 0 && (
            <View style={[styles.accountsList]}>
              <FlatList
                style={[
                  box.shadow_box,
                //  styles.accountsList,
                  color.whiteBackground,
                ]}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
                data={this.state.propertyList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item._id}
                extraData={this.state}
                onEndReached={this.loadMoreRandomData.bind(this)}
                onEndReachedThreshold={0.5}
                // onEndReached={() => {
                //   if (!this.onEndReachedCalledDuringMomentum) {
                //     this.loadMoreRandomData.bind(this);
                //     this.onEndReachedCalledDuringMomentum = true;
                //   }
                // }}
                // onEndReachedThreshold={10}
                // onMomentumScrollBegin={() => {
                //   this.onEndReachedCalledDuringMomentum = false;
                // }}
                ListFooterComponent={this.renderFooter.bind(this)}
              />
            </View>
          )}
          {!this.state.spinner && this.state.propertyList.length == 0 && (
            <View style={[styles.dataStyle]}>
              <Text style={[font.sizeLarge, font.semibold, color.linkColor]}>
                {/* {translate("No data found")} */}
                No data found
              </Text>
            </View>
          )}
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.delModalVisible}
            onRequestClose={() => {
              this.onCloseModel();
            }}
          // onDismiss={() => this.gotoLogin()}
          >
            <Confirmation
              modalMsg={translate("delBill")}
              onCancel={this.onCloseModel}
              onOk={this.onDelClicked}
            />
          </Modal> */}
          {this.state.delSpinner && <Spinner />}
        </SafeAreaView>
      </>
    );
  }
}

// function which takes state object as input and asks to return it as props to our component
// function mapStateToProps(state) {
//   console.log("state1: ", state);
//   return {
//     canRefresh: state.canRefresh.refresher,
//   };
// }

// export default connect(
//   mapStateToProps,
//   { actionfetchBills }
// )(billList);

const styles = StyleSheet.create({
  flexContent: { flex: 1 },
  align: { textAlign: "right", justifyContent: "flex-end", flex: 1, marginTop: 20, },
  rowStyle: { flexDirection: 'row' },

  content: { marginTop: 10, marginBottom: 20, marginLeft: 15, marginRight: 15 },
  flexStyle: { flex: 1, flexDirection: "row" },
  rightArrow: { width: 20, height: 20 },
  padding: { justifyContent: "center", position: "relative", right: 2, top: 2 },
  bankImage: { width: 60, height: 60 },
  centerPadding: { marginLeft: 10, marginTop: 10 },
  downBox: {
    borderBottomColor: "#b2b1b1", borderBottomWidth: 1, borderColor: "#f5f5f5", width: "95%", marginLeft: 10,
  },
  spacing: { paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, },
  accountsList: {marginLeft:10,marginRight:10,marginBottom:10,flex:1,marginTop:10, paddingRight: 10, paddingLeft: 10, },
  accountsItem: {
    padding: 2,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: { alignItems: "flex-start", flexGrow: 1, flex: 1, paddingLeft: 5, },
  rightContent: { alignItems: "flex-end", },
  pickerText: { height: 30, width: 100 },
  dueItem: {
    padding: 2, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
  },
  borderSpacing: { borderTopLeftRadius: 5, borderTopRightRadius: 5, borderWidth: 1, },
  billDrop: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  dataStyle: { flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", },

  addButtonStyle: { flexWrap: "wrap" },
  radius: {
    borderTopLeftRadius: 40, borderTopRightRadius: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40,
  },
  skeletonStyle: { width: 50, height: 50, marginTop: 5, borderRadius: 5 },
  skeletonTextStyle: { width: 100, height: 15, marginTop: 5, borderRadius: 5 },
  skeletonIcon: { width: 15, height: 15, marginRight: 10, position: "absolute", top: 60, left: 0, },
  skeletonDollarStyle: { width: 60, height: 15, marginTop: 5, borderRadius: 5 },
  dropArrowStyle: { width: 10, height: 10, marginTop: 2, marginLeft: 5 },
  dotsImageStyle: { width: 18, height: 18, marginLeft: 5 },
  price: { padding: 3, paddingRight: 5, paddingLeft: 5, marginLeft: 5 },

});

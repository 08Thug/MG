import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";

export default class Spinner extends React.Component {
    render() {
        return(
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
      backgroundColor:'rgba(0,0,0,0.5)',
      position:'absolute',
      left:0,
      top:0,
      right:0,
      bottom:0,
      justifyContent:'center',
      alignItems:'center'
    }
});
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
  } from "react-native";

  export default class HomeScreen extends React.Component {
      render() {
          return(
              <View style={styles.container}>
                  <Text>Chart</Text>
              </View>
          )
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d9d4cf",
      justifyContent: "center",
      alignItems: "center",
    },
})
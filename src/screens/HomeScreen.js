import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    LayoutAnimation
  } from "react-native";

import { firebase } from "../firebase/config"

export default class HomeScreen extends React.Component {

   
    state = {
        email: "",
        displayName: "",
        uid: ""
    }
    
    componentDidMount() {
        const {email, displayName, uid} = firebase.auth().currentUser

        this.setState({email, displayName, uid});
    }
    
    signOutUser = () => {
        firebase.auth().signOut();
    }

    
    
    render() {
        LayoutAnimation.easeInEaseOut();
        console.log(firebase.auth().currentUser) 
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.email}</Text>
                <Text>Hi {this.state.displayName}</Text>
                <Text>Hi {this.state.uid}</Text>
                <TouchableOpacity style={{ marginTop: 32 }} onPress = {this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#d9d4cf",
      alignItems: "center",
    },
})
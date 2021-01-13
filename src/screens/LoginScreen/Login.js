import React, {useState, useEffect} from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from "../../firebase/config"
// import * as firebase from 'firebase';
// import * as FirebaseCore from 'expo-firebase-core';
// import * as SecureStore from 'expo-secure-store';


export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
}

const onLoginPress = () => {
  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
          const uid = response.user.uid
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .get()
              .then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                      alert("此帳號不存在,請先註冊!")
                      return;
                  }
                  const user = firestoreDocument.data()
                  navigation.navigate('Home', {user: user})
              })
              .catch(error => {
                  alert(error)
              });
      })
      .catch(error => {
          alert(error)
      })
}

  
  return (
    <View style={styles.container}>
      {/* 鍵盤不會擋到輸入框 */}
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}>
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7c7877"
        onChangeText={(text) => setEmail(text)}
        value={email}
        returnKeyType="next" //返回鍵後到下一個Textinput
      />
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        placeholder="Password"
        placeholderTextColor="#7c7877"
        onChangeText={text=>setPassword(text)}
        value={password}
        returnKeyType="next" //返回鍵後到下一個Textinput
        secureTextEntry={true}//*****
      />
      
      <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>登入</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>還沒註冊嗎? 
                      <Text onPress={onFooterLinkPress} 
                        style={styles.footerLink}> 註冊
                      </Text>
                    </Text>
                </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d4cf",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    height: 150,
    width: 150,
    alignSelf: "center",
    margin: 30
},
  text: {
    color: "#6E6EFF",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
  },
  input: {
    height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
  },
  button: {
    backgroundColor: '#7c7877',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
},
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
},
footerText: {
    fontSize: 16,
    color: '#7c7877',
    fontWeight: "bold",
},
footerLink: {
    color: "#7DA09F",
    fontWeight: "bold",
    fontSize: 16
}
});

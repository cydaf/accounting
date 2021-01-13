import React, {useState, useEffect} from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
// import * as SecureStore from 'expo-secure-store';


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  async function signIn(){
    try {
      const res= firebase.auth()
        .signInWithEmailAndPassword(email, password);
        //將使用者輸入的帳號與密碼傳給firebase進行驗證
      console.log('User login successfully!');
      const loginString = JSON.stringify({email:email, password:password});

      await SecureStore.setItemAsync("login", loginString);
      setEmail('');
      setPassword('');
      setMessage('');
    }
    catch(error){
      setMessage(error.message);
    } 
   };
   async function getAccount(){

    try {

      console.log("getAccount");

      setMessage("getting username");

      const loginString = await SecureStore.getItemAsync("login");

      const login = JSON.parse(loginString);

      setEmail(login.email);

      setPassword(login.password);

      setMessage("");

    }

    catch(error){

      setMessage(error.message)

    }



  }

  useEffect(()=>{getAccount()},[]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>—Welcome—</Text>
      
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#6E6EFF"
        returnKeyType="next" //返回鍵後到下一個Textinput
        onChangeText={text=>setEmail(text)}
      />
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        placeholder="password"
        placeholderTextColor="#6E6EFF"
        returnKeyType="next" //返回鍵後到下一個Textinput
        onChangeText={text=>setPassword(text)}
        secureTextEntry={true}//*****
      />
      
      <TouchableOpacity stlye={styles.btn} onPress={signIn}>
        <Text style={styles.btnword}>   LOGIN   </Text>
      </TouchableOpacity>
      <Text>{message}</Text>
        <Button style={styles.txt2} title="Froget your password?"/>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4c4",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#6E6EFF",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    marginVertical: 10,
    padding: 8,
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 18,
  },
  btnword: {
    justifyContent: "center",
    padding:5,
    height:35,
    fontSize: 19,
    color: "#ffe4c4",
    backgroundColor: "#6E6EFF",
    marginBottom: 10,
  },
  txt2: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
});

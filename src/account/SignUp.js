import React, {useState} from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");//for error message from signUp
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  async function signUp(){
    try {
      const res = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({displayName: displayName});
      //console.log('User registered successfully!');
      setDisplayName('');
      setEmail('');
      setPassword('');
      setMessage('');
    }
    catch(error){
      setMessage(error.message);
    }
  }   
  return (
    <View style={styles.container}>
      <Text style={styles.text}>—Welcome—</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        placeholderTextColor="#6E6EFF"
        returnKeyType="next" //返回鍵後到下一個Textinput
        onChangeText={text=>setDisplayName(text)}
        value={displayName}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#6E6EFF"
        returnKeyType="next" //返回鍵後到下一個Textinput
        onChangeText={text=>setEmail(text)}
        value={email}
      />
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        placeholder="password"
        placeholderTextColor="#6E6EFF"
        returnKeyType="next" //返回鍵後到下一個Textinput
        onChangeText={text=>setPassword(text)}
        value={password}
        secureTextEntry={true}//*****
      />
      
      <TouchableOpacity stlye={styles.btn} onPress={signUp}>
        <Text style={styles.btnword}>  REGISTER  </Text>
      </TouchableOpacity>
      <Text>{message}</Text>
      
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
    // marginTop: 150,
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
    fontSize: 19,
    color: "#ffe4c4",
    backgroundColor: "#6E6EFF",
    padding: 6,
    height: 40,
  },

});

import React, {state, useState, Component} from "react";
import { render } from "react-dom";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Picker,
  Modal,
} from "react-native";

import DatePicker from 'react-native-datepicker';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import { config } from "../../firebase_config";




var type = [
  { label: "食", value: "食" },
  { label: "衣", value: "衣" },
  { label: "住", value: "住" },
  { label: "行", value: "行" },
  { label: "育", value: "育" },
  { label: "樂", value: "樂" }
];
export default function RecordUpdate(props){
  
  console.log("123");
   console.log(props);
  var user = firebase.auth().currentUser;
  const [classification, setClassification] = useState("");

  const [updateprice, setPrice] = useState("");

  const [updatedate, setDate] = useState("");

  const [updatenote, setNote] = useState("");

  

  if (!firebase.apps.length) {

    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);

  } 

  const db = firebase.firestore();



  async function update(){

    try {
      // db.collection("fullrecord").doc(user.uid).collection("record").doc(id).update().then(function () {
      //   console.log("Document successfully deleted!");

      const docRef = await db.collection("fullrecord").doc(user.uid).collection("record").doc(id).update({

        classification: classification,

        note: note,

        price: parseInt(price),

        date: date

      })
      .then(function() {
        console.log("成功加入");
      })
      .catch(function(error){
        console.log("加入失敗", error);
      });

      console.log('456');
      // console.log(props);
      // console.log(docRef.id);
      // console.log(docRef.price);
      

      setClassification("");

      setPrice(price);

      setNote("");

      setDate("");

    }

    catch(error) {

      console.error("Error adding document: ", error);

    }
    

  }
  
  
    return (
      <Modal visible={props.modalVisible}>
      <View style={styles.container}>
        
        <Text
        style={{marginBottom:50}}
        >記錄您每天的花費吧</Text>

          <Text style={{color:"#6E6EFF"}}>價錢</Text>
          <TextInput
          style={[styles.input, { marginBottom: 30 }]}
           value={123} onChangeText={text=>setPrice(text)}/>

          <Text style={{color:"#6E6EFF"}}>項目名稱</Text>
          <TextInput
          style={[styles.input, { marginBottom: 30 }]}
          value={123} onChangeText={text=>setNote(text)}/>

          <Text style={styles.title}>時間</Text>
          
          <DatePicker
          style={styles.datePickerStyle}
          date={updatedate} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate=""
          maxDate=""
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
          />

          <Text style={styles.title}>分類</Text>
          
          <RadioForm
          radio_props={type}
          placeholder=""
          initial={1}
          onPress={(value) => setClassification(value)}
          formHorizontal={true}/>
        
        <TouchableOpacity style={styles.btn} >
        <Button style={styles.btnword} onPress={update} title="確認"></Button>
      </TouchableOpacity>

      </View>
      </Modal>
    );  
  }


  
  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: "#ffe4c4",
      alignItems: "center",
      justifyContent: "center",
    },
    btn:{
      marginTop:40,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
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
    picker: {
      width: 200,
      backgroundColor: '#ffffff',
      
    },
    pickerItem: {
      color: 'black',
      
    },
    onePicker: {
      width: 200,
      height: 44,
      
    },
    pickerView:{
      height:400,  
       
    },
    onePickerItem: {
      height: 44,
      color: 'black',
      borderRadius:20 
    },
  });
  

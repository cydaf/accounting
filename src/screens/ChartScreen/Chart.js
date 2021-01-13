import React from 'react';
import {Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from "firebase";
import { render } from 'react-dom';


//已完成功能
//1.圖表前端介面
//2.圖表連後端資料庫
//3.onload事件
//4.webview內容放到地端上
//5.抓取使用者的id:https://www.itread01.com/content/1550483643.html



export default function App(){
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


const db = firebase.firestore();
let user = firebase.auth().currentUser;

  const charturl='./chart.html'+'';
  //獲取當月月份
  let month = new Date().getMonth()+1;
  return (
    
<View style={{flex:1}}>
    <View style={{alignItems: 'center',backgroundColor:"#adb5bd"}}>
    <Text style={{
      height:50,
      marginTop:60,
      fontSize:30,
      marginBottom:10,
      color: "#FFFFFF",
      
      }}>當月數據圖表 :{month}月</Text>
    </View>  
    <WebView 

    javaScriptEnabled={true}
    //injecterjs一定要搭配onMessage欸 莫名其妙欸 https://github.com/react-native-webview/react-native-webview/issues/1260
    onMessage={(event)=> Alert.alert(event.nativeEvent.data) }
    //startInLoadingState="true" 
    renderLoading={displaySpinner}  
    source={require(charturl)} 

    //onMessage event is required as well to inject the JavaScript code into the WebView.
    //網路上都沒有看到別人這樣寫，幾乎都用 document...value=? 跟onMessage傳
    injectedJavaScript={`chart("${user.uid}");
    `
  }
     />
</View>
  );

}

function displaySpinner() {
  return (
  <View >
    <Spinner
          visible={true}
          textContent={'努力生成圖表中...'}
          overlayColor={'rgba(207, 206, 206, 0.8)'}
        />
    </View>
  );
}




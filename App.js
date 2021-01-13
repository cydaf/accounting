// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react'
// import { firebase } from './src/firebase/config'
// import { NavigationContainer } from "@react-navigation/native"
// import { createStackNavigator } from '@react-navigation/stack'
// import { LoginScreen, HomeScreen, RegistrationScreen} from './src/screens'
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import RegisterScreen from './src/screens/RegisterScreen'

import AddScreen from './src/screens/AddScreen'
import HomeScreen from './src/screens/HomeScreen'
import ChartScreen from './src/screens/ChartScreen/Chart'
import AccountScreen from './src/screens/AccountScreen'
import { firebase } from "./src/firebase/config"
require('react-native').unstable_enableLogBox();
console.disableYellowBox = true;

const AppTabNavigator = createBottomTabNavigator(
  {
    AccountScreen: {
      // screen: AccountScreen,
      // navigationOption: {
      //   tabBarIcon: ({tintColor}) => <Ionicons name="ios-book" size={24} color={tintColor}/>
      // }

      screen: AccountScreen,
        navigationOptions: {
            tabBarLabel: '消費紀錄',
            tabBarIcon:({tintColor}) => <Icon size={ 24 } name={ 'ios-basket' } color={ tintColor }/>
        }
    },
    AddScreen: {
      // screen: AccountScreen,
      // navigationOption: {
      //   tabBarIcon: ({tintColor}) => <Ionicons name="ios-book" size={24} color={tintColor}/>
      // }

      screen: AddScreen,
        navigationOptions: {
            tabBarLabel: '記帳',
            tabBarIcon:({tintColor}) => <Icon size={ 24 } name={ 'ios-book' } color={ tintColor }/>
        }
    },
    ChartScreen: {
      // screen: ChartScreen,
      // navigationOption: {
      //   tabBarIcon: ({tintColor}) => <Ionicons name="ios-md-analytics" size={24} color={tintColor}/>
      // }

      screen: ChartScreen,
        navigationOptions: {
            tabBarLabel: '圖表',
            tabBarIcon:({tintColor}) => <Icon size={ 24 } name={ 'ios-analytics' } color={ tintColor }/>
        }
    }, 
    HomeScreen: {
      // screen: HomeScreen,
      // navigationOption: {
      //   tabBarIcon: ({tintColor}) => <Iconicons name="ios-person" size={24} color={tintColor}/>
      // }

      screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: '個人資料',
            tabBarIcon:({tintColor}) => <Icon size={ 24 } name={ 'ios-person' } color={ tintColor }/>
        }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#7DA09F",
      inactiveTintColor: "#b8bbc4",
      // showLabel: false,
      style:{
        backgroundColor: '#7c7877',
        height: 60
      },
      labelStyle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 8
      }
    }
  }
);

const Authstack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: Authstack
    },
    {
      initialRouteName: "Loading"
    }
  )
)



// const Stack = createStackNavigator();

// function Root() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//       <Drawer.Screen name="記帳點我" component={page1} />
//       <Drawer.Screen name="圖表看我" component={page2} />
//       {/* <Drawer.Screen name="登出走這裡" component={SignOut}/> */}
//       <Drawer.Screen name="真正的圖表看這裡" component={chart}/>
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {

//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const usersRef = firebase.firestore().collection('users');
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         usersRef
//           .doc(user.uid)
//           .get()
//           .then((document) => {
//             const userData = document.data()
//             setLoading(false)
//             setUser(userData)
//           })
//           .catch((error) => {
//             setLoading(false)
//           });
//       } else {
//         setLoading(false)
//       }
//     });
//   }, []);

//   if (loading) {
//     return (
//       <></>
//     )
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <Stack.Screen name="Home" options={{
//             headerTitleAlign: "center",
//             headerStyle: {
//               backgroundColor: '#7c7877',
//             },
//             headerTitleStyle: {
//               fontSize: 20
//             },
//             headerTintColor: '#fff',
//           }}>
//             {props => <HomeScreen {...props} extraData={user} />}
//           </Stack.Screen>
//         ) : (
//             <>
//               <Stack.Screen
//                 name="Login" component={LoginScreen}
//                 options={{
//                   headerTitleAlign: "center",
//                   headerStyle: {
//                     backgroundColor: '#7c7877',
//                     height: 100
//                   },
//                   headerTitleStyle: {
//                     fontSize: 28
//                   },
//                   headerTintColor: '#fff',
//                 }} />
//               <Stack.Screen
//                 name="Registration" component={RegistrationScreen}
//                 options={{
//                   headerLeft: null,
//                   headerTitleAlign: "center",
//                   headerStyle: {
//                     backgroundColor: '#7c7877',
//                     height: 100
//                   },
//                   headerTitleStyle: {
//                     fontSize: 28
//                   },
//                   headerTintColor: '#fff',
//                 }} />
               
//             </>
//           )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useState } from "react";
// //import { View, Text } from 'react-native';
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// //import { createStackNavigator } from '@react-navigation/stack';

// import SignIn from "./src/account/SignIn";
// import SignUp from "./src/account/SignUp";
// import HomeScreen from "./homescreen";
// import Chart from "./src/chart/Chart";

// //const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//       tabBarOptions={{
//         style: { backgroundColor: "#F0E5DE", shadowColor: "#7c7877" },
//         tabStyle: {},
//         labelStyle: {
//           fontSize: 20,
//           fontWeight: "bold",
//           color: "#7c7877",
//           lineHeight: 20,
//         },
//       }}>
//         <Tab.Screen name="SignIn" component={SignIn} />
//         <Tab.Screen name="SingUp" component={SignUp} />
//         <Tab.Screen name="HomeSceen" component={HomeScreen} />
//         <Tab.Screen name="Chart" component={Chart} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;

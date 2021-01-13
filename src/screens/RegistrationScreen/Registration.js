import React, { useState } from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config'
// import * as firebase from 'firebase';
// import * as FirebaseCore from 'expo-firebase-core';

export default function Registration({ navigation }) {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("密碼不符合,請重新確認密碼")
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    displayName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Login')
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
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
                    placeholder="Name"
                    placeholderTextColor="#7c7877"
                    returnKeyType="next" //返回鍵後到下一個Textinput
                    onChangeText={text => setDisplayName(text)}
                    value={displayName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7c7877"
                    returnKeyType="next" //返回鍵後到下一個Textinput
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#7c7877"
                    returnKeyType="next" //返回鍵後到下一個Textinput
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}//*****
                />
                <TextInput
                    style={[styles.input, { marginBottom: 10 }]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#7c7877"
                    returnKeyType="next" //返回鍵後到下一個Textinput
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={true}//*****
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>註冊</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        已經註冊過了嗎?
            <Text onPress={onFooterLinkPress}
                            style={styles.footerLink}> 登入
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
        marginTop: 20,
        marginBottom: 30
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

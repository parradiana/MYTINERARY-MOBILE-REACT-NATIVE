import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import userActions from '../redux/actions/userActions'
import { showMessage, hideMessage } from "react-native-flash-message";
const LogIn = (props) => {
    const [logInUsuario, setLogInUsuario] = useState({ email: '', password: '' })
    const readInput = (e, campo) => {
        setLogInUsuario({
            ...logInUsuario,
            [campo]: e
        })
    }
    const sendForm = async () => {
        if (logInUsuario.email === '' || logInUsuario.password === '') {
            showMessage({
                message: 'All the fields must be filled',
                type: "danger",
            });
        } else {
            const response = await props.loguearUsuario(logInUsuario)
            response 
            ? showMessage({
                message: response,
                type: "danger",
            }) : props.navigation.navigate('home')
            setLogInUsuario({ email: '', password: '' })
        }
    }
    return (
        <>
        <StatusBar translucent backgroundColor="transparent"/>
        <View style={styles.contenedorForm}>
            <ImageBackground source={{ uri: 'https://webdesing881317710.files.wordpress.com/2021/05/imagenformulario-1.jpg' }} style={styles.imageForm}>
                <Text style={{color: 'white', fontSize: 50, textAlign: 'center', marginTop: '30%', fontWeight: 'bold'}}>Welcome back!</Text>
                <Text style={{color: 'white', fontSize: 20, textAlign: 'center', marginBottom: '10%'}}>Log in to discover and connect with MYtinerary's global community</Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor='#333333'
                    color='black'
                    style={styles.inputLogIn}
                    keyboardType='email-address'
                    onChangeText={(e) => readInput(e, 'email')}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor='#333333'
                    color='black'
                    secureTextEntry={true}
                    password = {true}
                    style={styles.inputLogIn}
                    onChangeText={(e) => readInput(e, 'password')}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={sendForm}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Log in</Text>
                </TouchableOpacity>
                <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('signup')}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}}>Sign Up</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    inputLogIn: {
        backgroundColor: 'rgba(255, 255, 255, 0.50)',
        width: '65%',
        borderRadius: 30,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        marginBottom: 10,
        fontSize: 20
    },
    contenedorForm: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    button: {
        backgroundColor: "#ff9566",
        width: "30%",
        borderRadius: 20,
        padding: 10
    },
    imageForm: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    }
})
const mapDispatchToProps = {
    loguearUsuario: userActions.loguearUsuario
}
export default connect(null, mapDispatchToProps)(LogIn)
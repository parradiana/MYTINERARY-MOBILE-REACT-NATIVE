import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import SelectPicker from 'react-native-form-select-picker'
import userActions from '../redux/actions/userActions'
import axios from 'axios'
import { showMessage, hideMessage } from "react-native-flash-message";
const SignUp = (props) => {
    const [nuevoUsuario, setNuevoUsuario] = useState({ firstname: '', lastname: '', email: '', password: '', image: '', country: '' })
    const [paises, setPaises] = useState([])
    const [mistakes, setMistakes] = useState({ firstname: '', lastname: '', email: '', password: '', image: '', country: '' })
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setPaises(response.data))
    }, [])
    const readInput = (e, campo, value) => {
        setNuevoUsuario({
            ...nuevoUsuario,
            [campo]: e || value
        })
    }
    const sendForm = async () => {
        setMistakes({ firstName: '', lastName: '', email: '', password: '', img: '' })
        if (Object.values(nuevoUsuario).some(value => value === "")) {
            showMessage({
                message: 'All the fields must be filled',
                type: "danger",
            });
        } else {
            const response = await props.agregarUsuario(nuevoUsuario)
            if (response) {
                response.details.map(error => setMistakes((prevState) => {
                    return { ...prevState, [error.context.label]: error.message }
                }))
            } else{
                props.navigation.navigate('home')
            }
        }
        setNuevoUsuario({ firstname: '', lastname: '', email: '', password: '', image: '', country: '' })
    }
    return (
        <View style={styles.contenedorForm}>
            <ImageBackground source={{ uri: 'https://webdesing881317710.files.wordpress.com/2021/05/imagenformulario-1.jpg' }} style={styles.imageForm}>
                        <Text style={{ color: 'white', fontSize: 50, textAlign: 'center', fontWeight: 'bold', marginTop: 65}}>Create Account!</Text>
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 30}}>Please fill the details to Sign Up!</Text>
                        <TextInput
                            placeholder="Firstname"
                            placeholderTextColor='#333333'
                            color='black'
                            style={styles.inputSignUp}
                            onChangeText={(e) => readInput(e, 'firstname')}
                        />
                        {mistakes.firstname ? <Text style={{ color: 'white' }}>{mistakes.firstname}</Text> : null}
                        <TextInput
                            placeholder="Lastname"
                            placeholderTextColor='#333333'
                            color='black'
                            style={styles.inputSignUp}
                            onChangeText={(e) => readInput(e, 'lastname')}
                        />
                        {mistakes.lastname ? <Text style={{ color: 'white' }}>{mistakes.lastname}</Text> : null}
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor='#333333'
                            color='black'
                            style={styles.inputSignUp}
                            keyboardType='email-address'
                            onChangeText={(e) => readInput(e, 'email')}
                        />
                        {mistakes.email ? <Text style={{ color: 'white' }}>{mistakes.email}</Text> : null}
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor='#333333'
                            color='black'
                            secureTextEntry={true}
                            password = {true}
                            style={styles.inputSignUp}
                            onChangeText={(e) => readInput(e, 'password')}
                        />
                        {mistakes.password ? <Text style={{ color: 'white', textAlign: 'center'}}>{mistakes.password}</Text> : null}
                        <TextInput
                            placeholder="URL"
                            placeholderTextColor='#333333'
                            color='black'
                            style={styles.inputSignUp}
                            keyboardType='url'
                            onChangeText={(e) => readInput(e, 'image')}
                        />
                        {mistakes.image ? <Text style={{ color: 'white' }}>{mistakes.image}</Text> : null}
                        <SelectPicker default="Select your country"
                            onValueChange={(e) => readInput(e, "country")}
                            placeholderStyle={{ color: 'black' }}
                            label="Country"
                            style={styles.inputSignUp}
                            placeholder='Select your country'
                        >
                            {paises.map((pais) => (<SelectPicker.Item label={pais.name} value={pais.name} key={pais.name} />))}
                        </SelectPicker>
                        {mistakes.country ? <Text style={{ color: 'white' }}>{mistakes.country}</Text> : null}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={sendForm}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', textDecorationLine: 'underline' }}>Log In</Text>
                        </TouchableOpacity>
            </ImageBackground>

        </View>
    )
}
const styles = StyleSheet.create({
    inputSignUp: {
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
    select: {
        marginTop: 10,
        backgroundColor: 'red',
        color: 'red'
    },
    imageForm: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    }

})
const mapDispatchToProps = {
    agregarUsuario: userActions.agregarUsuario
}
export default connect(null, mapDispatchToProps)(SignUp)
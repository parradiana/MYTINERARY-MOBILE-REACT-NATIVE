import React from 'react'
import { connect } from "react-redux"
import { createStackNavigator } from '@react-navigation/stack'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import { StyleSheet, View, Image, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import userActions from '../redux/actions/userActions'
const stack = createStackNavigator()
const SignStack = (props) => {
    return (
        <>
            {!props.usuarioLogueado ?
                <stack.Navigator headerMode={false}>
                    <stack.Screen name="login" component={LogIn} />
                    <stack.Screen name="signup" component={SignUp} />
                </stack.Navigator>
            : <View style={styles.modalView}>
                    <Image source={{uri: props.usuarioLogueado.image}} style={styles.imageUser}/>
                    <Text style={styles.textoUser}>{props.usuarioLogueado.firstname} {props.usuarioLogueado.lastname}</Text>
                    <Text style={styles.textoUser2}>{props.usuarioLogueado.email}</Text>
                    <TouchableOpacity onPress={() => {props.desloguearUsuario(); props.navigation.navigate('home')}} style={styles.buttomLogOut}>
                        <Text style={{color: '#ff9566', fontSize: 25, textAlign: 'center'}}>Log Out</Text>
                    </TouchableOpacity>
                </View>    
            }
        </>
    )
}
const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: '#ff9566',
        alignItems: 'center',
        width: '100%'
    },
    imageUser:{
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: '30%',
        marginBottom: 10
    },
    textoUser:{
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10
    },
    textoUser2:{
        fontSize: 35,
        color: 'white',
        marginBottom: '20%'
    },
    buttomLogOut:{
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
    }
})
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    desloguearUsuario: userActions.desloguearUsuario
}
export default connect(mapStateToProps, mapDispatchToProps)(SignStack)
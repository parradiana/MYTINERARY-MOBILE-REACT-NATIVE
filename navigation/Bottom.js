import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import { CitiesStack, HomeStack} from './Stack'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image, StyleSheet} from 'react-native'
import SignStack from './SignStack'

const bottom = createBottomTabNavigator()

const Bottom = (props) => {
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        if (!props.usuarioLogueado && AsyncStorage.getItem('token')) {
            const token = await AsyncStorage.getItem('token')
            const objetoUsuario = await AsyncStorage.getItem('usuarioLogueado')
            const usuarioParse = JSON.parse(objetoUsuario)
            const usuarioAsyncStorage = {
                ...usuarioParse,
                token: token
            }
            props.logueoAsyncStorage(usuarioAsyncStorage)
            return null
        }
    }
    let usuarioImage = props.usuarioLogueado ? <Image source={{ uri: props.usuarioLogueado.image }} style={styles.usuarioImage} /> : <Icon name='user' size={30} color={'#ffffff'} />
    return (
        <bottom.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    elevation: 0,
                    backgroundColor: '#ff9566',
                    borderRadius: 25,
                    height: 60,
                    borderTopWidth: 'none'
                }
            }}
        >
            <bottom.Screen name="home" component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name='home' size={30} color={'#ffffff'} />
                )
            }} />
            <bottom.Screen name="cities" component={CitiesStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name='globe' size={30} color={'#ffffff'} />
                )
            }} />
            <bottom.Screen name="login" component={SignStack} options={{
                tabBarIcon: ({ color, size }) => (
                    usuarioImage
                )
            }} />
        </bottom.Navigator>
    )
}
const styles = StyleSheet.create({
    usuarioImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
    }
})
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    logueoAsyncStorage: userActions.logueoAsyncStorage
}
export default connect(mapStateToProps, mapDispatchToProps)(Bottom)
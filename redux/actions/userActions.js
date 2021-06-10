import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { showMessage, hideMessage } from "react-native-flash-message";
const userActions = {
    agregarUsuario: (nuevoUsuario) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('https://mytinerary-parra.herokuapp.com/api/user/signup', nuevoUsuario)
                if (response.data.errors) {
                    return response.data.errors
                } else if (response.data.error){
                    showMessage({
                        message: response.data.error,
                        type: "danger",
                    });
                    return response.data.error  
                } else {
                    await AsyncStorage.setItem('usuarioLogueado', JSON.stringify({
                        firstname: response.data.respuesta.firstname,
                        image: response.data.respuesta.image, email: response.data.respuesta.email, lastname: response.data.respuesta.lastname
                    }))
                    await AsyncStorage.setItem('token', response.data.respuesta.token)
                    dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })
                    showMessage({
                        message: "Welcome to MYtinerary " + response.data.respuesta.firstname,
                        type: "success",
                    });
                }
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    loguearUsuario: (logInUsuario) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('https://mytinerary-parra.herokuapp.com/api/user/login', logInUsuario)
                if (!response.data.success) {
                    return response.data.error
                } else {
                    await AsyncStorage.setItem('usuarioLogueado', JSON.stringify({
                        firstname: response.data.respuesta.firstname,
                        image: response.data.respuesta.image, email: response.data.respuesta.email, lastname: response.data.respuesta.lastname
                    }))
                    await AsyncStorage.setItem('token', response.data.respuesta.token)
                    dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })
                    showMessage({
                        message: "Welcome to MYtinerary " + response.data.respuesta.firstname,
                        type: "success",
                    });
                }
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    desloguearUsuario: () => {
        return async(dispatch, getState) => {
            await AsyncStorage.clear()
            dispatch({ type: 'DESLOGUEAR_USUARIO' })
            showMessage({
                message: "Hope to see you soon!",
                type: "info",
            });
        }
    },
    logueoAsyncStorage: (usuarioAsyncStorage) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://mytinerary-parra.herokuapp.com/api/user/logueolocalstorage', {
                    headers: {
                        'Authorization': 'Bearer ' + usuarioAsyncStorage.token
                    }
                })
                dispatch({ type: 'LOGUEAR_USUARIO', payload: { ...response.data.respuesta, token: usuarioAsyncStorage.token } })
            } catch (error) {
                if (error.response.status === 401) {
                    console.log(error)
                    // showMessage({
                    //     message: "Oops! Something went wrong! You are not authorized to enter this page",
                    //     type: "danger",
                    // });
                }
            }
        }
    }
}

export default userActions
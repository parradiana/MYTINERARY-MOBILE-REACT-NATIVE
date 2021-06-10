import axios from 'axios'
import { showMessage, hideMessage } from "react-native-flash-message";
const itinerariesActions = {
    cargarItinerarios: (id) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://mytinerary-parra.herokuapp.com/api/itineraries/' + id)
                dispatch({type: 'CARGAR_ITINERARIOS', payload: response.data.respuesta})
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    reseteoItineraries: () => {
        return (dispatch, getState) => {
            dispatch({ type: 'RESETEO_ITINERARIOS', payload: [] })
        }
    },
    cargarActividades: (id) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://mytinerary-parra.herokuapp.com/api/activities/' + id)
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    cargarComentario: (inputcomment, id) => {
        var comment = inputcomment.comment
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('https://mytinerary-parra.herokuapp.com/api/comments/' + id, { comment }, {
                    headers: {
                        'Authorization': 'Bearer ' + inputcomment.token
                    }
                })
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    editarComentario: (idItinerary, comment, idComment) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://mytinerary-parra.herokuapp.com/api/comments/'+idItinerary, {comment, idComment})
                return response.data.respuesta.comments
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    borrarComentario: (idItinerary, idComment) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('https://mytinerary-parra.herokuapp.com/api/comments/'+idItinerary, {
                    data:{
                        idComment: idComment
                    }
                })
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    },
    like: (token, idItinerary) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://mytinerary-parra.herokuapp.com/api/like/', {idItinerary},{
                    headers:{
                        'Authorization': 'Bearer ' +token 
                    }
                })
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Oops! Something went wrong!",
                    type: "danger",
                });
            }
        }
    }
}
export default itinerariesActions
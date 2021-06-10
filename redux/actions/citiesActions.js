import axios from "axios"

const citiesActions = {
    fetcheoApi: () => {
        return async (dispatch, getState) => {
            const response = await axios.get('http://mytinerary-parra.herokuapp.com/api/cities')
            dispatch({type: 'FETCHEO_API', payload: response.data.respuesta})
        }
    },
    filtrarCities: (e) => {
        return(dispatch, getState) => {
            dispatch({type:'FILTRAR_CITIES', payload: e})
        }
    }
}    
export default citiesActions   
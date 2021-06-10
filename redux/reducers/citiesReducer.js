const initialState = {
    cities: [],
    citiesCopia: [],
}
const citiesReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'FETCHEO_API':
            return{
                ...state,
                cities: action.payload,
                citiesCopia: action.payload, 
            }
            break;
        case 'FILTRAR_CITIES':
            return{
                ...state,
               citiesCopia: state.cities.filter(ciudad => ciudad.nombreCiudad.toLowerCase().indexOf(action.payload.trim().toLowerCase()) === 0) 
            }
            break;         
        default:
            return state
    }
}
export default citiesReducer
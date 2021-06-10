const initialState = {
    itineraries: [],
}
const itinerariesReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CARGAR_ITINERARIOS':
            return{
                ...state,
                itineraries: action.payload,
            }
        break;
        case 'RESETEO_ITINERARIOS':
            return{
                itineraries: action.payload,
            }
        break;       
        default:
            return state
    }
}
export default itinerariesReducer
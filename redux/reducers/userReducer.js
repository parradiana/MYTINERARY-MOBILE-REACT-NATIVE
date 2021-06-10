const initialState = {
    usuarioLogueado: null,
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGUEAR_USUARIO':
            return {
                ...state,
                usuarioLogueado: action.payload
            }
        case 'DESLOGUEAR_USUARIO':
            return {
                ...state,
                usuarioLogueado: null
            }
        default:
            return state

    }
}
export default userReducer
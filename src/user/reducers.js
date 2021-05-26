import initialState from '../store/initialState' 

export const userReducer = (state = initialState.user,{type,payload})=>{
  switch(type){
    case 'SIGN_IN':
      return {
        ...state,
        ...payload
      }
      default:
        return state
  }
}

import initialState from '../store/initialState' 

export const userReducer = (state = initialState.user,{type,payload})=>{
  switch(type){
    case 'SIGN_IN':
      return {
        ...state,
        //スプレッド構文により被ってる場所だけ上書きしてくれる
        ...payload,
      };
      default:
        return state
  }
}

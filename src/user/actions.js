export const SIGN_IN = "SIGN_IN";

export const signInAction = (userState) => (dispatch) =>
  dispatch({
    type: SIGN_IN,
    payload: { isSignedIn:true,id: userState.id, name: userState.name ,email:userState.email},
  });




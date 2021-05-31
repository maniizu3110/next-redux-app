import initFirebase from "../../firebase/initFirebase";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { setUserCookie } from "../../firebase/userCookies";
import { mapUserData } from "../../firebase/mapUserData.js";

initFirebase();

const firebaseAuthConfig = {
  signInFlow: "popup",

  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/auth',
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      //ここでuser作成
      const userData = mapUserData(user);
        const url = "https://api.github.com/users/maniizu3110";
        const response = await fetch(url).then((res) => res.json());
        console.log(response);
      console.log(user);
      console.log(userData);
      //TODO:cookieをどう持たせるのか要検討。フロント側から持たせてもいいが、ここの処理でサーバー側から持たせてもいい？（keyを同じに設定すれば別に変わらんけど。（セキュリティ的には別がいいのかな？））
      setUserCookie(userData);
    },
  },
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;

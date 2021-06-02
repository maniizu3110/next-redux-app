import initFirebase from "../../firebase/initFirebase";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
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
  signInSuccessUrl: '/',
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      //新規登録の場合の処理
      await firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          setUserCookie(idToken);
        })
        .catch(function (error) {
          alert("トークンの取得に失敗しました");
        });
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        const userData = mapUserData(user);
        await axios
          .post("http://localhost:8080/api/v1/user", userData, {
            withCredentials: true,
          })
          //cookieからjwt=>確認=>ユーザーが新い情報のユーザーであれば作成する
          .catch((res) =>
            alert(
              "サーバーへのユーザー登録に失敗しました。一部機能をご利用いただけません"
            )
          );
      }
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

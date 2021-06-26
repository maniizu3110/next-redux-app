import initFirebase from "../../firebase/initFirebase";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import { setUserCookie } from "../../firebase/userCookies";
import { mapUserData } from "../../firebase/mapUserData.js";
//処理完了した時にstoreに確実に情報を登録する（トランザクション）

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
  //TODO：urlにIDを含めてそれに応じてAPI叩く
  signInSuccessUrl: '/user',
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      await firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async (idToken) => {
        setUserCookie(idToken);
        //emailとnameを使ってapiサーバと認証サーバの整合性をとる
        const userData = mapUserData(user);
        await axios.get("http://localhost:8080/api/v1/user/login",{
        params:{ "name":`${userData.name}`,"email":`${userData.email}`}
        }).then(res=>{
          const user = res.data;
          // dispatch(signInAction({id:user.ID,name:user.name,email:user.email}))

        })
      })
      .catch(function (error) {
        alert("トークンの取得に失敗しました");
      });
      //新規登録の場合の処理
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        const userData = mapUserData(user);
        await axios
          .post("http://localhost:8080/api/v1/user", userData, {
            withCredentials: true,
          }).then(

          )
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
import { Provider } from 'react-redux'
import { useStore } from '../src/store/store'
import Auth from "./auth"
import { useUser } from "../firebase/useUser";
import firebase from "../firebase/initFirebase";

firebase()
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const { user, logout } = useUser();
  if(user){
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      )
  }else{
    return(
      <Auth/>
    )
  }

}

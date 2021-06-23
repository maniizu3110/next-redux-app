import { Provider } from 'react-redux'
import { useStore } from '../src/store/store'
//firebaseで承認されていなければ、ログインページへ飛ぶようにしておきたい

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  if (1 ==2g){
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      )
  } else{
    return(
      <div>ログインしてね</div>
    )
  }

}

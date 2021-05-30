import { Provider } from "react-redux";
import { AuthProvider } from "../auth";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { useStore } from "../src/store/store";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}

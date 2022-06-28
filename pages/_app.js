import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Login from "../components/Login";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

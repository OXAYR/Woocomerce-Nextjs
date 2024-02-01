// pages/_app.js
import './styles.css';
import { Provider } from 'react-redux';
import store from '../(store)/store';

function MyApp({ Component, pageProps }) {
    <Provider store={store}>
        return <Component {...pageProps} />;
    </Provider>
}

export default MyApp;

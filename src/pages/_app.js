import './styles.css';
import { Provider } from 'react-redux';
import { store } from '../(store)/store';
import Navbar from '@/components/Layout/Navbar';


function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <div className='bg-gray-50'>
                <Navbar />
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

export default MyApp;


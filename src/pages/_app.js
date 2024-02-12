import './styles.css';
import { Provider } from 'react-redux';
import { store, persistor } from '../(store)/store';
import Navbar from '@/components/Layout/Navbar';
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className='bg-gray-50'>
                    <Navbar />
                    <Component {...pageProps} />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;





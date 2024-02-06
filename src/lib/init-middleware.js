// lib/init-middleware.js

import Cors from 'cors';

// Initialize CORS middleware
const cors = initMiddleware => {
    return (
        Cors({
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        })
    );
};

export default cors;

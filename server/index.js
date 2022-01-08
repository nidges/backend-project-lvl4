import Fastify from 'fastify';

import router from './routes/root.js';

export default () => {
    const app = Fastify({
        logger: true
    });

    router(app);

    return app;
}

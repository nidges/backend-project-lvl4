import Fastify from 'fastify';
import pointOfView from "point-of-view";
import Pug from 'pug';
import path from 'path';

import router from './routes/root.js';
import {fileURLToPath} from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default () => {
    const app = Fastify({
        logger: true
    });

    app.register(pointOfView, {
        engine: {
            pug: Pug
        },
        includeViewExtension: true,
        root: path.join(__dirname, "views"),
        propertyName: "render",
    })

    router(app);

    return app;
}

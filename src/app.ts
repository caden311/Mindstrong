import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DB } from './db/db';
import * as express from 'express';
import { BaseController } from './controllers/base-controller';
import { EHRController } from './controllers/EHR-controller';
import { container } from 'tsyringe';
import { EHRService } from './services/EHR.service';
var cors = require('cors')
dotenv.config();


// Add additional mongo collection services here.
const serviceInfo = [
    {name: 'EHR', service: container.resolve(EHRService)},
];


DB.create(serviceInfo).then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    const port = 3000;

    // Add additional Controllers here.
    var controllers: BaseController[] = [
        container.resolve(EHRController),
    ];
 

    controllers.forEach(c => {
        c.setupRoutes(app);
    })

    app.listen(port, () => {
        console.log('Express app running on port: ' + port);
    });


});
  
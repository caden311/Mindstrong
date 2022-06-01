import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DB } from './db/db';
import * as express from 'express';
import { BaseController } from './controllers/base-controller';
import { EHRController } from './controllers/EHR-controller';
import { container } from 'tsyringe';
import { EHRService } from './services/EHR.service';
import { Server } from 'http';
var cors = require('cors')
dotenv.config();

export class MindstrongServer {
    public app: express.Application;
    public server: Server;

     // ADD ADDITIONAL MONGO COLLECTION SERVICES HERE
    public serviceInfo = [
        { name: 'EHR', service: container.resolve(EHRService) },
    ];

    // ADD ADDITIONAL CONTROLLERS HERE
    public controllers: BaseController[] = [
        container.resolve(EHRController),
    ];

    constructor() {}

    public async init(port: number = 3000) {



    await DB.create(this.serviceInfo).then(() => {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());


        this.controllers.forEach(c => {
            c.setupRoutes(this.app);
        })

        this.server = this.app.listen(port, () => {
            console.log('Express app running on port: ' + port);
        });

    });
   }
   public async closeConnection() {
       this.server.close();
   }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindstrongServer = void 0;
require("reflect-metadata");
const dotenv = require("dotenv");
const db_1 = require("./db/db");
const express = require("express");
const EHR_controller_1 = require("./controllers/EHR-controller");
const tsyringe_1 = require("tsyringe");
const EHR_service_1 = require("./services/EHR.service");
var cors = require('cors');
// Add additional mongo collection services here.
const serviceInfo = [
    { name: 'EHR', service: tsyringe_1.container.resolve(EHR_service_1.EHRService) },
];
class MindstrongServer {
    constructor() {
        const app = express();
        app.use(express.json());
        app.use(cors());
        const port = 3000;
        // Add additional Controllers here.
        this.controllers = [
            tsyringe_1.container.resolve(EHR_controller_1.EHRController),
        ];
        this.controllers.forEach(c => {
            c.setupRoutes(app);
        });
        app.listen(port, () => {
            console.log('Express app running on port: ' + port);
        });
    }
}
exports.MindstrongServer = MindstrongServer;
dotenv.config();
db_1.DB.create(serviceInfo).then(() => {
    const server = new MindstrongServer();
});
//# sourceMappingURL=app.js.map
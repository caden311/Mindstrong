"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongodb_1 = require("mongodb");
const _ = require("lodash");
class DB {
    constructor(client, dbName = '', serviceInfo) {
        this.client = client;
        this.db = client.db(dbName);
        this.serviceInfo = serviceInfo;
        _.forEach(this.serviceInfo, (service) => {
            this.initService(service, service.name);
        });
    }
    static create(serviceInfo, url) {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(url || process.env.DB_URL, {
                connectTimeoutMS: 3000000,
                socketTimeoutMS: 3000000,
                useNewUrlParser: true,
            }, (err, client) => {
                if (err) {
                    console.log(err);
                }
                const db = new DB(client, 'mindstrong', serviceInfo);
                console.log('Successfully connected to the db');
                resolve(db);
            });
        });
    }
    close() {
        return new Promise((resolve) => {
            this.client.close(true, () => resolve(null));
        });
    }
    initService(serviceInfo, collectionName) {
        serviceInfo.service.collection = this.db.collection(collectionName);
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map
import { Collection, Db, MongoClient } from 'mongodb';
import * as _ from 'lodash';
import { BaseService } from '../services/base.service';

type ServiceInfo = {
  name: string;
  service: BaseService;
}

export class DB {
  public static create(serviceInfo: ServiceInfo[], url?: string): Promise<DB> {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url || process.env.DB_URL, {
        connectTimeoutMS: 3000000,
        socketTimeoutMS: 3000000,
        useNewUrlParser: true,
      } as any, (err, client) => {
        if (err) {
          console.log(err);
        }
        const db = new DB(client, 'mindstrong', serviceInfo);
        console.log('Successfully connected to the db');
        resolve(db);
      });
    });
  }

  protected client: MongoClient;
  public db: Db;
  private readonly serviceInfo: ServiceInfo[];
  constructor(client: MongoClient, dbName = '', serviceInfo: ServiceInfo[]) {
    this.client = client;
    this.db = client.db(dbName);
   this.serviceInfo = serviceInfo;

    _.forEach(this.serviceInfo, (service) => {
        this.initService(service, service.name);
    });

  }
  public close() {
    return new Promise((resolve) => {
      this.client.close(true, () => resolve(null));
    });
  }
  private initService(serviceInfo: ServiceInfo, collectionName: string) {
    serviceInfo.service.collection = this.db.collection(collectionName);
  }

}

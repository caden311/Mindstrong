import { ObjectId } from "mongodb";
import { autoInjectable, singleton } from "tsyringe";
import { EHR } from "../../common/models/EHR";
import { BaseService } from "./base.service";
var ObjectID = require('mongodb').ObjectID;

@singleton()
export class EHRService extends BaseService {
    

    constructor() {
        super();
    }

    public async findAllRecords(): Promise<EHR[]> {
        return await this.collection.find<EHR>({}).toArray();
    }

    public async updateRecord(id: string, record: EHR) {
        // Given more time I would come up with a better way to verify model mapping.
        const newRecord: Partial<EHR> = {
            condition : {
                code: record?.condition?.code || '',
                description: record?.condition?.description || '',
            },
            doctorId: record?.doctorId,
            updatedAt: new Date()
         };
       return await this.collection.updateOne({_id: new ObjectID.createFromHexString(id)}, {$set: newRecord}, {upsert: true});
    }
  

    // public async createRecord(record: EHR) {
    //     const newRecord = {...{_id: new ObjectId(), createdAt: new Date()}, ...record }
    //    return await this.collection.insertOne(newRecord);
        
    // }
  

}
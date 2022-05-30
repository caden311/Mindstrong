import { ObjectId } from "mongodb";

export class BaseModel {

    _id: ObjectId;
    public createdAt: Date;
    public updatedAt: Date;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
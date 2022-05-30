import { Condition } from "../constants/conditions";
import { BaseModel } from "./base-model";

export class EHR extends BaseModel {

    public case: string;
    public condition: Condition;
    public doctorId: number;
    
    constructor(data: Partial<EHR>) {
        super(data);
    }
}
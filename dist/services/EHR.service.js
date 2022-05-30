"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHRService = void 0;
const tsyringe_1 = require("tsyringe");
const base_service_1 = require("./base.service");
var ObjectID = require('mongodb').ObjectID;
let EHRService = class EHRService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    findAllRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.find({}).toArray();
        });
    }
    updateRecord(id, record) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // Given more time I would come up with a better way to verify model mapping.
            const newRecord = {
                condition: {
                    code: ((_a = record === null || record === void 0 ? void 0 : record.condition) === null || _a === void 0 ? void 0 : _a.code) || '',
                    description: ((_b = record === null || record === void 0 ? void 0 : record.condition) === null || _b === void 0 ? void 0 : _b.description) || '',
                },
                doctorId: record === null || record === void 0 ? void 0 : record.doctorId,
                updatedAt: new Date()
            };
            return yield this.collection.updateOne({ _id: new ObjectID.createFromHexString(id) }, { $set: newRecord }, { upsert: true });
        });
    }
};
EHRService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], EHRService);
exports.EHRService = EHRService;
//# sourceMappingURL=EHR.service.js.map
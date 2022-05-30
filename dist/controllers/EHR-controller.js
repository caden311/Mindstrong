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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.EHRController = void 0;
const tsyringe_1 = require("tsyringe");
const EHR_1 = require("../models/EHR");
const EHR_service_1 = require("../services/EHR.service");
let EHRController = class EHRController {
    constructor(ehrService) {
        this.ehrService = ehrService;
    }
    setupRoutes(app) {
        app.get('/Ehr', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.ehrService.findAllRecords());
            // res.send(await this.ehrService.insertStuff());
        }));
        app.put('/Ehr/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!(req === null || req === void 0 ? void 0 : req.body)) {
                res.send('Invalid request body.').status(400);
            }
            const record = new EHR_1.EHR(req.body);
            res.send(yield this.ehrService.updateRecord(req.params.id, record));
        }));
        // app.post('/Ehr', async (req: express.Request, res: express.Response) => {
        //     const record: EHR = new EHR(req.body);
        //     res.send(await this.ehrService.createRecord(record));
        // });
    }
};
EHRController = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)((0, tsyringe_1.delay)(() => EHR_service_1.EHRService))),
    __metadata("design:paramtypes", [EHR_service_1.EHRService])
], EHRController);
exports.EHRController = EHRController;
//# sourceMappingURL=EHR-controller.js.map
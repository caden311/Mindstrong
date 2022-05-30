import * as express from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { EHR } from '../../common/models/EHR';
import { EHRService } from '../services/EHR.service';
import { BaseController } from './base-controller';

@singleton()
export class EHRController implements BaseController {

    private ehrService: EHRService;
    constructor(@inject(delay(() => EHRService)) ehrService: EHRService) {
        this.ehrService = ehrService;
    }

    public setupRoutes(app: express.Application): void {
        app.get('/Ehr', async (req: express.Request, res: express.Response) => {
            res.send(await this.ehrService.findAllRecords());
            // res.send(await this.ehrService.insertStuff());
        });


        app.put('/Ehr/:id', async (req: express.Request, res: express.Response) => {
            if (!req?.body) {
                res.send('Invalid request body.').status(400);
            }
            const record: EHR = new EHR(req.body);

            res.send(await this.ehrService.updateRecord(req.params.id, record));
        });


        // app.post('/Ehr', async (req: express.Request, res: express.Response) => {
        //     const record: EHR = new EHR(req.body);
        //     res.send(await this.ehrService.createRecord(record));
        // });
    }
}

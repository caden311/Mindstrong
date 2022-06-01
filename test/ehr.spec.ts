import 'jest';
import * as express from 'express';
import * as request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from './helpers/integration-helpers';
import { MindstrongServer } from '../src/server';
import { EHR } from '../common/models/EHR';

describe('status integration tests', () => {
    let server: MindstrongServer;
    let app: express.Application;
    beforeAll(async () => {
        console.log('before all');

        server = await IntegrationHelpers.getApp();
        app = server.app;
    });
    afterAll(async () => {
        server = await IntegrationHelpers.getApp();
        server.closeConnection();
    })
    it ('Should get EHR records RETURNS more than one records', async() => {
        await request(app)
        .get('/Ehr')
        .set('Accept', 'application/json')
        .expect(StatusCodes.OK)
        .then((res) => {
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('Integration Test POST / GET / PUT / GetById should successfully update records', async () => {

        // SETUP - create EHR

        const EHR = await request(app)
            .post(`/Ehr`)
            .set('Accept', 'application/json')
            .send({ doctorId: 111, case: 'test' })
            .expect(StatusCodes.OK);


        // Get created EHR by ID
        await request(app)
            .get(`/Ehr/${EHR.body.insertedId}`)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK)
            .then((res) => {
                expect(res.body.doctorId).toBe(111);
                expect(res.body.case).toBe('test');
            })

        // UPDATE doctor ID
        await request(app)
            .put(`/Ehr/${EHR.body.insertedId}`)
            .set('Accept', 'application/json')
            .send({ doctorId: 999 })
            .expect(StatusCodes.OK);

        // Get created/updated EHR by ID
        await request(app)
        .get(`/Ehr/${EHR.body.insertedId}`)
        .set('Accept', 'application/json')
        .expect(StatusCodes.OK)
        .then((res) => {
            expect(res.body.doctorId).toBe(999);
        })

        // Delete created EHR for test
        await request(app)
            .delete(`/Ehr/${EHR.body.insertedId}`)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);
    });

    it ('Should fail with NOT_FOUND on invalid route',  async () => {
        await request(app)
        .get('/invalidRoute')
        .set('Accept', 'application/json')
        .expect(StatusCodes.NOT_FOUND)
    });

});
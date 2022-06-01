import * as express from 'express';
import { MindstrongServer } from '../../src/server';
export default class IntegrationHelpers {
    public static appInstance: MindstrongServer;
    public static async getApp(): Promise<MindstrongServer> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const app: MindstrongServer = new MindstrongServer();
        
        await app.init(3005);
        this.appInstance = app;
        return this.appInstance;
    }
}
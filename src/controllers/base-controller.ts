import * as express from 'express';

export abstract class BaseController {

    public abstract setupRoutes(app: express.Application): void;

}
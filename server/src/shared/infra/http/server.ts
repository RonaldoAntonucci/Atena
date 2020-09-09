import express, { Express, Router } from 'express';

interface IHttpServerOpts {
  routes?: Router | Router[];
}

interface IStartOptions {
  port: number;
}

export default class HttpServer {
  private server: Express;

  constructor({ routes = [] }: IHttpServerOpts) {
    this.server = express();

    this.server.use(routes);
  }

  public start({ port }: IStartOptions): Express {
    this.server.listen(port);

    return this.server;
  }
}

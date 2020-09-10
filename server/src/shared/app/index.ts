import './bootstrap';

import { Express, Router } from 'express';
import { errors } from 'celebrate';

import Server from 'shared/infra/http/server';
import Routes from 'shared/infra/http/routes/index.routes';

import Database from 'shared/infra/typeorm';
import ErrorHandler from '../errors/Handler';

interface IStartOpts {
  routes?: Router | [Router];
}

export default class App {
  private server: Server;

  protected database: Database;

  public async start(
    { routes = Routes }: IStartOpts = { routes: Routes },
  ): Promise<void> {
    this.database = new Database();

    await this.database.start();
    this.server = new Server({
      routes,
      handlers: [errors(), ErrorHandler],
      jsonApi: true,
    });
  }

  public async stop(): Promise<void> {
    await this.database.stop();
  }

  public listen(port: number): void {
    this.server.start({ port });

    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}!`);
  }

  public http(): Express {
    return this.server.getServer();
  }
}

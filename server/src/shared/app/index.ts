import './bootstrap';

import { Express } from 'express';

import Server from 'shared/infra/http/server';

import Routes from 'shared/infra/http/routes/index.routes';

import Database from 'shared/infra/typeorm';

export default class App {
  private server: Server;

  private database: Database;

  public async start(): Promise<void> {
    this.database = new Database();

    await this.database.start();
    this.server = new Server({ routes: Routes });
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
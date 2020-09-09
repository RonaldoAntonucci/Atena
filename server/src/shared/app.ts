import Server from './infra/http/server';

import Routes from './infra/http/routes/index.routes';

export default class App {
  private server: Server;

  public async start(): Promise<void> {
    // this.databaseCon = new Database();
    // await this.databaseCon.start();

    this.server = new Server({ routes: Routes });

    // console.log('Server started on port 3333!');
  }

  public listen(port: number): void {
    this.server.start({ port });

    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}!`);
  }
}

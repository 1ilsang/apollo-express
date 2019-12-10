import express, { Application } from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import schema from './schema';

import { requestLoggerMiddleware } from './middleware/request.logger.middleware';
import { TestRoute } from './routes';

export class App {
  private app: Application;
  private apolloServer: ApolloServer;

  constructor(private port?: number | string) {
    this.app = express();
    this.apolloServer = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)]
    });
    this.settings();
    this.middleware();
    this.routes();
  }

  public async listen() {
    this.app.listen(
      { port: this.app.get('port') },
      (): void => console.log(`\n🚀  GraphQL is now running on http://localhost:3000/graphql`)
    );
  }

  public getApp(): Application {
    return this.app;
  }

  private settings() {
    if (process.env.NODE_ENV !== 'test') this.app.set('port', process.env.PORT || this.port || 3000);
    this.apolloServer.applyMiddleware({ app: this.app, path: '/graphql' });
  }

  private middleware() {
    this.app.use('*', cors());
    this.app.use(compression());
    this.app.use(bodyparser.json());
    this.app.use(requestLoggerMiddleware);
  }

  private routes() {
    this.app.use('/test', TestRoute);
  }
}
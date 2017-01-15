import models from '/models';
import schemas from '/schemas';

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /

import Domainer from 'domainer';
import { Mongo } from 'domainer/connectors';

const connector = new Mongo({ uri: 'XXX:YY' });
const domain = new Domainer({ models, connector });

export {
  ...domain.models,
};

export default domain.models;

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /

import { Manager, GraphQLSchemas } from 'domainer/middlewares';
import { GraphQLServer } from 'domainer/adapters';

const basic = new Domainer({ models });
basic.use(new Manager({
  connector,
  field: 'objects', // optional
}));
basic.use(new GraphQLSchemas({ schemas }));

const server = new GraphQLServer({
  domain: basic,
  graphiql: true,
  listen: 3000,
}));

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /

import { GraphQLExpress as App } from 'domainer/kits';

const app = new App({
  domain,
  graphiql: true,
  listen: 3000,
});

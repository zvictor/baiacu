import Domainer from 'baiacu';
import Manager from 'baiacu-managers-mongodb';
import { IdentityTransmutter } from 'baiacu/middleware';
import * as models from './models';
import connection from './storage';

module.exports = new Domainer(models)
  .use(new IdentityTransmutter())
  .use({
    get(source, property, response) {
      if (property !== 'collection')
        return response;

      return source.name.toLowerCase();
    }
  })
  .use(new Manager({ connection }))
  .export;

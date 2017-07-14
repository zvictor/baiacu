import Domainer from 'baiacu';
import { IdentityTransmutter } from '../internals/middleware';
import Connector from './manager';

const Manager = new Domainer(Connector)
  .use(new IdentityTransmutter())
  .export;

export default Manager;

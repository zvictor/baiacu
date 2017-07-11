import test from 'ava';
import Domainer, { Model } from '../internals';
import { SealerTransmutter } from '../internals/middleware';

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';
const E = 'E';

test('models can be changed without the SealerTransmutter', t => {
  class Whatever {}

  const { models } = new Domainer({
    models: {
      Whatever,
    },
  });

  const individual = new models.Whatever();

  Whatever.A = A;
  Whatever.prototype.B = B;
  models.Whatever.C = C;
  models.Whatever.prototype.D = D;
  individual.E = E;

  t.is(Whatever.A, A);
  t.is(Whatever.prototype.B, B);
  t.is(models.Whatever.C, C);
  t.is(models.Whatever.prototype.D, D);
  t.is(individual.E, E);
});

test('classes cannot be changed with the SealerTransmutter', t => {
  class Whatever {}

  class Middleware {
    class(source, response) {
      // console.log('booooa!!');
      // console.log({source});
      source.A = A;
      // source.prototype.B = B;

      return response;
    }
  }

  const { models } = new Domainer({
    models: {
      Whatever,
    },
  })
  .use(new SealerTransmutter())
  // .use(new Middleware());

  const individual = new models.Whatever();

  t.throws(() => {
    Whatever.A = A;
  });
  t.throws(() => {
    Whatever.prototype.B = B;
  });
  t.throws(() => {
    models.Whatever.C = C;
  });
  t.throws(() => {
    models.Whatever.prototype.D = D;
  });


  t.not(Whatever.A, A);
  // t.not(Whatever.prototype.B, B);
  // t.not(models.Whatever.C, C);
  // t.not(models.Whatever.prototype.D, D);
  // t.not(individual.E, E);
});

// test('merda cannot be changed with the SealerTransmutter', t => {
//   class Middleware {
//     class(source, property, response) {
//       source.A = A;
//       source.prototype.B = B;
//
//       return response;
//     }
//   }
//
//   const { models } = domainer()
//     .use(new SealerTransmutter())
//     .use(new Middleware());
//
//   const individual = new models.Whatever({
//     firstName: 'George',
//     lastName: 'Orwell',
//   });
//   console.log(Object.isFrozen(Whatever.prototype));
//
//   // t.throws(() => {
//   //   Whatever.A = A;
//   //   console.log(':::::>', Whatever.A);
//   // });
//   // t.throws(() => {
//   //   Whatever.B = B;
//   // });
//   models.Whatever.C = C;
//   models.Whatever.prototype.D = D;
//   individual.E = E;
//
//   t.is(models.Whatever.C, C);
//   t.is(models.Whatever.prototype.D, D);
//   t.is(individual.E, E);
// });

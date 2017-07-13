import test from 'ava';
import Domainer from '../internals';
import { IdentityTransmutter, SealerTransmutter } from '../internals/middleware';

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';
const E = 'E';

test('models can be changed without the SealerTransmutter', t => {
  class Input {}

  const Output = new Domainer(Input)
    .use(new IdentityTransmutter())
    .export;

  const individual = new Output();

  Input.A = A;
  Input.prototype.B = B;
  Output.C = C;
  Output.prototype.D = D;
  individual.E = E;

  t.is(Input.A, A);
  t.is(Input.prototype.B, B);
  t.is(Output.C, C);
  t.is(Output.prototype.D, D);
  t.is(individual.E, E);
});

test('plain classes cannot be changed with the SealerTransmutter', t => {
  class Input {}

  class Middleware {
    class(source, response) {
      source.A = A;

      return response;
    }
  }

  const Output = new Domainer(Input)
    .use(new IdentityTransmutter())
    .use(new SealerTransmutter())
    .export;

  const individual = new Output();

  t.is(Object.isFrozen(Input), true)

  t.throws(() => {
    Input.A = A;
  });
  t.throws(() => {
    Input.prototype.B = B;
  });
  t.throws(() => {
    Output.C = C;
  });
  t.throws(() => {
    Output.prototype.D = D;
  });


  t.not(Input.A, A);
  // t.not(Input.prototype.B, B);
  // t.not(Output.C, C);
  // t.not(Output.prototype.D, D);
  // t.not(individual.E, E);
});

test('domain classes cannot be changed with the SealerTransmutter', t => {
  class Input {}

  class Middleware {
    class(source, response) {
      source.A = A;

      return response;
    }
  }

  const { Input: Output } = new Domainer({
    Input,
  })
    .use(new IdentityTransmutter())
    .use(new SealerTransmutter())
    .export;

  const individual = new Output();

  t.throws(() => {
    Input.A = A;
  });
  t.throws(() => {
    Input.prototype.B = B;
  });
  t.throws(() => {
    Output.C = C;
  });
  t.throws(() => {
    Output.prototype.D = D;
  });


  t.not(Input.A, A);
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

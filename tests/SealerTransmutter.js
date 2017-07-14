import test from 'ava';
import Domainer from '../internals';
import { IdentityTransmutter, SealerTransmutter } from '../internals/middleware';

const A = 'A';
const B = 'B';
const C = 'C';

test('models can be changed without the SealerTransmutter', t => {
  class Input {}

  const Output = new Domainer(Input)
    .use(new IdentityTransmutter())
    .export;

  const instance = new Output();

  Input.A = A;
  Output.B = B;
  instance.C = C;

  t.is(Input.A, A);
  t.is(Output.B, B);
  t.is(instance.C, C);
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

  const instance = new Output();

  Input.A = A;

  t.throws(() => {
    Output.B = B;
  });

  t.throws(() => {
    instance.C = C;
  });

  t.is(Input.A, A);
  t.is(Output.A, A);
  t.not(Output.B, B);
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

  const instance = new Output();

  Input.A = A;

  t.throws(() => {
    Output.B = B;
  });

  t.throws(() => {
    instance.C = C;
  });

  t.is(Input.A, A);
  t.is(Output.A, A);
  t.not(Output.B, B);
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
//   const instance = new models.Whatever({
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
//   instance.E = E;
//
//   t.is(models.Whatever.C, C);
//   t.is(models.Whatever.prototype.D, D);
//   t.is(instance.E, E);
// });

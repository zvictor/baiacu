const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// const root = { hello: () => 'Hello world!' };
class root {
  hello() {
    return 'Hello world 2!'
  }
}


async function main() {
  const response = await graphql(schema, '{ hello }', root);

  console.log(response);
}

main();

const models = new Domainer({
  Person,
  Author,
})
.traverse(input => Object.values(input))
.use(input => new IdentityTransmutter(input))
.export;


const models = new Domainer({ Person, Author }, Object.values)
.traverse(input => Object.values(input))
.use(input => new IdentityTransmutter(input))
.export;


tem que retirar a idea de types e colocar proxies globais, ja que agora nao o tratamento de models/domains se tornou explicito.


.use({
  set(source) {
    return source.name.toLowerCase();
  }
}, 'collection')

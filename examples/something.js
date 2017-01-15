import { Model } from 'domainer';
// import { allow } from 'domainer/authorization';
import { Authorization } from 'domainer/middlewares';
import { Mongo } from 'domainer/connectors';

@Mongo.set({ collection: 'authors' })
class Author extends Model {
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Mongo.set(Author, { collection: 'authors' })
// Mongo.setCollection(Author, 'authors');

Authorization.allow(Post, {
  read(context) { // Post's CRUD permissions could be changed
    return this.author._id === context.userId || !this.private;
  },
}, {
  views: { // `view` field permissions.
           // Only `read` and `update` are available for fields.
    read(context) {
      return this.author._id === context.userId;
    },
    update(context) {
      return false;
    }
  }
});

const orwell = new Author({
  firstName: 'George',
  lastName: 'Orwell',
}, {
  userId: 1,
});

> @context({ userId: 1})
> orwell.name
George Orwell

////

class SchemasMiddleware extends Middleware {
  resolve(next, root, args, context, info) {
    /// TODO! ....
    return next(root, args, context, info);
  }
}

class AuthorizationMiddleware extends Middleware {
  resolve(next, root, args, context, info) {
    if (info.field_name == 'user') {
      return null;
    }

    return next(root, args, context, info);
  }
}

class ManagerMiddleware extends Middleware {
  // @see http://docs.graphene-python.org/en/latest/execution/middleware/
  resolve(next, root, args, context, info) {
    const Constructor = root.constructor;
    const attr = this.options.attr || 'objects';

    if (this.isPristine(Constructor)) {
      Constructor[attr] = this.options.connector(Constructor);
      this.touch(Constructor);
    }

    return next(root, args, context, info);
  }
}

app.use(AuthorizationMiddleware.setup);
app.use(ManagerMiddleware.setup({
  connector: new Mongo(),
}));

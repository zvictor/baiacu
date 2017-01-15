export default class Middleware {
  constructor(options) {
    this.touched = {};
    this.options = options;
  }

  touch(root) {
    this.touched[root] = true;
  }

  isPristine(root) {
    return !!this.touched[root];
  }
};

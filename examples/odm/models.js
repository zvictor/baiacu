export class Person {
  constructor({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static get species() {
    return 'Homo sapiens sapiens';
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class Author extends Person {
  get name() {
    return `${this.lastName}, ${this.firstName}`;
  }
}

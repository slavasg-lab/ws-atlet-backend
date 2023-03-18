interface Event {
  name: string;
}

export class CustomError extends Error {
  constructor(public event: Event, public description: string) {
    super();

    // 👇 because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

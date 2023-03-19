import { ZodError, ZodIssue } from "zod";

interface Event {
  name: string;
}

export class RejectionEvent extends Error {
  constructor(public description: string) {
    super();

    // 👇 because we are extending a built-in class
    Object.setPrototypeOf(this, RejectionEvent.prototype);
  }
}

export class InvalidMessageError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, RejectionEvent.prototype);
  }
}

export class InvalidEventDataError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, RejectionEvent.prototype);
  }
}

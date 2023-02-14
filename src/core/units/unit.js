import { INCHES_TO_PIXELS } from "@/core/svg/constants";

export const UNIT_FEET = 0;
export const UNIT_INCHES = 1;
export const UNIT_METERS = 2;
export const UNIT_PIXELS = 3;

const FEET_TO_INCHES = 12;

const METERS_TO_INCHES = 2.54 / 100;
export class Unit {
  get amount() {
    return this._value;
  }

  set amount(value) {
    if (value.unit === UNIT_INCHES) {
      this._value = value._value * METERS_TO_INCHES;
    } else if (value.unit === UNIT_FEET) {
      this._value = value.in(UNIT_INCHES) * METERS_TO_INCHES;
    } else {
      this._value = value;
    }
  }
  /**
   * Default unit should be meters
   */
  constructor(value) {
    this.amount = value;
    this.unit = UNIT_METERS;
  }

  valueOf() {
    return this._value;
  }

  toString() {
    return this._value;
  }
  get unitName() {
    switch (this.unit) {
      case UNIT_INCHES:
        return "in";
      case UNIT_FEET:
        return "ft";
      default:
        return "m";
    }
  }

  in(unit) {
    switch (unit) {
      case UNIT_INCHES:
        return this.convertToInches();
      case UNIT_FEET:
        return this.convertToFeet();
      case UNIT_PIXELS:
        return this.convertToPixels();
      default:
        return this.convertToMeters();
    }
  }
  convertToPixels() {
    if (this.unit === UNIT_INCHES) {
      return this.amount * INCHES_TO_PIXELS;
    } else if (this.unit === UNIT_FEET) {
      return this.amount * FEET_TO_INCHES * INCHES_TO_PIXELS;
    }
    return (this.amount / METERS_TO_INCHES) * INCHES_TO_PIXELS;
  }
  convertToInches() {
    if (this.unit === UNIT_INCHES) {
      return this.amount;
    } else if (this.unit === UNIT_FEET) {
      return this.amount * FEET_TO_INCHES;
    }

    return this.amount / METERS_TO_INCHES;
  }

  convertToFeet() {
    if (this.unit === UNIT_INCHES) {
      return this.amount / FEET_TO_INCHES;
    } else if (this.unit === UNIT_FEET) {
      return this.amount;
    }

    return this.convertToInches() * METERS_TO_INCHES;
  }

  convertToMeters() {
    if (this.unit === UNIT_INCHES) {
      return Math.round(this.amount * METERS_TO_INCHES * 1000)/1000;
    } else if (this.unit === UNIT_FEET) {
      return Math.round(this.convertToInches() * METERS_TO_INCHES * 1000) / 1000;
    }

    return this.amount;
  }
}

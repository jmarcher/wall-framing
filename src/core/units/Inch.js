import { Unit, UNIT_INCHES } from "@/core/units/unit";
export class Inch extends Unit {
  constructor(value) {
    super(value);
    this.unit = UNIT_INCHES;
  }
}

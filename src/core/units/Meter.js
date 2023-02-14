import { Unit, UNIT_METERS } from "@/core/units/unit";

export class Meter extends Unit {
  constructor(value) {
    super(value);
    this.unit = UNIT_METERS;
  }
}

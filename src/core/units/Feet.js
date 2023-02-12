import { Inch } from "@/core/units/Inch";
import { UNIT_FEET } from "@/core/units/unit";

export class Feet extends Inch {
  constructor(value) {
    super(value);
    this.unit = UNIT_FEET;
  }
}

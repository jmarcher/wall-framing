<template>
  <img
    v-if="showWallPreview"
    :src="wallPreview"
    alt="Wall preview"
    class="wall-preview"
  />
  <div class="row">
    <div class="col">
      <form>
        <h5>Area <span class="badge bg-secondary" v-html="area"></span></h5>
        <div class="mb-3">
          <label for="wall-width" class="form-label"
            >Width ({{ width.unitName }})</label
          >
          <input
            min="1"
            class="form-control"
            type="number"
            name="wall-width"
            v-model="width.amount"
          />
        </div>
        <div class="mb-3">
          <label for="wall-height" class="form-label"
            >Height ({{ height.unitName }})</label
          >
          <input
            readonly="readonly"
            class="form-control"
            type="number"
            name="wall-height"
            v-model="height.amount"
          />
        </div>
        <div class="mb-3">
          <label for="stud-spacing" class="form-label"
            >Stud spacing ({{ studSpacing.unitName }})</label
          >
          <input
            class="form-control"
            min="1"
            type="number"
            name="stud-spacing"
            v-model="studSpacing.amount"
          />
        </div>
        <div class="mb-3">
          <div class="form-check">
            <label for="double-top-plate" class="form-check-label"
              >Double top plate</label
            >
            <input
              class="form-check-input"
              type="checkbox"
              name="double-top-plate"
              v-model="doubleTopPlate"
            />
          </div>
        </div>
        <div class="mb-3">
          <select class="form-select" aria-label="Wall ends" v-model="wallEnd">
            <option
              v-for="end in wallEnds"
              :value="end.id"
              v-text="end.name"
              :key="end.id"
            ></option>
          </select>
        </div>
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Stud length"
            v-model="studLength"
          >
            <option selected>Stud length</option>
            <option
              v-for="board in boardSizes"
              :value="board.length"
              v-text="board.name"
              :key="board"
            ></option>
          </select>
        </div>

        <div class="mb-3">
          <div class="form-check">
            <label for="fire-blocks" class="form-check-label"
              >Does your framing require Fire blocks?</label
            >
            <input
              class="form-check-input"
              type="checkbox"
              name="fire-blocks"
              v-model="fireBlocks"
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <label for="show-wall-preview" class="form-check-label"
              >Show wall preview?</label
            >
            <input
              class="form-check-input"
              type="checkbox"
              name="show-wall-preview"
              v-model="showWallPreview"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="col">
      <div class="row">
        <div class="col">Vertical studs:</div>
        <div class="col" v-text="countVerticalStuds"></div>
      </div>
      <div class="row" v-if="fireBlocks">
        <div class="col">Studs required for fire blocks:</div>
        <div class="col" v-text="countFireBlockStuds"></div>
      </div>
      <div class="row">
        <div class="col">Horizontal studs (Sole plate):</div>
        <div class="col" v-text="countHorizontalStudsSolePlate"></div>
      </div>
      <div class="row">
        <div class="col">
          Horizontal studs ({{ this.doubleTopPlate ? "Double " : "" }}Top
          plate):
        </div>
        <div class="col" v-text="countHorizontalStudsTopPlate"></div>
      </div>

      <div class="row">
        <div class="col">
          <strong>Total studs:</strong>
        </div>
        <div class="col" v-text="countTotalStuds"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Inch } from "@/core/units/Inch";
import { Feet } from "@/core/units/Feet";
import { UNIT_INCHES, UNIT_PIXELS } from "@/core/units/unit";
import { SVG_GRADIENTS } from "@/core/svg/colors";
import { Board, DEFAULT_BOARD_LENGTH, DEFAULT_BOARDS } from "@/core/wood/board";
import SVGBoard from "@/core/svg/board";

const WALL_END_U_SHAPE = 1;
const WALL_END_L_SHAPE = 2;
const WALL_END_TRIPLE = 3;
export default {
  name: "WallFraming",
  data() {
    return {
      showWallPreview: true,
      defaultBoard: new Board(),
      unit: new Feet(0).unit,
      width: new Feet(20),
      height: new Feet(8),
      studSpacing: new Inch(16),
      studLength: DEFAULT_BOARD_LENGTH,
      doubleTopPlate: true,
      fireBlocks: true,
      wallEnd: WALL_END_U_SHAPE,
    };
  },
  methods: {
    inch(value) {
      return new Inch(value);
    },
  },
  computed: {
    wallEnds() {
      return [
        {
          id: WALL_END_U_SHAPE,
          name: "U Shape",
        },
        {
          id: WALL_END_L_SHAPE,
          name: "L Shape",
        },
        {
          id: WALL_END_TRIPLE,
          name: "Triple",
        },
      ];
    },
    countTotalStuds() {
      return (
        this.countVerticalStuds +
        this.countFireBlockStuds +
        this.countHorizontalStudsTopPlate +
        this.countHorizontalStudsSolePlate
      );
    },
    boardSizes() {
      return DEFAULT_BOARDS;
    },
    drawVerticalStuds() {
      let result = "";
      let verticalStudY = new Inch(this.doubleTopPlate ? 4 : 2).in(UNIT_PIXELS);
      let verticalStudStartX = new Inch(
        this.defaultBoard.width.in(UNIT_INCHES) * 3 +
          this.studSpacing.in(UNIT_INCHES) -
          2
      ).in(UNIT_PIXELS);

      // Draw left wall end
      result = `${result}${SVGBoard.vertical(0, verticalStudY, this.studLength)}`;
      // Draw right wall end
      result = `${result}${SVGBoard.vertical(
        this.width.in(UNIT_PIXELS) - this.defaultBoard.width.in(UNIT_PIXELS),
        verticalStudY,
          this.studLength
      )}`;
      switch (this.wallEnd) {
        case WALL_END_U_SHAPE: // The visual shape from the front is the same
        case WALL_END_L_SHAPE:
          // Left wall end
          result = `${result}${SVGBoard.vertical(
            this.defaultBoard.width.in(UNIT_PIXELS),
            verticalStudY,
            this.studLength,
            this.defaultBoard.depth
          )}`;

          // Right wall end
          result = `${result}${SVGBoard.vertical(
            this.width.in(UNIT_PIXELS) -
              this.defaultBoard.depth.in(UNIT_PIXELS) -
              this.defaultBoard.width.in(UNIT_PIXELS),
            verticalStudY,
            this.studLength,
            this.defaultBoard.depth
          )}`;
          break;
        case WALL_END_TRIPLE:
          // Left wall end
          result = `${result}${SVGBoard.vertical(
            this.defaultBoard.width.in(UNIT_PIXELS),
            verticalStudY, this.studLength
          )}`;
          result = `${result}${SVGBoard.vertical(
            this.defaultBoard.width.in(UNIT_PIXELS) * 2,
            verticalStudY, this.studLength
          )}`;

          // Right wall end
          result = `${result}${SVGBoard.vertical(
            this.width.in(UNIT_PIXELS) -
              this.defaultBoard.width.in(UNIT_PIXELS) * 2,
            verticalStudY, this.studLength
          )}`;
          result = `${result}${SVGBoard.vertical(
            this.width.in(UNIT_PIXELS) -
              this.defaultBoard.width.in(UNIT_PIXELS) * 3,
            verticalStudY, this.studLength
          )}`;
          break;
      }
      for (let i = 0; i < this.countVerticalStuds; i++) {
        result = `${result}${SVGBoard.vertical(
          verticalStudStartX + i * this.studSpacing.in(UNIT_PIXELS),
          verticalStudY, this.studLength
        )}`;
      }
      return result;
    },
    drawTopPlate() {
      let result = "";
      for (let i = 0; i < this.countHorizontalStudsSolePlate - 1; i++) {
        result = `${result}${SVGBoard.horizontal(
          i * this.studLength.in(UNIT_PIXELS),
          0, this.studLength
        )}${
          this.doubleTopPlate
            ? SVGBoard.horizontal(
                i * this.studLength.in(UNIT_PIXELS),
                new Inch(2).in(UNIT_PIXELS), this.studLength
              )
            : ""
        }`;
      }
      let lastStudLength =
        this.width.in(UNIT_INCHES) -
        this.studLength.in(UNIT_INCHES) *
          (this.countHorizontalStudsSolePlate - 1);
      result = `${result}${SVGBoard.horizontal(
        (this.countHorizontalStudsSolePlate - 1) *
          this.studLength.in(UNIT_PIXELS),
        0,
        new Inch(lastStudLength)
      )}
      ${
        this.doubleTopPlate
          ? SVGBoard.horizontal(
              (this.countHorizontalStudsSolePlate - 1) *
                this.studLength.in(UNIT_PIXELS),
              new Inch(2).in(UNIT_PIXELS), this.studLength
            )
          : ""
      }`;
      return result;
    },
    drawSolePlate() {
      let result = "";
      for (let i = 0; i < this.countHorizontalStudsSolePlate - 1; i++) {
        result = `${result}${SVGBoard.horizontal(
          i * this.studLength.in(UNIT_PIXELS),
          this.solePlateYPosition, this.studLength
        )}`;
      }
      let lastStudLength =
        this.width.in(UNIT_INCHES) -
        this.studLength.in(UNIT_INCHES) *
          (this.countHorizontalStudsSolePlate - 1);
      result = `${result}${SVGBoard.horizontal(
        (this.countHorizontalStudsSolePlate - 1) *
          this.studLength.in(UNIT_PIXELS),
        this.solePlateYPosition,
        new Inch(lastStudLength)
      )}`;
      return result;
    },
    solePlateYPosition() {
      return (
        this.studLength.in(UNIT_PIXELS) +
        (this.doubleTopPlate
          ? new Inch(4).in(UNIT_PIXELS)
          : new Inch(2).in(UNIT_PIXELS))
      );
    },
    wallSVG() {
      return `<svg width="${this.width.in(UNIT_PIXELS)}" height="${
        this.studLength.in(UNIT_PIXELS) +
        (this.doubleTopPlate
          ? new Inch(4).in(UNIT_PIXELS)
          : new Inch(2).in(UNIT_PIXELS)) +
        new Inch(2).in(UNIT_PIXELS)
      }" xmlns="http://www.w3.org/2000/svg">
 <g>
  <title>Wall</title>
  ${SVG_GRADIENTS}
  ${this.drawTopPlate}
  ${this.drawVerticalStuds}
  ${this.drawSolePlate}
 </g>
</svg>`;
    },
    wallPreview() {
      return `data:image/svg+xml,${encodeURIComponent(this.wallSVG)}`;
    },
    area() {
      return `${this.width * this.height} ${this.width.unitName}<sup>2</sup>`;
    },
    countVerticalStuds() {
      // TODO: Missing wall ends in the count
      return Math.floor(
        this.width.in(UNIT_INCHES) / this.studSpacing.in(UNIT_INCHES)
      );
    },
    countHorizontalStudsSolePlate() {
      return Math.ceil(
        this.width.in(UNIT_INCHES) / this.studLength.in(UNIT_INCHES)
      );
    },
    countHorizontalStudsTopPlate() {
      if (this.doubleTopPlate) {
        return this.countHorizontalStudsSolePlate * 2;
      }

      return this.countHorizontalStudsSolePlate;
    },
    fireBlockLength() {
      // Studs are separated from the center, there is a 1-inch offset for the
      // fire blocks therefore we need to subtract 2 inches from the spacing
      // to ge the length.
      return this.studSpacing.in(UNIT_INCHES) - 2;
    },
    countFireBlockStuds() {
      return Math.ceil(
        (this.width.in(UNIT_INCHES) - this.countVerticalStuds * 2) /
          this.studLength.in(UNIT_INCHES)
      );
    },
  },
};
</script>

<style scoped>
.wall-preview {
  max-height: 1024px;
  max-width: 1024px;
}
</style>

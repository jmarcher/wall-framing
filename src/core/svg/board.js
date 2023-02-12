import { DEFAULT_BOARD_LENGTH } from "@/core/wood/board";
import { UNIT_PIXELS } from "@/core/units/unit";
import { Inch } from "@/core/units/Inch";

export default {
  /**
   * Draws an SVG vertical board
   * @param {number} x
   * @param {number} y
   * @param {Inch} length
   * @param width
   * @param fillBoard
   * @returns {string}
   */
  vertical(x, y, length = DEFAULT_BOARD_LENGTH, width = new Inch(2), fillBoard =  true) {
    return `<rect id="svg_1" height="${length.in(
      UNIT_PIXELS
    )}" width="${width.in(
      UNIT_PIXELS
    )}" y="${y}" x="${x}" stroke="#000" ${fillBoard ?  'fill="url(#vericalWood)"': 'fill="rgba(0,0,0,0)"'}/>`;
  },
  /**
   * Draws an SVG horizontal board
   * @param {number} x
   * @param {number} y
   * @param {Inch} length
   * @param {Inch} width
   * @param fillBoard
   * @returns {string}
   */
  horizontal(x, y, length = DEFAULT_BOARD_LENGTH, width = new Inch(2), fillBoard = true) {
    return `<rect id="svg_1" height="${width.in(
      UNIT_PIXELS
    )}" width="${length.in(
      UNIT_PIXELS
    )}" y="${y}" x="${x}" stroke="#000" ${fillBoard ?  'fill="url(#horizontalWood)"': 'fill="rgba(0,0,0,0)"'}/>`;
  },
};

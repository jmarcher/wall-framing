import { Inch } from "@/core/units/Inch";
export const DEFAULT_BOARD_LENGTH = new Inch(92 + 5 / 8);
export const BOARD_104_58_LENGTH = new Inch(104 + 5 / 8);
export const BOARD_96_LENGTH = new Inch(96);

export const BOARD_SIZES = [
  Object.assign(DEFAULT_BOARD_LENGTH, { name: '92 5/8"' }),
  Object.assign(BOARD_104_58_LENGTH, { name: '104 5/8"' }),
  Object.assign(BOARD_96_LENGTH, { name: '96"' }),
];
export class Board {
  constructor(
    length = DEFAULT_BOARD_LENGTH,
    width = new Inch(2),
    depth = new Inch(4),
    name = ""
  ) {
    this._length = length;
    this._width = width;
    this._depth = depth;
    this._name = name;
  }

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get depth() {
    return this._depth;
  }

  set depth(value) {
    this._depth = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

export const DEFAULT_BOARDS = [
  new Board(DEFAULT_BOARD_LENGTH, new Inch(2), new Inch(4), '92 5/8"'),
  new Board(BOARD_104_58_LENGTH, new Inch(2), new Inch(4), '104 5/8"'),
  new Board(BOARD_96_LENGTH, new Inch(2), new Inch(4), '96"'),
];

import { SplendidPlayer } from "../domain";
import { sortPlayers, validateMax } from "./util";

describe("validateMax()", () => {
  it("should not error when only 1 colour selected", () => {
    const values = {
      red: 1,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(true);
  });

  it("should not error when only 2 colours selected", () => {
    const values = {
      red: 1,
      green: 0,
      blue: 0,
      black: 1,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(true);
  });

  it("should not error when only 3 colours selected", () => {
    const values = {
      red: 1,
      green: 1,
      blue: 1,
      black: 0,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(true);
  });

  it("should not error when 2 of the same colour have been selected", () => {
    const values = {
      red: 2,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(true);
  });

  it("should error when 3 of the same colour have been selected", () => {
    const values = {
      red: 3,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(false);
  });

  it("should error when 2 of the same colour and more have been selected", () => {
    const values = {
      red: 2,
      green: 1,
      blue: 0,
      black: 0,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(false);
  });

  it("should not error when 3 different colours have been selected", () => {
    const values = {
      red: 1,
      green: 1,
      blue: 1,
      black: 0,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(true);
  });

  it("should error when 4 different colours have been selected", () => {
    const values = {
      red: 1,
      green: 1,
      blue: 1,
      black: 1,
      white: 0,
      yellow: 0,
    };
    expect(validateMax(values)).toEqual(false);
  });
});

describe("sortPlayers()", () => {
  const players = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ] as SplendidPlayer[];

  const testCases = [
    {
      clientId: 1,
      expected: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 1 }],
    },
    {
      clientId: 2,
      expected: [{ id: 3 }, { id: 4 }, { id: 1 }, { id: 2 }],
    },
    {
      clientId: 3,
      expected: [{ id: 4 }, { id: 1 }, { id: 2 }, { id: 3 }],
    },
    {
      clientId: 4,
      expected: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    },
  ];

  it.each(testCases)(
    "it should put player at bottom and rotate the rest",
    ({ clientId, expected }) => {
      const result = sortPlayers(players, clientId);
      expect(result).toEqual(expected);
    }
  );
});

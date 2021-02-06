import { validateMax } from "./helpers";

describe("validateMax()", () => {
  it("should not error when only 1 colour selected", () => {
    const values = {
      red: 1,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
    };
    expect(validateMax(values)).toEqual({});
  });

  it("should not error when only 3 colours selected", () => {
    const values = {
      red: 1,
      green: 1,
      blue: 1,
      black: 0,
      white: 0,
    };
    expect(validateMax(values)).toEqual({});
  });

  it("should not error when 2 of the same colour have been selected", () => {
    const values = {
      red: 2,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
    };
    expect(validateMax(values)).toEqual({});
  });

  it("should error when 3 of the same colour have been selected", () => {
    const values = {
      red: 3,
      green: 0,
      blue: 0,
      black: 0,
      white: 0,
    };
    expect(validateMax(values)).toMatchObject({
      red: "max",
      green: "max",
      blue: "max",
      black: "max",
      white: "max",
    });
  });

  it("should error when 2 of the same colour and more have been selected", () => {
    const values = {
      red: 2,
      green: 1,
      blue: 0,
      black: 0,
      white: 0,
    };
    expect(validateMax(values)).toMatchObject({
      red: "max",
      green: "max",
      blue: "max",
      black: "max",
      white: "max",
    });
  });

  it("should not error when 3 different colours have been selected", () => {
    const values = {
      red: 1,
      green: 1,
      blue: 1,
      black: 0,
      white: 0,
    };
    expect(validateMax(values)).toEqual({});
  });

  it("should error when 4 different colours have been selected", () => {
    const values = {
      red: 1,
      green: 1,
      blue: 1,
      black: 1,
      white: 0,
    };
    expect(validateMax(values)).toMatchObject({
      red: "max",
      green: "max",
      blue: "max",
      black: "max",
      white: "max",
    });
  });
});

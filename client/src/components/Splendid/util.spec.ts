import { SplendidForm } from "./domain";
import {
  constructCardRef,
  constructEmptyResourceList,
  constructPayload,
} from "./util";

describe("constructPayload()", () => {
  it("should transform form values", () => {
    const values: SplendidForm = {
      gameAction: "takeResources",
      resources: constructEmptyResourceList(),
      selectedCard: "",
    };
    const result = constructPayload(values);
    expect(result).toEqual({
      action: "game",
      params: {
        gameAction: "takeResources",
        cardId: undefined,
        tier: undefined,
        resources: {
          black: 0,
          blue: 0,
          green: 0,
          red: 0,
          white: 0,
          yellow: 0,
        },
      },
    });
  });

  it("should transform selectedCard into a tier", () => {
    const card = { id: 0, tier: 1 };
    const values: SplendidForm = {
      gameAction: "reserveHidden",
      resources: constructEmptyResourceList(),
      selectedCard: constructCardRef(card),
    };
    const result = constructPayload(values);

    expect(result.params.cardId).toBeUndefined();
    expect(result.params.tier).toBe(1);
  });

  it("should transform selectedCard into a cardId", () => {
    const card = { id: 1, tier: 2 };
    const values: SplendidForm = {
      gameAction: "reserveHidden",
      resources: constructEmptyResourceList(),
      selectedCard: constructCardRef(card),
    };
    const result = constructPayload(values);

    expect(result.params.cardId).toBe(1);
    expect(result.params.tier).toBe(2);
  });

  it("should negate negative values", () => {
    const values: SplendidForm = {
      gameAction: "reserveHidden",
      resources: {
        black: -1,
        blue: 1,
        green: 0,
        red: -1,
        white: 0,
        yellow: 1,
      },
      selectedCard: "",
    };
    const result = constructPayload(values);

    expect(result.params.resources).toEqual({
      black: 1,
      blue: 1,
      green: 0,
      red: 1,
      white: 0,
      yellow: 1,
    });
  });
});

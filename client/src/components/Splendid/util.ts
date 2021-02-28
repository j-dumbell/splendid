import { SplendidResourceList, splendidResource, SplendidCard } from "./domain";

/** Creates a zero-value resource list */
export const constructEmptyResourceList = (): SplendidResourceList =>
  splendidResource.reduce((prev, next) => {
    return { ...prev, [next]: 0 };
  }, {}) as SplendidResourceList;

/** Constructs a card reference based on card ID and tier */
export const constructCardRef = ({ id, tier }: SplendidCard) => `${tier}:${id}`;

/** Returns the type/value of card selected in the form */
const getSelection = (
  type: "tier" | "card",
  selectedCard: string
): number | undefined => {
  const [left, right] = selectedCard.split(":");
  const tier = Number(left) || undefined;
  const cardId = Number(right) || undefined;
  return type === "tier" ? tier : cardId;
};

/** Creates the json payload required for game actions  */
export const constructPayload = (values: any) => ({
  action: "game",
  params: {
    gameAction: values.gameAction,
    cardId: getSelection("card", values.selectedCard),
    tier: getSelection("tier", values.selectedCard),
    resources: Object.keys(values.resources).reduce(
      (prev, next) => ({
        ...prev,
        [next]:
          values.resources[next] < 0
            ? -values.resources[next]
            : values.resources[next],
      }),
      {}
    ),
  },
});

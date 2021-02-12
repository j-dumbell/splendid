import { SplendidResourceList, splendidResource } from "./domain";

/**
 * Creates a zero-value resource list
 */
export const constructEmptyResourceList = (): SplendidResourceList =>
  splendidResource.reduce((prev, next) => {
    return { ...prev, [next]: 0 };
  }, {}) as SplendidResourceList;

/**
 * Returns the type/value of card selected in the form
 * @param type
 * @param selectedCard
 */
const getSelection = (
  type: "tier" | "card",
  selectedCard: string
): number | undefined => {
  const selector = type === "tier" ? "hidden" : "visible";
  return selectedCard.startsWith(selector)
    ? Number(selectedCard.replace(`${selector}-`, ""))
    : undefined;
};

/**
 * Creates the json payload required for game actions
 * @param values
 */
export const constructPayload = (values: any) => ({
  action: "game",
  params: {
    gameAction: values.gameAction,
    resources: values.resources,
    cardId: getSelection("card", values.selectedCard),
    tier: getSelection("tier", values.selectedCard),
  },
});

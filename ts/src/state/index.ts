import fixtures from "./gameFixtures.json";
import { SplendidGame } from "../components/Splendid/domain";
import { State } from "./domain";
import { constructEmptyResourceList } from "../components/Splendid/util";

/**
 * Create a `.env.development.local` file and set this env to
 * enable game fixtures when rendering the initial state.
 */
export const withFixtureEnv = process.env.REACT_APP_WITH_FIXTURES === "1";
const withFixtures: Partial<State> | undefined = withFixtureEnv
  ? {
      chat: new Array(50).fill({
        message: "hello i am message",
        clientId: 2,
        timestamp: new Date(),
      }),
      connection: {
        loading: false,
        open: true,
        error: undefined,
      },
      lobbyId: "abc123",
      clientId: 1,
      playerNames: {
        1: "Van",
        2: "James",
      },
      game: {
        form: {
          selectedCard: "",
          resources: constructEmptyResourceList(),
        },
        response: (fixtures as unknown) as SplendidGame,
      },
    }
  : undefined;

export const defaultState: State = {
  chat: [],
  history: [],
  connection: {
    loading: false,
    open: false,
    error: undefined,
  },
  playerNames: {},
  game: {
    form: {
      selectedCard: "",
      resources: constructEmptyResourceList(),
    },
  },
  ...withFixtures,
};

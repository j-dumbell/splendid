import React from "react";

import fixtures from "./gameFixtures.json";
import Card from "./Card";
import Elite from "./Elite";
import ResourceList from "./ResourceList";

const Splendid = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", color: "white" }}>
      <ResourceList resourceList={fixtures.board.bank} />
    </div>
    <div style={{ display: "flex" }}>
      {fixtures.board.elites.map(elite => <Elite {...elite as any} />)}
    </div>
    <div>
      {Object.keys(fixtures.board.decks)
        .reverse()
        .map((tier) => {
          const cards = (fixtures.board.decks as any)[tier];
          return (
            <div style={{ display: "flex" }}>
              {cards.map((card: any) => (
                <Card {...card} />
              ))}
            </div>
          );
        })}
    </div>
  </div>
);

export default Splendid;

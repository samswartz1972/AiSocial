import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import GameCenter from "../components/games/GameCenter";

const GamesPage = () => {
  return (
    <FeaturePageWrapper title="Game Center" currentFeature="games">
      <GameCenter />
    </FeaturePageWrapper>
  );
};

export default GamesPage;

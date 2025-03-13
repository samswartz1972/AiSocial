import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import AuctionContainer from "../components/auction/AuctionContainer";

const AuctionsPage = () => {
  return (
    <FeaturePageWrapper title="Auctions" currentFeature="auctions">
      <AuctionContainer />
    </FeaturePageWrapper>
  );
};

export default AuctionsPage;

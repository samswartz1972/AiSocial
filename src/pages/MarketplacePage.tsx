import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import MarketplaceContainer from "../components/marketplace/MarketplaceContainer";

const MarketplacePage = () => {
  return (
    <FeaturePageWrapper title="Marketplace" currentFeature="marketplace">
      <MarketplaceContainer />
    </FeaturePageWrapper>
  );
};

export default MarketplacePage;

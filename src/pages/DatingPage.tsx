import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import DatingContainer from "../components/dating/DatingContainer";

const DatingPage = () => {
  return (
    <FeaturePageWrapper title="Dating" currentFeature="dating">
      <DatingContainer />
    </FeaturePageWrapper>
  );
};

export default DatingPage;

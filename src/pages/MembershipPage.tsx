import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import MembershipPlans from "../components/membership/MembershipPlans";

const MembershipPage = () => {
  return (
    <FeaturePageWrapper title="Membership Plans" currentFeature="membership">
      <MembershipPlans />
    </FeaturePageWrapper>
  );
};

export default MembershipPage;

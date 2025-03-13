import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import AdvancedAdminPanel from "../components/admin/AdvancedAdminPanel";

const AdvancedAdminPage = () => {
  return (
    <FeaturePageWrapper title="Advanced Admin Dashboard" currentFeature="admin">
      <AdvancedAdminPanel />
    </FeaturePageWrapper>
  );
};

export default AdvancedAdminPage;

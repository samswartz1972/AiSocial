import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import AdminPanel from "../components/admin/AdminPanel";

const AdminPage = () => {
  return (
    <FeaturePageWrapper title="Admin Dashboard" currentFeature="admin">
      <AdminPanel />
    </FeaturePageWrapper>
  );
};

export default AdminPage;

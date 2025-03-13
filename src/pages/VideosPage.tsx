import React from "react";
import FeaturePageWrapper from "../components/layout/FeaturePageWrapper";
import VideoGallery from "../components/video/VideoGallery";

const VideosPage = () => {
  return (
    <FeaturePageWrapper title="Videos" currentFeature="videos">
      <VideoGallery />
    </FeaturePageWrapper>
  );
};

export default VideosPage;

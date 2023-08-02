import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1140}
    height={85}
    viewBox="0 0 1140 85"
    backgroundColor="#f0efef"
    foregroundColor="#e3e3e3"
    {...props}
  >
    <rect x="2" y="20" rx="5" ry="5" width="1140" height="85" />
  </ContentLoader>
);

export default Skeleton;

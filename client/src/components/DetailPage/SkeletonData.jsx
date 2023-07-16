const SkeletonData = () => {
  return (
    <svg
      role="img"
      width="82"
      height="330"
      aria-labelledby="loading-aria"
      viewBox="0 0 82 330"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clipPath)"
        style={{
          fill: "url(#fill)",
        }}
      ></rect>
      <defs>
        <clipPath id="clipPath">
          <rect x="0" y="0" rx="3" ry="3" width="82" height="18" />
          {/* <rect x="0" y="46" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="79" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="112" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="146" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="178" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="212" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="247" rx="3" ry="3" width="82" height="18" />
          <rect x="0" y="280" rx="3" ry="3" width="82" height="18" /> */}
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SkeletonData;

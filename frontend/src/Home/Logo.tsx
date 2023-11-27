import React from "react";

export const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={128}
    height={128}
    fill="none"
    {...props}
  >
    <rect width={128} height={128} fill="url(#a)" rx={32} />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M59.511 59.511a6.348 6.348 0 1 1 8.978 8.978 6.348 6.348 0 0 1-8.978-8.978ZM64 62.535a1.465 1.465 0 1 0 0 2.93 1.465 1.465 0 0 0 0-2.93Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M51.793 45.73A21.972 21.972 0 0 1 64 42.027a2.441 2.441 0 0 1 0 4.883A17.09 17.09 0 1 0 81.09 64a2.441 2.441 0 0 1 4.883 0 21.973 21.973 0 1 1-34.18-18.27Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M45.79 31.095a37.598 37.598 0 0 1 22.388-4.463 2.441 2.441 0 1 1-.544 4.853A32.714 32.714 0 1 0 96.5 60.365a2.442 2.442 0 0 1 4.853-.542 37.596 37.596 0 0 1-43.68 41.236A37.594 37.594 0 0 1 26.92 70.291a37.597 37.597 0 0 1 18.87-39.196Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M88.372 26.588a2.441 2.441 0 0 1 1.507 2.256v9.277h9.277a2.441 2.441 0 0 1 1.727 4.168l-11.72 11.719a2.441 2.441 0 0 1-1.725.715h-11.72a2.441 2.441 0 0 1-2.44-2.442V40.563c0-.648.257-1.269.714-1.727l11.72-11.719a2.441 2.441 0 0 1 2.66-.529ZM78.16 41.574v8.266h8.266l6.836-6.836h-5.825a2.441 2.441 0 0 1-2.44-2.441v-5.825l-6.837 6.836Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M77.445 50.555c.954.953.954 2.5 0 3.453L65.726 65.726a2.441 2.441 0 1 1-3.452-3.452l11.718-11.72a2.441 2.441 0 0 1 3.453 0Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="a"
        x1={64}
        x2={64}
        y1={0}
        y2={128}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EEC04A" />
        <stop offset={1} stopColor="#FF6B00" />
      </linearGradient>
    </defs>
  </svg>
);

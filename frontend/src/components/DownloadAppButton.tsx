import React, { ReactNode } from "react";
import { Button, useComputedColorScheme } from "@mantine/core";

// const FALLBACK_LANG = "EN";

interface ButtonConfigurations {
  [language: string]: {
    light: ReactNode;
    dark: ReactNode;
  };
}

export const DownloadAppButton = () => {
  return (
    <Button
      variant="transparent"
      size="xl"
      p={0}
      m={0}
      style={{ border: "none" }}
    >
      <DownloadOnAppStore />
    </Button>
  );
};

const DownloadOnAppStoreDarkEN = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={180}
    height={60}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#A6A6A6"
        d="M165.666 0H14.342c-.551 0-1.096 0-1.647.003-.46.003-.917.012-1.382.02-1.01.011-2.018.1-3.014.264-.995.168-1.96.485-2.86.94-.899.46-1.72 1.056-2.434 1.769a9.389 9.389 0 0 0-1.773 2.431 9.882 9.882 0 0 0-.94 2.855 19.436 19.436 0 0 0-.27 3.003c-.013.46-.015.922-.022 1.382v34.671c.007.466.009.917.023 1.383.012 1.006.102 2.01.27 3.003.165.994.482 1.957.94 2.856a9.313 9.313 0 0 0 1.772 2.422A9.438 9.438 0 0 0 5.44 58.77c.9.456 1.864.775 2.859.946.997.163 2.004.252 3.014.265.465.01.922.016 1.382.016.55.003 1.096.003 1.647.003h151.324c.541 0 1.09 0 1.63-.003.459 0 .929-.006 1.387-.016a20.044 20.044 0 0 0 3.009-.265c.998-.172 1.965-.491 2.87-.946a9.454 9.454 0 0 0 2.433-1.768 9.588 9.588 0 0 0 1.777-2.422c.454-.9.768-1.862.931-2.856.168-.993.261-1.997.279-3.003.006-.466.006-.917.006-1.383.012-.545.012-1.087.012-1.64V14.303c0-.55 0-1.094-.012-1.637 0-.46 0-.922-.006-1.382a20.156 20.156 0 0 0-.279-3.003 9.885 9.885 0 0 0-.931-2.855 9.716 9.716 0 0 0-4.21-4.2 10.206 10.206 0 0 0-2.87-.94 19.69 19.69 0 0 0-3.009-.265c-.458-.007-.928-.016-1.387-.02-.54-.002-1.089-.002-1.63-.002Z"
      />
      <path
        fill="#000"
        d="M12.703 58.688c-.458 0-.906-.006-1.36-.017a19.136 19.136 0 0 1-2.812-.244 8.869 8.869 0 0 1-2.492-.822 8.13 8.13 0 0 1-2.101-1.525 7.98 7.98 0 0 1-1.536-2.095 8.566 8.566 0 0 1-.816-2.486c-.155-.93-.239-1.87-.25-2.812-.01-.316-.023-1.37-.023-1.37v-34.65s.014-1.038.022-1.342c.012-.941.095-1.88.25-2.808.143-.868.419-1.709.817-2.494a8.061 8.061 0 0 1 1.527-2.096 8.37 8.37 0 0 1 2.11-1.534 8.776 8.776 0 0 1 2.486-.816 18.982 18.982 0 0 1 2.821-.246l1.358-.018h154.585l1.374.019c.936.01 1.871.092 2.795.243a8.945 8.945 0 0 1 2.513.822 8.397 8.397 0 0 1 3.633 3.63c.392.78.663 1.613.805 2.473.156.936.244 1.883.262 2.831.004.425.004.881.004 1.335.012.563.012 1.098.012 1.638v31.393c0 .545 0 1.077-.012 1.613 0 .488 0 .935-.006 1.395a18.916 18.916 0 0 1-.257 2.78 8.579 8.579 0 0 1-.812 2.505 8.226 8.226 0 0 1-1.528 2.078 8.128 8.128 0 0 1-2.105 1.534 8.835 8.835 0 0 1-2.509.825c-.93.151-1.87.233-2.812.244-.44.01-.902.017-1.349.017l-1.631.002-152.963-.002Z"
      />
      <path
        fill="#fff"
        d="M37.258 30.451c.016-1.252.35-2.48.97-3.569a7.434 7.434 0 0 1 2.574-2.66 7.614 7.614 0 0 0-6.003-3.236c-2.526-.264-4.975 1.508-6.262 1.508-1.312 0-3.294-1.481-5.428-1.438a8.012 8.012 0 0 0-3.905 1.162 7.984 7.984 0 0 0-2.823 2.93c-2.91 5.023-.74 12.404 2.047 16.464 1.395 1.988 3.024 4.21 5.156 4.13 2.087-.086 2.866-1.326 5.384-1.326 2.496 0 3.227 1.326 5.402 1.276 2.239-.036 3.65-1.997 4.995-4.004a16.423 16.423 0 0 0 2.284-4.638 7.188 7.188 0 0 1-3.192-2.64 7.159 7.159 0 0 1-1.2-3.959ZM33.149 18.316a7.295 7.295 0 0 0 1.676-5.236A7.464 7.464 0 0 0 30 15.57a6.95 6.95 0 0 0-1.72 5.042 6.18 6.18 0 0 0 4.869-2.296ZM63.632 40.71h-7.12l-1.71 5.034h-3.016l6.744-18.627h3.133l6.744 18.627H65.34L63.63 40.71Zm-6.383-2.324h5.644l-2.782-8.17h-.078l-2.784 8.17ZM82.972 38.955c0 4.22-2.265 6.931-5.683 6.931a4.627 4.627 0 0 1-4.285-2.376h-.065v6.727h-2.796V32.164h2.706v2.258h.052a4.841 4.841 0 0 1 4.336-2.4c3.456 0 5.735 2.724 5.735 6.933Zm-2.873 0c0-2.75-1.425-4.558-3.6-4.558-2.135 0-3.572 1.846-3.572 4.558 0 2.736 1.437 4.568 3.573 4.568 2.174 0 3.599-1.794 3.599-4.568ZM97.961 38.955c0 4.22-2.265 6.931-5.683 6.931a4.627 4.627 0 0 1-4.285-2.376h-.065v6.727h-2.795V32.164h2.705v2.258h.052a4.841 4.841 0 0 1 4.336-2.4c3.457 0 5.735 2.724 5.735 6.933Zm-2.873 0c0-2.75-1.425-4.558-3.6-4.558-2.135 0-3.572 1.846-3.572 4.558 0 2.736 1.437 4.568 3.573 4.568 2.174 0 3.599-1.794 3.599-4.568ZM107.868 40.554c.207 1.847 2.006 3.06 4.465 3.06 2.357 0 4.052-1.213 4.052-2.878 0-1.446-1.023-2.312-3.444-2.905l-2.42-.582c-3.43-.826-5.023-2.425-5.023-5.021 0-3.214 2.809-5.422 6.797-5.422 3.947 0 6.653 2.208 6.744 5.422h-2.822c-.169-1.859-1.71-2.981-3.962-2.981-2.251 0-3.792 1.135-3.792 2.788 0 1.317.984 2.091 3.391 2.685l2.058.504c3.833.903 5.425 2.439 5.425 5.163 0 3.485-2.783 5.667-7.211 5.667-4.142 0-6.939-2.13-7.12-5.5h2.862ZM125.37 28.95v3.214h2.59v2.207h-2.59v7.487c0 1.163.519 1.705 1.657 1.705.308-.005.615-.027.92-.065v2.195a7.694 7.694 0 0 1-1.553.129c-2.757 0-3.832-1.033-3.832-3.667v-7.784h-1.98v-2.207h1.98V28.95h2.808ZM129.46 38.955c0-4.273 2.524-6.958 6.459-6.958 3.949 0 6.46 2.685 6.46 6.958 0 4.284-2.498 6.958-6.46 6.958-3.96 0-6.459-2.674-6.459-6.958Zm10.071 0c0-2.932-1.347-4.661-3.612-4.661s-3.611 1.743-3.611 4.66c0 2.944 1.346 4.66 3.611 4.66s3.612-1.716 3.612-4.66ZM144.684 32.164h2.666v2.311h.065c.18-.722.604-1.36 1.201-1.807a3.256 3.256 0 0 1 2.075-.647c.322 0 .643.034.957.105v2.607a3.915 3.915 0 0 0-1.256-.169 2.82 2.82 0 0 0-2.79 1.93 2.8 2.8 0 0 0-.122 1.195v8.055h-2.796v-13.58ZM164.537 41.755c-.376 2.466-2.784 4.158-5.864 4.158-3.962 0-6.421-2.647-6.421-6.894 0-4.26 2.472-7.022 6.303-7.022 3.768 0 6.138 2.58 6.138 6.698v.955h-9.619v.169a3.53 3.53 0 0 0 2.194 3.587c.466.19.967.278 1.47.26a3.078 3.078 0 0 0 3.145-1.91h2.654Zm-9.45-4.053h6.809a3.25 3.25 0 0 0-.915-2.451 3.275 3.275 0 0 0-2.426-.996 3.451 3.451 0 0 0-3.206 2.124c-.174.42-.263.87-.262 1.323ZM56.899 13.097a3.98 3.98 0 0 1 3.167 1.226 3.957 3.957 0 0 1 1.056 3.22c0 2.86-1.55 4.504-4.223 4.504h-3.242v-8.95h3.242ZM55.05 20.78h1.692a2.828 2.828 0 0 0 2.248-.907 2.814 2.814 0 0 0 .712-2.312 2.815 2.815 0 0 0-.723-2.296 2.83 2.83 0 0 0-2.237-.905H55.05v6.42ZM62.697 18.666a3.19 3.19 0 0 1 .82-2.456 3.207 3.207 0 0 1 2.374-1.048 3.217 3.217 0 0 1 2.374 1.048 3.196 3.196 0 0 1 .82 2.456 3.192 3.192 0 0 1-.817 2.461 3.21 3.21 0 0 1-2.377 1.05 3.217 3.217 0 0 1-2.377-1.05 3.197 3.197 0 0 1-.818-2.46Zm5.013 0c0-1.464-.66-2.32-1.817-2.32-1.162 0-1.816.856-1.816 2.32 0 1.476.654 2.326 1.816 2.326 1.157 0 1.817-.855 1.817-2.326ZM77.577 22.047H76.19l-1.4-4.975h-.105l-1.394 4.975h-1.374l-1.867-6.755h1.356l1.213 5.154h.1l1.393-5.154h1.282l1.393 5.154h.106l1.207-5.154h1.337l-1.86 6.755ZM81.007 15.292h1.287v1.073h.1a2.023 2.023 0 0 1 2.021-1.203 2.21 2.21 0 0 1 1.778.694 2.195 2.195 0 0 1 .567 1.818v4.373h-1.337v-4.038c0-1.086-.473-1.625-1.462-1.625a1.556 1.556 0 0 0-1.545 1.053 1.545 1.545 0 0 0-.072.658v3.952h-1.337v-6.755ZM88.89 12.655h1.336v9.392H88.89v-9.392ZM92.085 18.666a3.192 3.192 0 0 1 .82-2.457 3.208 3.208 0 0 1 2.374-1.047 3.217 3.217 0 0 1 2.375 1.047 3.198 3.198 0 0 1 .82 2.457 3.193 3.193 0 0 1-1.895 3.237 3.217 3.217 0 0 1-3.677-.776 3.199 3.199 0 0 1-.817-2.46Zm5.013 0c0-1.464-.66-2.32-1.817-2.32-1.162 0-1.816.856-1.816 2.32 0 1.476.654 2.326 1.816 2.326 1.157 0 1.817-.855 1.817-2.326ZM99.881 20.137c0-1.216.908-1.917 2.519-2.017l1.835-.105v-.583c0-.714-.473-1.117-1.387-1.117-.746 0-1.263.274-1.411.751h-1.295c.137-1.16 1.231-1.904 2.768-1.904 1.698 0 2.656.843 2.656 2.27v4.615h-1.287v-.95h-.106a2.273 2.273 0 0 1-2.034 1.06 2.051 2.051 0 0 1-2.079-1.194 2.036 2.036 0 0 1-.179-.826Zm4.354-.578v-.564l-1.654.105c-.933.062-1.356.379-1.356.974 0 .608.529.962 1.256.962a1.603 1.603 0 0 0 1.191-.368 1.594 1.594 0 0 0 .563-1.11v.001ZM107.323 18.666c0-2.134 1.1-3.486 2.811-3.486a2.238 2.238 0 0 1 2.077 1.185h.1v-3.71h1.337v9.392h-1.281V20.98h-.106a2.346 2.346 0 0 1-2.127 1.178c-1.723 0-2.811-1.352-2.811-3.492Zm1.381 0c0 1.433.677 2.295 1.809 2.295 1.127 0 1.823-.874 1.823-2.289 0-1.407-.703-2.294-1.823-2.294-1.125 0-1.809.868-1.809 2.288ZM119.179 18.666a3.187 3.187 0 0 1 .819-2.456 3.213 3.213 0 0 1 5.42 1.142c.141.423.192.87.149 1.314.044.445-.007.893-.148 1.317a3.214 3.214 0 0 1-6.093 0 3.195 3.195 0 0 1-.147-1.317Zm5.013 0c0-1.464-.659-2.32-1.817-2.32-1.162 0-1.815.856-1.815 2.32 0 1.476.653 2.326 1.815 2.326 1.158 0 1.817-.855 1.817-2.326ZM127.361 15.292h1.287v1.073h.099a2.03 2.03 0 0 1 2.022-1.203 2.21 2.21 0 0 1 1.778.694 2.196 2.196 0 0 1 .566 1.818v4.373h-1.337v-4.038c0-1.086-.473-1.625-1.461-1.625a1.558 1.558 0 0 0-1.545 1.053 1.564 1.564 0 0 0-.073.658v3.952h-1.336v-6.755ZM140.667 13.61v1.713h1.467v1.123h-1.467v3.473c0 .707.292 1.017.957 1.017.171 0 .341-.01.51-.03v1.11c-.24.043-.483.066-.727.068-1.487 0-2.079-.521-2.079-1.824v-3.814h-1.075v-1.123h1.075V13.61h1.339ZM143.96 12.655h1.325v3.723h.106a2.087 2.087 0 0 1 2.065-1.21 2.236 2.236 0 0 1 2.249 1.55c.099.313.127.643.084.968v4.36h-1.338v-4.031c0-1.08-.504-1.626-1.449-1.626a1.586 1.586 0 0 0-1.617 1.037 1.555 1.555 0 0 0-.088.676v3.945h-1.337v-9.392ZM157.583 20.223a2.755 2.755 0 0 1-2.935 1.954 3.08 3.08 0 0 1-3.023-2.17 3.051 3.051 0 0 1-.106-1.316 3.115 3.115 0 0 1 3.123-3.53c1.885 0 3.022 1.285 3.022 3.406v.465h-4.783v.075a1.77 1.77 0 0 0 .473 1.365 1.794 1.794 0 0 0 1.331.57 1.623 1.623 0 0 0 1.611-.82h1.287Zm-4.702-2.177h3.421a1.617 1.617 0 0 0-.445-1.243 1.638 1.638 0 0 0-1.222-.507 1.738 1.738 0 0 0-1.627 1.077c-.087.214-.13.443-.127.673Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h180v60H0z" />
      </clipPath>
    </defs>
  </svg>
);

const DownloadOnAppStoreLightEN = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={180}
    height={60}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#000"
        d="M165.666 0H14.342c-.551 0-1.096 0-1.647.003-.46.003-.917.012-1.382.02-1.01.011-2.018.1-3.014.264-.995.168-1.96.485-2.86.94-.899.46-1.72 1.056-2.434 1.769a9.389 9.389 0 0 0-1.773 2.431 9.882 9.882 0 0 0-.94 2.855 19.436 19.436 0 0 0-.27 3.003c-.013.46-.015.922-.022 1.382v34.671c.007.466.009.917.023 1.383.012 1.006.102 2.01.27 3.003a9.86 9.86 0 0 0 .94 2.856 9.313 9.313 0 0 0 1.772 2.422A9.438 9.438 0 0 0 5.44 58.77c.9.456 1.864.775 2.859.946.997.163 2.004.252 3.014.265.465.01.922.016 1.382.016.55.003 1.096.003 1.647.003h151.324c.541 0 1.09 0 1.63-.003.459 0 .929-.006 1.387-.016a20.03 20.03 0 0 0 3.009-.265c.998-.172 1.965-.491 2.87-.946a9.454 9.454 0 0 0 2.433-1.768 9.587 9.587 0 0 0 1.777-2.422c.454-.9.768-1.862.931-2.856.168-.993.261-1.997.279-3.003.006-.466.006-.917.006-1.383.012-.545.012-1.087.012-1.64V14.303c0-.55 0-1.094-.012-1.637 0-.46 0-.922-.006-1.382a20.156 20.156 0 0 0-.279-3.003 9.885 9.885 0 0 0-.931-2.855 9.716 9.716 0 0 0-4.21-4.2 10.206 10.206 0 0 0-2.87-.94 19.69 19.69 0 0 0-3.009-.265c-.458-.007-.928-.016-1.387-.02-.54-.002-1.089-.002-1.63-.002Z"
      />
      <path
        fill="#fff"
        d="M12.703 58.688c-.458 0-.906-.006-1.36-.017a19.136 19.136 0 0 1-2.812-.244 8.869 8.869 0 0 1-2.492-.822 8.13 8.13 0 0 1-2.101-1.525 7.98 7.98 0 0 1-1.536-2.095 8.566 8.566 0 0 1-.816-2.486c-.155-.93-.239-1.87-.25-2.812-.01-.316-.023-1.37-.023-1.37v-34.65s.014-1.038.022-1.342c.012-.941.095-1.88.25-2.808.143-.868.419-1.709.817-2.494a8.061 8.061 0 0 1 1.527-2.096 8.37 8.37 0 0 1 2.11-1.534 8.776 8.776 0 0 1 2.486-.816 18.982 18.982 0 0 1 2.821-.246l1.358-.018h154.585l1.374.019c.936.01 1.871.092 2.795.243a8.945 8.945 0 0 1 2.513.822 8.397 8.397 0 0 1 3.633 3.63c.392.78.663 1.613.805 2.473.156.936.244 1.883.262 2.831.004.425.004.881.004 1.335.012.563.012 1.098.012 1.638v31.393c0 .545 0 1.077-.012 1.613 0 .488 0 .935-.006 1.395a18.916 18.916 0 0 1-.257 2.78 8.579 8.579 0 0 1-.812 2.505 8.226 8.226 0 0 1-1.528 2.078 8.128 8.128 0 0 1-2.105 1.534 8.835 8.835 0 0 1-2.509.825c-.93.151-1.87.233-2.812.244-.44.01-.902.017-1.349.017l-1.631.002-152.963-.002Z"
      />
      <path
        fill="#000"
        d="M37.6 29.834a7.702 7.702 0 0 1 1.008-3.71 7.729 7.729 0 0 1 2.679-2.766 7.94 7.94 0 0 0-6.243-3.366c-2.627-.275-5.174 1.567-6.512 1.567-1.365 0-3.425-1.54-5.645-1.494a8.332 8.332 0 0 0-4.06 1.208 8.302 8.302 0 0 0-2.936 3.047c-3.025 5.223-.769 12.899 2.129 17.12 1.45 2.068 3.144 4.377 5.361 4.295 2.17-.09 2.98-1.38 5.6-1.38 2.594 0 3.354 1.38 5.616 1.328 2.329-.037 3.795-2.076 5.195-4.163a17.08 17.08 0 0 0 2.375-4.824 7.476 7.476 0 0 1-3.32-2.746 7.445 7.445 0 0 1-1.247-4.116ZM33.328 17.215a7.586 7.586 0 0 0 1.743-5.445 7.761 7.761 0 0 0-5.017 2.59 7.227 7.227 0 0 0-1.79 5.242 6.427 6.427 0 0 0 5.064-2.387ZM63.63 40.71h-7.12l-1.71 5.034h-3.015l6.744-18.627h3.133l6.744 18.627H65.34l-1.708-5.035Zm-6.382-2.324h5.644l-2.782-8.17h-.078l-2.784 8.17ZM82.971 38.955c0 4.22-2.265 6.931-5.683 6.931a4.627 4.627 0 0 1-4.285-2.376h-.065v6.727h-2.795V32.164h2.706v2.258h.05a4.826 4.826 0 0 1 4.337-2.4c3.457 0 5.735 2.724 5.735 6.933Zm-2.873 0c0-2.75-1.425-4.557-3.6-4.557-2.135 0-3.572 1.845-3.572 4.557 0 2.736 1.437 4.568 3.573 4.568 2.174 0 3.599-1.794 3.599-4.568ZM97.961 38.955c0 4.22-2.266 6.931-5.684 6.931a4.627 4.627 0 0 1-4.285-2.376h-.065v6.727h-2.795V32.164h2.706v2.258h.051a4.841 4.841 0 0 1 4.336-2.4c3.457 0 5.736 2.724 5.736 6.933Zm-2.874 0c0-2.75-1.425-4.557-3.599-4.557-2.136 0-3.572 1.845-3.572 4.557 0 2.736 1.436 4.568 3.572 4.568 2.174 0 3.599-1.794 3.599-4.568ZM107.866 40.554c.207 1.847 2.007 3.06 4.466 3.06 2.356 0 4.051-1.213 4.051-2.878 0-1.446-1.022-2.312-3.443-2.905l-2.421-.582c-3.43-.826-5.022-2.425-5.022-5.021 0-3.214 2.808-5.421 6.795-5.421 3.949 0 6.655 2.207 6.746 5.42h-2.822c-.169-1.858-1.71-2.98-3.962-2.98-2.252 0-3.793 1.135-3.793 2.788 0 1.317.984 2.091 3.392 2.685l2.058.504c3.832.903 5.423 2.439 5.423 5.163 0 3.485-2.782 5.668-7.209 5.668-4.143 0-6.94-2.132-7.12-5.5h2.861ZM125.37 28.95v3.214h2.59v2.207h-2.59v7.487c0 1.163.519 1.705 1.657 1.705.308-.005.615-.027.92-.065v2.195a7.694 7.694 0 0 1-1.553.129c-2.757 0-3.832-1.033-3.832-3.667v-7.784h-1.98v-2.207h1.98V28.95h2.808ZM129.458 38.955c0-4.273 2.524-6.958 6.459-6.958 3.949 0 6.461 2.685 6.461 6.958 0 4.284-2.499 6.958-6.461 6.958-3.96 0-6.459-2.674-6.459-6.958Zm10.072 0c0-2.932-1.348-4.661-3.613-4.661-2.265 0-3.612 1.743-3.612 4.66 0 2.944 1.347 4.66 3.612 4.66s3.613-1.716 3.613-4.66ZM144.683 32.164h2.666v2.311h.064a3.252 3.252 0 0 1 3.276-2.454c.322 0 .644.034.958.105v2.607a3.922 3.922 0 0 0-1.256-.169 2.827 2.827 0 0 0-2.177.895 2.804 2.804 0 0 0-.736 2.23v8.055h-2.795v-13.58ZM164.536 41.755c-.376 2.466-2.784 4.158-5.864 4.158-3.962 0-6.421-2.647-6.421-6.894 0-4.26 2.472-7.022 6.303-7.022 3.768 0 6.137 2.58 6.137 6.698v.955h-9.618v.169a3.517 3.517 0 0 0 .961 2.748 3.549 3.549 0 0 0 2.702 1.099 3.086 3.086 0 0 0 3.145-1.91h2.655Zm-9.45-4.053h6.808a3.25 3.25 0 0 0-.915-2.451 3.271 3.271 0 0 0-2.425-.996 3.461 3.461 0 0 0-2.454 1.003 3.43 3.43 0 0 0-1.014 2.444ZM56.899 13.097a3.98 3.98 0 0 1 3.167 1.226 3.957 3.957 0 0 1 1.056 3.22c0 2.86-1.55 4.504-4.223 4.504h-3.242v-8.95h3.242ZM55.05 20.78h1.692a2.828 2.828 0 0 0 2.248-.907 2.814 2.814 0 0 0 .712-2.312 2.815 2.815 0 0 0-.723-2.296 2.83 2.83 0 0 0-2.237-.905H55.05v6.42ZM62.697 18.666a3.19 3.19 0 0 1 .82-2.456 3.208 3.208 0 0 1 2.374-1.048 3.217 3.217 0 0 1 2.374 1.048 3.197 3.197 0 0 1 .82 2.456 3.192 3.192 0 0 1-.817 2.461 3.208 3.208 0 0 1-2.377 1.05 3.217 3.217 0 0 1-2.377-1.05 3.197 3.197 0 0 1-.818-2.46Zm5.013 0c0-1.464-.66-2.32-1.817-2.32-1.162 0-1.816.856-1.816 2.32 0 1.476.654 2.326 1.816 2.326 1.157 0 1.817-.855 1.817-2.326ZM77.577 22.047H76.19l-1.4-4.975h-.105l-1.394 4.975h-1.374l-1.867-6.755h1.356l1.213 5.154h.1l1.393-5.154h1.282l1.393 5.154h.106l1.207-5.154h1.337l-1.86 6.755ZM81.007 15.292h1.287v1.073h.1a2.023 2.023 0 0 1 2.021-1.203 2.208 2.208 0 0 1 2.269 1.539c.098.314.124.647.076.973v4.373h-1.337v-4.038c0-1.086-.473-1.625-1.462-1.625a1.558 1.558 0 0 0-1.545 1.053 1.545 1.545 0 0 0-.072.658v3.952h-1.337v-6.755ZM88.89 12.655h1.336v9.392H88.89v-9.392ZM92.085 18.666a3.192 3.192 0 0 1 .82-2.457 3.208 3.208 0 0 1 2.374-1.047 3.217 3.217 0 0 1 2.375 1.047 3.198 3.198 0 0 1 .82 2.457 3.193 3.193 0 0 1-1.895 3.237 3.217 3.217 0 0 1-3.677-.776 3.199 3.199 0 0 1-.817-2.46Zm5.013 0c0-1.464-.66-2.32-1.817-2.32-1.162 0-1.816.856-1.816 2.32 0 1.476.654 2.326 1.816 2.326 1.157 0 1.817-.855 1.817-2.326ZM99.881 20.137c0-1.216.908-1.917 2.519-2.017l1.835-.105v-.583c0-.714-.473-1.117-1.387-1.117-.746 0-1.263.274-1.411.751h-1.295c.137-1.16 1.231-1.904 2.768-1.904 1.698 0 2.656.843 2.656 2.27v4.615h-1.287v-.95h-.106a2.273 2.273 0 0 1-2.034 1.06 2.051 2.051 0 0 1-2.079-1.194 2.037 2.037 0 0 1-.179-.826Zm4.354-.578v-.564l-1.654.105c-.933.062-1.356.379-1.356.974 0 .608.529.962 1.256.962a1.603 1.603 0 0 0 1.191-.368 1.594 1.594 0 0 0 .563-1.11v.001ZM107.323 18.666c0-2.134 1.1-3.486 2.811-3.486a2.238 2.238 0 0 1 2.077 1.185h.1v-3.71h1.337v9.392h-1.281V20.98h-.106a2.345 2.345 0 0 1-2.127 1.178c-1.723 0-2.811-1.352-2.811-3.492Zm1.381 0c0 1.433.677 2.295 1.809 2.295 1.127 0 1.823-.874 1.823-2.289 0-1.407-.703-2.294-1.823-2.294-1.125 0-1.809.868-1.809 2.288ZM119.179 18.666a3.187 3.187 0 0 1 .819-2.456 3.214 3.214 0 0 1 5.42 1.142c.141.423.192.87.149 1.314.044.445-.007.893-.148 1.317a3.213 3.213 0 0 1-6.093 0 3.195 3.195 0 0 1-.147-1.317Zm5.013 0c0-1.464-.659-2.32-1.817-2.32-1.162 0-1.815.856-1.815 2.32 0 1.476.653 2.326 1.815 2.326 1.158 0 1.817-.855 1.817-2.326ZM127.361 15.292h1.287v1.073h.099a2.03 2.03 0 0 1 2.022-1.203 2.209 2.209 0 0 1 1.778.694 2.197 2.197 0 0 1 .566 1.818v4.373h-1.337v-4.038c0-1.086-.473-1.625-1.461-1.625a1.56 1.56 0 0 0-1.545 1.053 1.564 1.564 0 0 0-.073.658v3.952h-1.336v-6.755ZM140.667 13.61v1.713h1.467v1.123h-1.467v3.473c0 .707.292 1.017.957 1.017.171 0 .341-.01.51-.03v1.11c-.24.043-.483.066-.727.068-1.487 0-2.079-.521-2.079-1.824v-3.814h-1.075v-1.123h1.075V13.61h1.339ZM143.96 12.655h1.325v3.723h.106a2.087 2.087 0 0 1 2.065-1.21 2.236 2.236 0 0 1 2.249 1.55c.099.313.127.643.084.968v4.36h-1.338v-4.031c0-1.08-.504-1.626-1.449-1.626a1.584 1.584 0 0 0-1.617 1.037 1.555 1.555 0 0 0-.088.676v3.945h-1.337v-9.392ZM157.583 20.223a2.755 2.755 0 0 1-2.935 1.954 3.08 3.08 0 0 1-3.023-2.17 3.051 3.051 0 0 1-.106-1.316 3.115 3.115 0 0 1 3.123-3.53c1.885 0 3.022 1.285 3.022 3.406v.465h-4.783v.075a1.77 1.77 0 0 0 .473 1.365 1.794 1.794 0 0 0 1.331.57 1.624 1.624 0 0 0 1.611-.82h1.287Zm-4.702-2.177h3.421a1.617 1.617 0 0 0-.445-1.243 1.638 1.638 0 0 0-1.222-.507 1.738 1.738 0 0 0-1.627 1.077c-.087.214-.13.443-.127.673Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h180v60H0z" />
      </clipPath>
    </defs>
  </svg>
);

const downloadOnAppStoreConfiguration: ButtonConfigurations = {
  EN: {
    light: <DownloadOnAppStoreLightEN />,
    dark: <DownloadOnAppStoreDarkEN />,
  },
};

const DownloadOnAppStore = () => {
  const colorScheme = useComputedColorScheme("light");

  // TODO: Support other languages
  const enConfiguration = downloadOnAppStoreConfiguration["EN"];

  return enConfiguration[colorScheme];
};

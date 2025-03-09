import * as React from "react";

function SvgTwitter(props) {
  return (
    <svg
      width="1.3em"
      height="1.3em"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#Twitter_svg__clip0)">
        <path
          d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.999 19.999 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.547a9.9 9.9 0 004.33-5.446 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.844A19.75 19.75 0 010 39.077 27.938 27.938 0 0015.1 43.5z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="Twitter_svg__clip0">
          <path fill="currentColor" d="M0 0h48v48H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgTwitter;

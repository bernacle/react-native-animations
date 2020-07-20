import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PasswordIcon(props) {
  return (
    <Svg width={18.294} height={24} viewBox="0 0 18.294 24" {...props}>
      <Path
        fill="#B8BFD4"
        fillRule="evenodd"
        d="M16.007 8h-1.143V5.714C14.864 2.571 12.29 0 9.147 0S3.43 2.571 3.43 5.714V8H2.287A2.293 2.293 0 000 10.286v11.428A2.293 2.293 0 002.287 24h13.72a2.293 2.293 0 002.287-2.286V10.286A2.293 2.293 0 0016.007 8zM5.602 5.714V8h7.09V5.714c0-1.943-1.601-3.543-3.545-3.543a3.562 3.562 0 00-3.545 3.543zM9.147 18.4c-1.258 0-2.287-1.028-2.287-2.286S7.89 13.83 9.147 13.83a2.293 2.293 0 012.287 2.285A2.293 2.293 0 019.147 18.4z"
      />
    </Svg>
  );
}

export default PasswordIcon;

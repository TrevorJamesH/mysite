import React, { PropsWithChildren } from "react";
import { themeBackgroundColor, themeColors } from "../constants";
import Background from "./Background";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Background
      backgroundColor={themeBackgroundColor}
      spriteColor={themeColors}
      spriteCount={themeColors.length * 2}
      spriteSize={10}
      speed={10}
      length={40}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 200px auto",
          gridTemplateRows: "auto 220px auto",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            gridColumn: "2/3",
            gridRow: "2/3",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </Background>
  );
};

export default Layout;

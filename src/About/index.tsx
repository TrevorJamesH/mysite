import React from 'react'
import { themeBackgroundColor, themeColors } from '../constants'
import AboutMe from './AboutMe'
import Background from './Background'
import ReferenceLinks from './ReferenceLinks'

const HireMe = () => {
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
          <AboutMe />
          <ReferenceLinks />
        </div>
      </div>
    </Background>
  )
}

export default HireMe
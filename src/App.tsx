import React from "react";
import Background from "./Background";
import AboutMe from "./AboutMe";
import Links from "./Links";

const spriteColors = [
	"#7CBD5C",
	"#CF864A",
	"#C653DC",
	"#E5B35D",
	"#3B9EF2",
	"#25ABB7",
	"#E84A5F",
	"#9AA0B3",
];

function App() {
	return (
		<Background
			backgroundColor={"#1E2128"}
			spriteColor={spriteColors}
			spriteCount={spriteColors.length * 2}
			spriteSize={10}
			speed={10}
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
					<Links />
				</div>
			</div>
		</Background>
	);
}

export default App;

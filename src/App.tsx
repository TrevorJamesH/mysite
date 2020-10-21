import React from "react";
import Background from "./Background";
import AboutMe from "./AboutMe";

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
		<div>
			<Background
				backgroundColor={"#1E2128"}
				spriteColor={spriteColors}
				spriteCount={spriteColors.length * 2}
				spriteSize={10}
				speed={10}
			>
				<AboutMe />
			</Background>
		</div>
	);
}

export default App;

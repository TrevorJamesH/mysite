import React from "react";
import Background from "./Background";

function App() {
	return (
		<Background
			backgroundColor={"#1E2128"}
			spriteColor={["#7CBD5C", "#CF864A", "#C653DC", "#E5B35D", "#3B9EF2"]}
			spriteSize={10}
			speed={5}
		/>
	);
}

export default App;

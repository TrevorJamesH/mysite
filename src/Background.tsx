import React from "react";

const Background = (props: any) => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	return (
		<canvas
			style={{ display: "block" }}
			ref={canvasRef}
			width={window.innerWidth}
			height={window.innerHeight}
			onClick={(event) => {
				const canvas = canvasRef.current;
				const ctx = canvas?.getContext("2d");
				// const newLocation = { x: event.clientX, y: event.clientY }
				const { clientX: x, clientY: y } = event;
				ctx?.fillRect(x, y, 10, 10);
			}}
		/>
	);
};

export default Background;

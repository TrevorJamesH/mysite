import React from "react";

const aboutMe = [
	{
		header: "I'm Trevor",
		body: ["I build web systems.", "I'm like React, TypeScript, and GraphQL"],
	},
];

const AboutMe = () => {
	return (
		<div
			style={{
				backgroundColor: "black",
				height: "100%",
				opacity: "75%",
				padding: "20px",
				fontFamily: "Roboto",
			}}
		>
			{aboutMe.map((section) => (
				<React.Fragment>
					<h3 style={{ color: "#9AA0B3" }}>{section.header}</h3>
					<br />
					{section.body.map((paragraph) => (
						<React.Fragment>
							<p style={{ color: "#9AA0B3" }}>{paragraph}</p>
							<br />
						</React.Fragment>
					))}
				</React.Fragment>
			))}
		</div>
	);
};

export default AboutMe;

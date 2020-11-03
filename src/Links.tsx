import React from "react";
import codewars from "./Icons/codewars.svg";
import github from "./Icons/github.svg";
import linkedin from "./Icons/linkedin.svg";

type Link = {
	name: string;
	icon: string;
	url: string;
	download?: boolean;
};

const links: Link[] = [
	{
		name: "linkedin",
		icon: linkedin,
		url: "https://www.linkedin.com/in/trevor-hewitt-4b45aa47/",
	},
	{
		name: "github",
		icon: github,
		url: "https://github.com/TrevorJamesH/mysite/blob/main/src/Background.tsx",
	},
	{
		name: "codewars",
		icon: codewars,
		url: "https://www.codewars.com/users/TrevorJamesH",
	},
	{
		name: "codewars",
		icon: codewars,
		url:
			"/Resume/Trevor_Hewitt_-_Full-Stack_Developer_-_Front-End_Engineer.pdf",
		download: true,
	},
];

const Link: React.FC<Link> = (link) => {
	const { name, icon, url, download } = link;
	return (
		<a href={url} target="_blank" rel="noopener noreferrer" download={download}>
			<img
				src={icon}
				alt={`${name} logo`}
				style={{
					marginLeft: "10px",
					height: "24px",
					width: "24px",
				}}
			/>
		</a>
	);
};

const Links = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				position: "absolute",
				bottom: "10px",
				right: "10px",
			}}
		>
			{links.map((link) => (
				<Link {...link} />
			))}
		</div>
	);
};

export default Links;

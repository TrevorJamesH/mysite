import React from "react";
import codewars from "../Icons/codewars.svg";
import github from "../Icons/github.svg";
import linkedin from "../Icons/linkedin.svg";
import resume from "../Icons/resume.svg";
import stackoverflow from "../Icons/stackoverflow.svg";

type Link = {
  name: string;
  icon: string;
  url: string;
  download?: boolean;
  size?: number;
};

const links: Link[] = [
  {
    name: "resume",
    icon: resume,
    url:
      "/Resume/Trevor_Hewitt_-_Full-Stack_Developer_-_Front-End_Engineer.pdf",
    download: true,
  },
  {
    name: "linkedin",
    icon: linkedin,
    url: "https://www.linkedin.com/in/trevor-hewitt-4b45aa47/",
  },
  {
    name: "github",
    icon: github,
    url: "https://github.com/TrevorJamesH/mysite/blob/main/src/HireMe/Background.tsx",
  },
  {
    name: "codewars",
    icon: codewars,
    url: "https://www.codewars.com/users/TrevorJamesH",
  },
  {
    name: "stackoverflow",
    icon: stackoverflow,
    url: "https://stackoverflow.com/users/8658680/trevor-hewitt",
  },
];

const ReferenceLink: React.FC<Link> = (link) => {
  const { name, icon, url, download } = link;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" download={download}>
      <img
        src={icon}
        alt={`${name} logo`}
        style={{
          height: "24px",
          width: "24px",
        }}
      />
    </a>
  );
};

const ReferenceLinks = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: "10px",
        left: "0px",
        width: "100%",
      }}
    >
      {links.map((link) => (
        <ReferenceLink {...link} />
      ))}
    </div>
  );
};

export default ReferenceLinks;

import React from "react";
import Layout from "./Layout";
import ReferenceLinks from "./ReferenceLinks";

const aboutMe = [
  {
    header: "I'm Trevor",
    body: ["I build web systems.", "I like React, TypeScript, and GraphQL"],
  },
];

const AboutMe = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundColor: "black",
          height: "100%",
          opacity: "70%",
          padding: "20px",
          fontFamily: "Roboto",
          borderRadius: "5px",
        }}
      >
        {aboutMe.map((section) => (
          <React.Fragment key={section.header}>
            <h3 style={{ color: "#9AA0B3" }}>{section.header}</h3>
            <br />
            {section.body.map((paragraph) => (
              <React.Fragment key={paragraph}>
                <p style={{ color: "#9AA0B3" }}>{paragraph}</p>
                <br />
              </React.Fragment>
            ))}
            <ReferenceLinks />
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export default AboutMe;

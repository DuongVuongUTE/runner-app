import React from "react";

import { Container } from "../../../../../styles/styles";

import * as Style from "./style";

function SectionHome({ title, text, children, noContainer }) {
  return (
    <Style.Section>
      <Style.SectionHeading>
        <Style.SectionTitle>{title}</Style.SectionTitle>
        <Style.SectionText>{text}</Style.SectionText>
      </Style.SectionHeading>
      {noContainer ? <>{children}</> : <Container>{children}</Container>}
    </Style.Section>
  );
}

export default SectionHome;

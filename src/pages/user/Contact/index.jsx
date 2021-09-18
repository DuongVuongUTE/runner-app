import React from "react";
import Hero from "../../../components/Hero";
import { TITLE } from "../../../constants/title";
import { Container } from "../../../styles/styles";

function ContactPage() {
  document.title = TITLE.CONTACT;
  return (
    <div>
      <Hero title="Liên hệ" />
      <Container>
        <div>
          <h2 style={{ textAlign: "center" }}>Runner Inn</h2>
        </div>
      </Container>
    </div>
  );
}

export default ContactPage;

import React from "react";
import Hero from "../../../components/Hero";
import { TITLE } from "../../../constants/title";

function ContactPage() {
  document.title = TITLE.CONTACT;
  return (
    <div>
      <Hero title="Liên hệ" />
    </div>
  );
}

export default ContactPage;

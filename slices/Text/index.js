// slices/Text/index.js

import { PrismicRichText } from "@prismicio/react";
import styles from "../../src/styles/Home.module.css";

const Text = ({ slice }) => (
  <section>
    <PrismicRichText field={slice.primary.text} />
  </section>
);

export default Text;

import React from "react";
import { PrismicRichText, PrismicLink } from "@prismicio/react";
import Link from "next/link";
/**
 * @typedef {import("@prismicio/client").Content.NavigationItemSlice} NavigationItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NavigationItemSlice>} NavigationItemProps
 * @param { NavigationItemProps }
 */

const NavigationItem = ({ slice }) => {
  // console.log(slice);
  return (
    <section>
      <span>
        <PrismicLink field={slice.primary.link}>
          <PrismicRichText field={slice.primary.name} />
        </PrismicLink>
      </span>
      <Link href={slice.primary.link.uid}>
        <PrismicRichText field={slice.primary.name} />
      </Link>
    </section>
  );
};

export default NavigationItem;

import React from "react";
import Image from "next/image";
/**
 * @typedef {import("@prismicio/client").Content.TestSlice} TestSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestSlice>} TestProps
 * @param { TestProps }
 */
const Test = ({ slice }) => {
  return (
    <Image
      src={slice.primary.image.url}
      alt={slice.primary.image.alt}
      width={500}
      height={500}
    />
  );
};

export default Test;

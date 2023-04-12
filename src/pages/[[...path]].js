import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { PrismicText, PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../../slices";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ page }) {
  return (
    <>
      <h1 className={styles.title}>
        <PrismicText field={page.data.greeting} />
      </h1>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <PrismicText field={page.data.greeting} />
        </h1>

        <div className={styles.description}>
          <PrismicRichText field={page.data.description} />
        </div>

        <SliceZone slices={page.data.slices} components={components} />
      </main>
    </>
  );
}

// pages/[[...path]].js, bottom of the file

// This function fetches the Page document from the CMS.
// The document is passed to the page as a prop.
export async function getStaticProps({ params }) {
  // Client used to fetch CMS content.
  const client = createClient();

  // Page document from the CMS.
  const uid = params.path?.[params.path?.length - 1] || "home";
  const page = await client.getByUID("page", uid);

  // Pass the document as prop to our page.
  return {
    props: { page },
  };
}

// This function tells Next.js which URLs to accept.
// Each Page document from the CMS will be given a URL.
export async function getStaticPaths() {
  // Client used to fetch CMS content.
  const client = createClient();

  // Page documents from the CMS.
  const pages = await client.getAllByType("page");

  // URL paths for each Page document from the CMS.
  return {
    paths: pages.map((page) => ({
      params: {
        path: page.uid === "home" ? [] : [page.uid],
      },
    })),
    fallback: false,
  };
}

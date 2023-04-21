import styles from "@/styles/Home.module.css";
import { PrismicText, PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../../slices";
import { Navigation } from "../../components/Navigation";

export default function Home({ navigation, page }) {
  // console.log("this is page", page);
  // console.log("this is navigation", navigation);
  return (
    <>
      <Navigation navigation={navigation} classname={styles.description} />

      <main className={styles.main}>
        <h1>
          <PrismicText field={page.data.greeting} />
        </h1>

        <div>
          <PrismicRichText field={page.data.description} />
        </div>
        {/* slicezone works by displaying the slices specific to the page you're on*/}
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    </>
  );
}

// pages/[[...path]].js, bottom of the file

// This function fetches the Page document from the CMS.
// The document is passed to the page as a prop.
export async function getStaticProps({ params }) {
  const uid = params.slug?.[params.slug?.length - 1] || "home";
  // console.log("this is params.path", params.path); //undefined, changes when triggered
  // Client used to fetch CMS content.
  const client = createClient();

  const [navigation, page] = await Promise.all([
    client.getByUID("navigation", "nav"),
    client.getByUID("page", uid),
  ]);
  // console.log("this is page", page); //same as page above
  return {
    props: {
      navigation,
      page,
    },
    // revalidate: 1,
  };
}

// This function tells Next.js which URLs to accept.
// Each Page document from the CMS will be given a URL.
export async function getStaticPaths() {
  // Client used to fetch CMS content.
  const client = createClient();

  // Page documents from the CMS.
  const pages = await client.getAllByType("page");
  // console.log("pages slug:", pages[0].slugs[0]);

  // URL paths for each Page document from the CMS.

  return {
    paths: pages.map((page) => ({
      params: {
        slug: page.uid === "home" ? [] : [page.uid],
      },
    })),
    fallback: false,
  };
}

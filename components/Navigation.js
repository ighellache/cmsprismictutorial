import { PrismicLink, PrismicText } from "@prismicio/react";
import Link from "next/link";
export function Navigation({ navigation, classname }) {
  return (
    <nav className={classname}>
      <ul>
        {/* Renders top-level links. */}
        {navigation.data.slices.map((slice) => {
          return (
            <li key={slice.id}>
              <Link href={slice.primary.link.uid || slice.primary.link.url}>
                <PrismicText field={slice.primary.name} />
              </Link>

              {/* Renders child links, if present.
              {slice.items.length > 0 && (
                <ul>
                  {slice.items.map((item) => {
                    return (
                      <li key={JSON.stringify(item)}>
                        <PrismicLink field={item.child_link}>
                          <PrismicText field={item.child_name} />
                        </PrismicLink>
                      </li>
                    );
                  })}
                </ul>
              )} */}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

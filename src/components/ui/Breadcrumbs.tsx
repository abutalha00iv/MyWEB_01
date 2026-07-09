import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const withHome: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink/10 bg-warmgray">
      <Container>
        <ol className="flex flex-wrap items-center gap-1.5 py-3.5 text-xs text-ink/55">
          {withHome.map((item, i) => {
            const isLast = i === withHome.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition-colors duration-200 hover:text-plum">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-ink" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}

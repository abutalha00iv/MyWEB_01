import { CheckIcon, MinusIcon } from "@/components/icons";
import { FadeUp } from "@/components/ui/FadeUp";
import { parseStringList } from "@/lib/content-types";

type Package = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string;
  excluded: string;
  highlighted: boolean;
};

export function PricingGroup({ serviceArea, packages }: { serviceArea: string; packages: Package[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">{serviceArea}</h2>
      <div
        className={`mt-8 grid grid-cols-1 gap-6 ${
          packages.length === 1 ? "sm:max-w-md" : packages.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
        }`}
      >
        {packages.map((pkg, i) => {
          const features = parseStringList(pkg.features);
          const excluded = parseStringList(pkg.excluded);
          return (
            <FadeUp key={pkg.id} delay={i * 70}>
              <div
                className={`relative flex h-full flex-col rounded-md border p-7 ${
                  pkg.highlighted ? "border-plum bg-ivory shadow-[0_2px_16px_rgba(91,18,68,0.08)]" : "border-ink/12 bg-ivory"
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-plum px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ivory">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl text-ink">{pkg.name}</h3>
                <p className="mt-2 font-display text-3xl text-ink">{pkg.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{pkg.description}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/75">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {excluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/40">
                      <MinusIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink/30" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  );
}

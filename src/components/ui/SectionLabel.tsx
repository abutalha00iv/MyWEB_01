export function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

export function GoldRule({ className = "" }: { className?: string }) {
  return <div className={`gold-rule ${className}`} role="presentation" />;
}

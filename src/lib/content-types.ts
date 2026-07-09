export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function parseIncluded(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function parseProcess(raw: string): ProcessStep[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is ProcessStep =>
        x && typeof x === "object" && typeof x.title === "string" && typeof x.description === "string"
    );
  } catch {
    return [];
  }
}

export function parseFaq(raw: string): FaqItem[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is FaqItem =>
        x && typeof x === "object" && typeof x.question === "string" && typeof x.answer === "string"
    );
  } catch {
    return [];
  }
}

export function parseStringList(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

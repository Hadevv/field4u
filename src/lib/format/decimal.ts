// fonction pour convertir les objets Decimal de Prisma en nombres JavaScript
function isDecimalLike(obj: unknown): obj is { toNumber: () => number } {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof (obj as { toNumber?: () => number }).toNumber === "function"
  );
}

// Vérifie si un objet est une instance de Date
function isDate(obj: unknown): obj is Date {
  return obj instanceof Date;
}

export function convertDecimal<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Préserver les objets Date
  if (isDate(obj)) {
    return obj;
  }

  if (isDecimalLike(obj)) {
    return obj.toNumber() as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertDecimal) as unknown as T;
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key in obj as object) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = convertDecimal((obj as Record<string, unknown>)[key]);
      }
    }
    return result as T;
  }

  return obj;
}

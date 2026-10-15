/**
 * Client-side CSV export for tenant report tables.
 * No shared export utility existed in the repo; keep this report-scoped.
 */

function escapeCsvCell(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function downloadCsv({ fileName, columns, rows }) {
  const header = columns.map((column) => escapeCsvCell(column.label)).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((column) => escapeCsvCell(row[column.key] ?? ""))
        .join(",")
    )
    .join("\n");

  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function parseNumericValue(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  const cleaned = String(value ?? "")
    .replace(/[^0-9.-]/g, "")
    .trim();
  if (!cleaned) {
    return 0;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

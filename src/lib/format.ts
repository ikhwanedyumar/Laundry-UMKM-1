/**
 * Menyediakan fungsi pemformatan angka Rupiah dan desimal standar untuk seluruh aplikasi.
 */

export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const absFormatted = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return rounded < 0 ? `-Rp ${absFormatted}` : `Rp ${absFormatted}`;
}

export function formatDecimal(value: number): string {
  const fixed = Number(value.toFixed(1));
  if (Number.isInteger(fixed)) {
    return String(fixed);
  }
  return String(fixed).replace('.', ',');
}

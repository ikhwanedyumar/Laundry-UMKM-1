/**
 * Menampilkan opsi layanan tambahan Antar-Jemput dan Pewangi Premium (FT-03).
 */

import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatDecimal, formatRupiah } from '../lib/format';

interface AddonSelectorProps {
  isDelivery: boolean;
  isFragrance: boolean;
  billedWeight: number | null;
  fragranceCost: number;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
}

export function AddonSelector({
  isDelivery,
  isFragrance,
  billedWeight,
  fragranceCost,
  onToggleDelivery,
  onToggleFragrance,
}: AddonSelectorProps) {
  return (
    <section aria-labelledby="addons-heading" className="space-y-3">
      <h2 id="addons-heading" className="text-lg font-medium text-neutral-900">
        Layanan Tambahan
      </h2>

      <div className="space-y-3">
        {ADD_ONS.map((addon) => {
          const isDeliveryAddon = addon.code === 'T01';
          const isChecked = isDeliveryAddon ? isDelivery : isFragrance;
          const handleToggle = () => {
            if (isDeliveryAddon) {
              onToggleDelivery(!isDelivery);
            } else {
              onToggleFragrance(!isFragrance);
            }
          };

          const priceLabel = isDeliveryAddon
            ? `+${formatRupiah(addon.price)}`
            : `+${formatRupiah(addon.price)}/kg ditagih`;

          return (
            <label
              key={addon.code}
              className={`flex min-h-[44px] cursor-pointer items-start justify-between gap-4 rounded-2xl p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-emerald-700 ${
                isChecked
                  ? 'bg-emerald-50 border border-emerald-700 ring-1 ring-emerald-700'
                  : 'bg-white border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleToggle}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                    isChecked
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="h-4 w-4" />}
                </span>

                <div className="space-y-1">
                  <span className="block text-base font-medium text-neutral-900">
                    {addon.name}
                  </span>
                  <span className="block text-sm text-neutral-600">{addon.notes}</span>
                  {!isDeliveryAddon && isChecked && billedWeight !== null && (
                    <span className="block text-sm font-medium text-emerald-700 tabular-nums">
                      Tambahan untuk {formatDecimal(billedWeight)} kg:{' '}
                      {formatRupiah(fragranceCost)}
                    </span>
                  )}
                </div>
              </div>

              <span className="shrink-0 text-sm font-semibold text-neutral-900 tabular-nums">
                {priceLabel}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

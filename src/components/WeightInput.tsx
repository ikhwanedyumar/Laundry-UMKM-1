/**
 * Menangani kolom input berat cucian dan notifikasi otomatis minimum charge 3 kg (FT-02).
 */

import { AlertCircle, Info } from 'lucide-react';
import { forwardRef } from 'react';
import { STORE_INFO } from '../config';
import { formatDecimal } from '../lib/format';

interface WeightInputProps {
  value: string;
  onChange: (value: string) => void;
  isMinChargeApplied: boolean;
  billedWeight: number | null;
  error?: string;
}

export const WeightInput = forwardRef<HTMLInputElement, WeightInputProps>(
  function WeightInput(
    { value, onChange, isMinChargeApplied, billedWeight, error },
    ref,
  ) {
    const errorId = 'weight-error';
    const helpId = 'weight-help';

    return (
      <section aria-labelledby="weight-heading" className="space-y-3">
        <h2 id="weight-heading" className="text-lg font-medium text-neutral-900">
          Estimasi Berat Cucian
        </h2>

        <div className="bg-white rounded-2xl p-4 sm:p-6 space-y-3">
          <div>
            <label
              htmlFor="laundry-weight"
              className="block text-sm font-medium text-neutral-900"
            >
              Perkiraan Berat (kg)
            </label>

            <div className="mt-2 relative flex items-center">
              <input
                ref={ref}
                id="laundry-weight"
                name="weight"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Contoh: 3,5"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${helpId} ${errorId}` : helpId}
                className={`w-full min-h-[44px] rounded-xl border bg-white px-4 py-2 pr-12 text-base text-neutral-900 placeholder:text-neutral-500 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                  error ? 'border-red-700' : 'border-neutral-200'
                }`}
              />
              <span className="pointer-events-none absolute right-4 text-sm font-medium text-neutral-600">
                kg
              </span>
            </div>

            <p id={helpId} className="mt-2 text-sm text-neutral-600">
              Minimal 0,1 kg, kelipatan 0,1.
            </p>
          </div>

          {isMinChargeApplied && billedWeight !== null && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Ketentuan minimum charge {formatDecimal(STORE_INFO.minimumChargeKg)} kg
                berlaku. Berat ditagih menjadi {formatDecimal(billedWeight)} kg.
              </span>
            </div>
          )}

          {error && (
            <div
              id={errorId}
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </section>
    );
  },
);

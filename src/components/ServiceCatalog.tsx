/**
 * Menampilkan daftar paket layanan utama (FT-01) beserta tarif per kg, durasi pengerjaan, dan pilihan radio.
 */

import { Check } from 'lucide-react';
import type React from 'react';
import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface ServiceCatalogProps {
  selectedCode: ServiceCode;
  onSelect: (code: ServiceCode) => void;
}

export function ServiceCatalog({ selectedCode, onSelect }: ServiceCatalogProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft'
    ) {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + delta + MAIN_SERVICES.length) % MAIN_SERVICES.length;
      const nextService = MAIN_SERVICES[nextIndex];
      onSelect(nextService.code);
      const nextButton = event.currentTarget.parentElement?.children[
        nextIndex
      ] as HTMLButtonElement | undefined;
      nextButton?.focus();
    }
  };

  return (
    <section aria-labelledby="catalog-heading" className="space-y-3">
      <h2 id="catalog-heading" className="text-lg font-medium text-neutral-900">
        Pilih Layanan Utama
      </h2>

      <div role="radiogroup" aria-labelledby="catalog-heading" className="space-y-3">
        {MAIN_SERVICES.map((service, index) => {
          const isSelected = service.code === selectedCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(service.code)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-full min-h-[44px] text-left rounded-2xl p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                isSelected
                  ? 'bg-emerald-50 border border-emerald-700 ring-1 ring-emerald-700'
                  : 'bg-white border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-neutral-900">
                      {service.name}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">{service.description}</p>
                </div>

                <div className="flex items-start gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-base font-semibold text-neutral-900 tabular-nums">
                      {formatRupiah(service.pricePerKg)}
                      <span className="text-sm font-normal text-neutral-600">/kg</span>
                    </div>
                    <div className="text-sm text-neutral-600 tabular-nums">
                      Selesai {service.durationDays} hari
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="h-4 w-4" />}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

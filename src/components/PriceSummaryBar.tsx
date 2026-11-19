/**
 * Menampilkan ringkasan biaya secara langsung dan tombol kirim pesanan ke WhatsApp (FT-04 & FT-06).
 */

import { CheckCircle2, ExternalLink } from 'lucide-react';
import { ESTIMATE_DISCLAIMER } from '../config';
import type { EstimateResult } from '../lib/calculator';
import { formatDecimal, formatRupiah } from '../lib/format';

interface PriceSummaryBarProps {
  estimate: EstimateResult;
  isDelivery: boolean;
  isFragrance: boolean;
  lastWhatsAppUrl: string | null;
  onSubmit: () => void;
}

export function PriceSummaryBar({
  estimate,
  isDelivery,
  isFragrance,
  lastWhatsAppUrl,
  onSubmit,
}: PriceSummaryBarProps) {
  const billedWeightText =
    estimate.billedWeight !== null ? `${formatDecimal(estimate.billedWeight)} kg` : '-';

  return (
    <>
      {/* Panel ringkasan di sisi kanan untuk layar desktop */}
      <aside
        aria-label="Ringkasan biaya"
        className="hidden lg:block lg:sticky lg:top-8 bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] space-y-4"
      >
        <h2 className="text-lg font-medium text-neutral-900">Ringkasan Biaya</h2>

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-neutral-600">Layanan Utama</dt>
            <dd className="font-medium text-neutral-900 text-right">
              {estimate.serviceName}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="text-neutral-600">Berat Ditagih</dt>
            <dd className="font-medium text-neutral-900 tabular-nums">
              {billedWeightText}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="text-neutral-600">Biaya Layanan Utama</dt>
            <dd className="font-medium text-neutral-900 tabular-nums">
              {formatRupiah(estimate.mainCost)}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="text-neutral-600">
              Biaya Tambahan
              {(isDelivery || isFragrance) && (
                <span className="block text-sm text-neutral-500">
                  {[
                    isDelivery ? 'Antar-Jemput' : null,
                    isFragrance ? 'Pewangi Premium' : null,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              )}
            </dt>
            <dd className="font-medium text-neutral-900 tabular-nums">
              {formatRupiah(estimate.addonsTotal)}
            </dd>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex items-baseline justify-between gap-4">
            <dt className="text-base font-medium text-neutral-900">Total Estimasi</dt>
            <dd className="text-3xl font-semibold text-neutral-900 tabular-nums">
              {formatRupiah(estimate.totalEstimate)}
            </dd>
          </div>
        </dl>

        <p className="text-sm text-neutral-600">{ESTIMATE_DISCLAIMER}</p>

        <button
          type="button"
          onClick={onSubmit}
          className="w-full min-h-[44px] rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-3 text-base font-medium text-white transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Kirim ke WhatsApp
        </button>

        {lastWhatsAppUrl && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div className="space-y-1">
              <p>Tautan pesanan WhatsApp siap.</p>
              <a
                href={lastWhatsAppUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 font-medium underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Buka WhatsApp
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </aside>

      {/* Bar ringkas menempel di bawah layar untuk tampilan ponsel */}
      <div
        aria-label="Ringkasan biaya cepat"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-neutral-200 px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-2 text-sm text-neutral-600 tabular-nums">
            <span>
              Utama:{' '}
              <strong className="font-medium text-neutral-900">
                {formatRupiah(estimate.mainCost)}
              </strong>
            </span>
            <span>
              Tambahan:{' '}
              <strong className="font-medium text-neutral-900">
                {formatRupiah(estimate.addonsTotal)}
              </strong>
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="block text-sm text-neutral-600">Total Estimasi</span>
              <span className="block text-xl font-semibold text-neutral-900 tabular-nums leading-tight">
                {formatRupiah(estimate.totalEstimate)}
              </span>
            </div>

            <button
              type="button"
              onClick={onSubmit}
              className="min-h-[44px] shrink-0 whitespace-nowrap rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Kirim ke WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

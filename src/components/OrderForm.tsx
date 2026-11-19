/**
 * Menyediakan formulir data pemesan dengan alamat penjemputan kondisional dan validasi error (FT-05).
 */

import { AlertCircle } from 'lucide-react';
import type { RefObject } from 'react';
import type { ValidationErrors } from '../lib/whatsapp';

interface OrderFormProps {
  customerName: string;
  pickupAddress: string;
  specialNotes: string;
  isDelivery: boolean;
  errors: ValidationErrors;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
  onChangeName: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onChangeNotes: (value: string) => void;
}

export function OrderForm({
  customerName,
  pickupAddress,
  specialNotes,
  isDelivery,
  errors,
  nameInputRef,
  addressInputRef,
  onChangeName,
  onChangeAddress,
  onChangeNotes,
}: OrderFormProps) {
  return (
    <section aria-labelledby="customer-heading" className="space-y-3">
      <h2 id="customer-heading" className="text-lg font-medium text-neutral-900">
        Data Pemesan
      </h2>

      <div className="bg-white rounded-2xl p-4 sm:p-6 space-y-4">
        <div>
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Pemesan
          </label>
          <input
            ref={nameInputRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? 'customer-name-error' : undefined}
            className={`mt-2 w-full min-h-[44px] rounded-xl border bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
              errors.customerName ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {errors.customerName && (
            <div
              id="customer-name-error"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {isDelivery ? (
          <div>
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="pickup-address"
              name="pickupAddress"
              rows={2}
              autoComplete="street-address"
              value={pickupAddress}
              onChange={(e) => onChangeAddress(e.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, RT 02/RW 04"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress ? 'pickup-address-error' : undefined
              }
              className={`mt-2 w-full min-h-[44px] rounded-xl border bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                errors.pickupAddress ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            {errors.pickupAddress && (
              <div
                id="pickup-address-error"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="border-t border-neutral-200 pt-3 text-sm text-neutral-600">
            Pengantaran: Antar Sendiri ke Toko.
          </div>
        )}

        <div>
          <label
            htmlFor="special-notes"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus (opsional)
          </label>
          <textarea
            id="special-notes"
            name="specialNotes"
            rows={2}
            value={specialNotes}
            onChange={(e) => onChangeNotes(e.target.value)}
            placeholder="Contoh: Pisahkan pakaian putih"
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          />
        </div>
      </div>
    </section>
  );
}

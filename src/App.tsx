/**
 * Komponen utama LaundryCalc yang menyatukan katalog, input berat, add-on, formulir pemesan, dan ringkasan WhatsApp.
 */

import { CheckCircle2, ExternalLink } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { AddonSelector } from './components/AddonSelector';
import { OrderForm } from './components/OrderForm';
import { PriceSummaryBar } from './components/PriceSummaryBar';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WeightInput } from './components/WeightInput';
import {
  DEFAULT_SERVICE_CODE,
  ESTIMATE_DISCLAIMER,
  STORE_INFO,
  type ServiceCode,
} from './config';
import { calculateEstimate, parseWeightInput } from './lib/calculator';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  validateOrderForm,
  type ValidationErrors,
} from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] =
    useState<ServiceCode>(DEFAULT_SERVICE_CODE);
  const [weightRaw, setWeightRaw] = useState('');
  const [isDelivery, setIsDelivery] = useState(false);
  const [isFragrance, setIsFragrance] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const parsedWeight = useMemo(() => parseWeightInput(weightRaw), [weightRaw]);

  const estimate = useMemo(
    () =>
      calculateEstimate({
        serviceCode: selectedServiceCode,
        actualWeight: parsedWeight.valid ? parsedWeight.value : null,
        isDelivery,
        isFragrance,
      }),
    [selectedServiceCode, parsedWeight, isDelivery, isFragrance],
  );

  const handleWeightChange = (value: string) => {
    setWeightRaw(value);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
    if (lastWhatsAppUrl) {
      setLastWhatsAppUrl(null);
    }
  };

  const handleNameChange = (value: string) => {
    setCustomerName(value);
    if (errors.customerName) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
    if (lastWhatsAppUrl) {
      setLastWhatsAppUrl(null);
    }
  };

  const handleAddressChange = (value: string) => {
    setPickupAddress(value);
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
    if (lastWhatsAppUrl) {
      setLastWhatsAppUrl(null);
    }
  };

  const handleToggleDelivery = (checked: boolean) => {
    setIsDelivery(checked);
    if (!checked && errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
    if (lastWhatsAppUrl) {
      setLastWhatsAppUrl(null);
    }
  };

  const handleToggleFragrance = (checked: boolean) => {
    setIsFragrance(checked);
    if (lastWhatsAppUrl) {
      setLastWhatsAppUrl(null);
    }
  };

  const handleSubmit = () => {
    const result = validateOrderForm({
      serviceCode: selectedServiceCode,
      weightRaw,
      isDelivery,
      isFragrance,
      customerName,
      pickupAddress,
      specialNotes,
    });

    if (!result.isValid || !result.payload) {
      setErrors(result.errors);
      setLastWhatsAppUrl(null);

      if (result.errors.weight) {
        weightInputRef.current?.focus();
      } else if (result.errors.customerName) {
        nameInputRef.current?.focus();
      } else if (result.errors.pickupAddress) {
        addressInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const message = buildWhatsAppMessage(result.payload);
    const whatsappUrl = buildWhatsAppUrl(message);
    setLastWhatsAppUrl(whatsappUrl);

    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {STORE_INFO.name}
          </h1>
          <p className="mt-1 text-base text-neutral-600">
            Pilih layanan dan hitung estimasi biaya cucian Anda.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="space-y-8 lg:col-span-7">
            <ServiceCatalog
              selectedCode={selectedServiceCode}
              onSelect={(code) => {
                setSelectedServiceCode(code);
                if (lastWhatsAppUrl) {
                  setLastWhatsAppUrl(null);
                }
              }}
            />

            <WeightInput
              ref={weightInputRef}
              value={weightRaw}
              onChange={handleWeightChange}
              isMinChargeApplied={estimate.isMinChargeApplied}
              billedWeight={estimate.billedWeight}
              error={errors.weight}
            />

            <AddonSelector
              isDelivery={isDelivery}
              isFragrance={isFragrance}
              billedWeight={estimate.billedWeight}
              fragranceCost={estimate.fragranceCost}
              onToggleDelivery={handleToggleDelivery}
              onToggleFragrance={handleToggleFragrance}
            />

            <OrderForm
              customerName={customerName}
              pickupAddress={pickupAddress}
              specialNotes={specialNotes}
              isDelivery={isDelivery}
              errors={errors}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
              onChangeName={handleNameChange}
              onChangeAddress={handleAddressChange}
              onChangeNotes={(val) => {
                setSpecialNotes(val);
                if (lastWhatsAppUrl) {
                  setLastWhatsAppUrl(null);
                }
              }}
            />

            <div className="lg:hidden space-y-3">
              <p className="text-sm text-neutral-600">{ESTIMATE_DISCLAIMER}</p>

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
            </div>

            {/* Ruang pengaman agar konten terbawah tidak tertutup bar ringkasan di ponsel */}
            <div className="py-12 lg:hidden" aria-hidden="true" />
          </div>

          <div className="lg:col-span-5">
            <PriceSummaryBar
              estimate={estimate}
              isDelivery={isDelivery}
              isFragrance={isFragrance}
              lastWhatsAppUrl={lastWhatsAppUrl}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Menangani validasi formulir pemesanan dan pembuatan pesan serta tautan WhatsApp resmi.
 */

import { STORE_INFO, WHATSAPP_BASE_URL, type ServiceCode } from '../config';
import { calculateEstimate, parseWeightInput, type EstimateResult } from './calculator';
import { formatDecimal, formatRupiah } from './format';

export interface OrderFormInput {
  serviceCode: ServiceCode;
  weightRaw: string;
  isDelivery: boolean;
  isFragrance: boolean;
  customerName: string;
  pickupAddress: string;
  specialNotes: string;
}

export interface ValidationErrors {
  weight?: string;
  customerName?: string;
  pickupAddress?: string;
}

export interface ValidatedOrderPayload {
  customerName: string;
  pickupAddress: string;
  specialNotes: string;
  isDelivery: boolean;
  isFragrance: boolean;
  estimate: EstimateResult;
}

export function validateOrderForm(input: OrderFormInput): {
  isValid: boolean;
  errors: ValidationErrors;
  payload?: ValidatedOrderPayload;
} {
  const errors: ValidationErrors = {};

  const parsedWeight = parseWeightInput(input.weightRaw);
  if (!parsedWeight.valid || parsedWeight.value === null) {
    errors.weight = parsedWeight.error;
  }

  const trimmedName = input.customerName.trim();
  if (trimmedName === '') {
    errors.customerName = 'Masukkan nama lengkap pemesan, contoh Budi Santoso.';
  }

  const trimmedAddress = input.pickupAddress.trim();
  if (input.isDelivery && trimmedAddress === '') {
    errors.pickupAddress =
      'Masukkan alamat penjemputan lengkap, contoh Jl. Melati No. 12.';
  }

  const isValid =
    !errors.weight && !errors.customerName && !errors.pickupAddress;

  if (!isValid || parsedWeight.value === null) {
    return { isValid: false, errors };
  }

  const estimate = calculateEstimate({
    serviceCode: input.serviceCode,
    actualWeight: parsedWeight.value,
    isDelivery: input.isDelivery,
    isFragrance: input.isFragrance,
  });

  return {
    isValid: true,
    errors: {},
    payload: {
      customerName: trimmedName,
      pickupAddress: input.isDelivery ? trimmedAddress : 'Antar Sendiri ke Toko',
      specialNotes: input.specialNotes.trim() || '-',
      isDelivery: input.isDelivery,
      isFragrance: input.isFragrance,
      estimate,
    },
  };
}

export function buildWhatsAppMessage(order: ValidatedOrderPayload): string {
  const actualWeightText =
    order.estimate.actualWeight !== null
      ? formatDecimal(order.estimate.actualWeight)
      : '0';
  const billedWeightText =
    order.estimate.billedWeight !== null
      ? formatDecimal(order.estimate.billedWeight)
      : '0';

  const deliveryLine = order.isDelivery
    ? `Ya (+${formatRupiah(order.estimate.deliveryCost)})`
    : 'Tidak';
  const fragranceLine = order.isFragrance
    ? `Ya (+${formatRupiah(order.estimate.fragranceCost)})`
    : 'Tidak';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${order.customerName}`,
    `*Layanan Utama:* ${order.estimate.serviceName}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${fragranceLine}`,
    '',
    `*Alamat Penjemputan:* ${order.pickupAddress}`,
    `*Catatan Khusus:* ${order.specialNotes}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(order.estimate.totalEstimate)}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = STORE_INFO.whatsappNumber,
): string {
  return `${WHATSAPP_BASE_URL}${phoneNumber}?text=${encodeURIComponent(message)}`;
}

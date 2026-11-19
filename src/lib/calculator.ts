/**
 * Menyimpan seluruh rumus perhitungan berat ditagih, biaya layanan, dan validasi berat.
 */

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  WEIGHT_RULES,
  type ServiceCode,
} from '../config';

export interface ParsedWeight {
  valid: boolean;
  value: number | null;
  error?: string;
}

export interface EstimateInput {
  serviceCode: ServiceCode;
  actualWeight: number | null;
  isDelivery: boolean;
  isFragrance: boolean;
}

export interface EstimateResult {
  serviceName: string;
  servicePricePerKg: number;
  actualWeight: number | null;
  billedWeight: number | null;
  isMinChargeApplied: boolean;
  mainCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addonsTotal: number;
  totalEstimate: number;
}

export function parseWeightInput(raw: string): ParsedWeight {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return {
      valid: false,
      value: null,
      error: 'Masukkan perkiraan berat cucian dalam kg, contoh 3,5.',
    };
  }

  const normalized = trimmed.replace(',', '.');
  if (!/^-?\d*(\.\d+)?$/.test(normalized) || normalized === '.' || normalized === '-.') {
    return {
      valid: false,
      value: null,
      error: 'Masukkan angka berat yang valid, contoh 3,5.',
    };
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return {
      valid: false,
      value: null,
      error: 'Masukkan angka berat yang valid, contoh 3,5.',
    };
  }

  if (parsed < WEIGHT_RULES.minKg) {
    return {
      valid: false,
      value: null,
      error: 'Berat cucian harus minimal 0,1 kg, contoh 2,5.',
    };
  }

  const scaled = parsed * 10;
  if (Math.abs(Math.round(scaled) - scaled) > 1e-9) {
    return {
      valid: false,
      value: null,
      error: 'Gunakan kelipatan 0,1 kg maksimal satu angka desimal, contoh 2,3.',
    };
  }

  return {
    valid: true,
    value: Math.round(scaled) / 10,
  };
}

export function calculateBilledWeight(actualWeight: number): number {
  return Math.max(STORE_INFO.minimumChargeKg, actualWeight);
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const service =
    MAIN_SERVICES.find((item) => item.code === input.serviceCode) ?? MAIN_SERVICES[0];
  const deliveryAddon = ADD_ONS.find((item) => item.code === 'T01')!;
  const fragranceAddon = ADD_ONS.find((item) => item.code === 'T02')!;

  const deliveryCost = input.isDelivery ? deliveryAddon.price : 0;

  if (input.actualWeight === null || input.actualWeight < WEIGHT_RULES.minKg) {
    return {
      serviceName: service.name,
      servicePricePerKg: service.pricePerKg,
      actualWeight: null,
      billedWeight: null,
      isMinChargeApplied: false,
      mainCost: 0,
      deliveryCost,
      fragranceCost: 0,
      addonsTotal: deliveryCost,
      totalEstimate: deliveryCost,
    };
  }

  const billedWeight = calculateBilledWeight(input.actualWeight);
  const isMinChargeApplied = input.actualWeight < STORE_INFO.minimumChargeKg;
  const mainCost = Math.round(billedWeight * service.pricePerKg);
  const fragranceCost = input.isFragrance
    ? Math.round(billedWeight * fragranceAddon.price)
    : 0;
  const addonsTotal = deliveryCost + fragranceCost;
  const totalEstimate = mainCost + addonsTotal;

  return {
    serviceName: service.name,
    servicePricePerKg: service.pricePerKg,
    actualWeight: input.actualWeight,
    billedWeight,
    isMinChargeApplied,
    mainCost,
    deliveryCost,
    fragranceCost,
    addonsTotal,
    totalEstimate,
  };
}

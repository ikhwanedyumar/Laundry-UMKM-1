/**
 * Menyimpan seluruh data bisnis resmi dari PRD dan konfigurasi antarmuka aplikasi.
 */

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddonCode = 'T01' | 'T02';

export interface MainService {
  code: ServiceCode;
  name: string;
  pricePerKg: number;
  durationDays: number;
  description: string;
}

export interface AddonService {
  code: AddonCode;
  name: string;
  price: number;
  calculationType: 'flat' | 'per_billed_kg';
  notes: string;
}

export const STORE_INFO = {
  appName: 'LaundryCalc',
  name: 'Laundry UMKM',
  whatsappNumber: '6281234567890',
  pickupRadiusMaxKm: 5,
  minimumChargeKg: 3.0,
} as const;

export const WEIGHT_RULES = {
  minKg: 0.1,
  stepKg: 0.1,
} as const;

export const DEFAULT_SERVICE_CODE: ServiceCode = 'L01';

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    pricePerKg: 6000,
    durationDays: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    pricePerKg: 8000,
    durationDays: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    pricePerKg: 15000,
    durationDays: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddonService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculationType: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculationType: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const ESTIMATE_DISCLAIMER =
  'Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry.';

export const WHATSAPP_BASE_URL = 'https://wa.me/';

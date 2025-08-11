export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 15);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length <= 13) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 10)}-${digits.slice(10, 15)}`;
}

export function extractPhoneDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 15);
}

export function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function formatCNPJ(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 14);

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

export function extractCNPJDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 14);
}

export function validateCNPJ(cnpj: string) {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
}

export function formatTime(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
}

export function formatCEP(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
}
export function extractCEPDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 8);
}

export const formatDateInput = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

export function parseFieldValue(
  name: string,
  value: string,
  type: string,
  numericFields: string[] = []
): string | number {
  if (type === 'number' && value === '') return '';
  if (numericFields.includes(name)) return Number(value);
  return value;
}

export function parseCurrencyBRL(value: string): number {
  // Remove tudo que não for dígito
  const digits = value.replace(/\D/g, '');
  // Converte para centavos e depois para reais
  return Number(digits) / 100;
}

export function formatCurrencyBRL(value: number | string): string {
  const number = typeof value === 'string' ? parseCurrencyBRL(value) : value;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function parseLocalDate(str?: string): Date | null {
  if (!str) return null;
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateToISO(date: Date | null): string {
  return date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    : '';
}


export function formatDateToBR(date: Date | null): string {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function brDateToISO(dateStr: string) {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}T00:00:00.000Z`;
}

import { RoomTypeEnum } from '../types/Hotel';

export const roomTypeLabels: Record<RoomTypeEnum, string> = {
  Single: 'Solteiro',
  Double: 'Duplo',
  Suite: 'Suíte',
  Deluxe: 'Deluxe',
  Family: 'Família',
};

// Array para mapear índice numérico para enum
const roomTypeEnumValues: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];

export function getRoomTypeLabel(roomTypeName: string | RoomTypeEnum | number): string {
  let key: RoomTypeEnum | string = roomTypeName as RoomTypeEnum;
  // Se vier número, converte para enum
  if (typeof roomTypeName === 'number') {
    key = roomTypeEnumValues[roomTypeName] ?? String(roomTypeName);
  }
  return roomTypeLabels[key as RoomTypeEnum] || String(key);
}
export interface CountryData {
  code: string;
  name: string;
  ddi: string;
  flag: string;
  phoneLength: number[];
  format: (digits: string) => string;
}

// Generic formatters to reduce memory usage
const formatters = {
  // Brazilian format: (11) 99999-9999
  brazilian: (digits: string) => {
    const localDigits = digits.replace(/^55/, '');
    if (localDigits.length === 11) {
      return localDigits.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (localDigits.length === 10) {
      return localDigits.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (localDigits.length >= 7) {
      return localDigits.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    } else if (localDigits.length >= 6) {
      return localDigits.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (localDigits.length >= 3) {
      return localDigits.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (localDigits.length >= 1) {
      return localDigits.replace(/^(\d+)/, '($1');
    }
    return localDigits;
  },

  // US/Canada format: 555-123-4567
  northAmerican: (ddi: string) => (digits: string) => {
    const localDigits = digits.replace(new RegExp(`^${ddi.replace('+', '')}`), '');
    if (localDigits.length === 10) {
      return localDigits.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (localDigits.length >= 7) {
      return localDigits.replace(/^(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    } else if (localDigits.length >= 4) {
      return localDigits.replace(/^(\d{3})(\d+)/, '$1-$2');
    }
    return localDigits;
  },

  // European format: 1234 567 890
  european: (ddi: string) => (digits: string) => {
    const localDigits = digits.replace(new RegExp(`^${ddi.replace('+', '')}`), '');
    if (localDigits.length >= 9) {
      return localDigits.replace(/^(\d{2,4})(\d{3,4})(\d{3,4})/, '$1 $2 $3');
    } else if (localDigits.length >= 6) {
      return localDigits.replace(/^(\d{2,4})(\d+)/, '$1 $2');
    }
    return localDigits;
  },

  // Asian format: varies by country
  asian: (ddi: string) => (digits: string) => {
    const localDigits = digits.replace(new RegExp(`^${ddi.replace('+', '')}`), '');
    if (localDigits.length >= 10) {
      return localDigits.replace(/^(\d{2,3})(\d{4})(\d{4})/, '$1 $2 $3');
    } else if (localDigits.length >= 6) {
      return localDigits.replace(/^(\d{2,3})(\d+)/, '$1 $2');
    }
    return localDigits;
  },

  // Simple format for other countries
  simple: (ddi: string) => (digits: string) => {
    const localDigits = digits.replace(new RegExp(`^${ddi.replace('+', '')}`), '');
    if (localDigits.length >= 8) {
      return localDigits.replace(/^(\d{2,4})(\d+)/, '$1 $2');
    }
    return localDigits;
  }
};

// Most popular countries (loaded immediately)
export const popularCountries: CountryData[] = [
  { code: 'BR', name: '🇧🇷 Brasil', ddi: '+55', flag: '🇧🇷', phoneLength: [10, 11], format: formatters.brazilian },
  { code: 'US', name: '🇺🇸 Estados Unidos', ddi: '+1', flag: '🇺🇸', phoneLength: [10], format: formatters.northAmerican('+1') },
  { code: 'CA', name: '🇨🇦 Canadá', ddi: '+1', flag: '🇨🇦', phoneLength: [10], format: formatters.northAmerican('+1') },
  { code: 'AR', name: '🇦🇷 Argentina', ddi: '+54', flag: '🇦🇷', phoneLength: [10, 11], format: formatters.simple('+54') },
  { code: 'MX', name: '🇲🇽 México', ddi: '+52', flag: '🇲🇽', phoneLength: [10], format: formatters.simple('+52') },
  { code: 'GB', name: '🇬🇧 Reino Unido', ddi: '+44', flag: '🇬🇧', phoneLength: [10, 11], format: formatters.european('+44') },
  { code: 'FR', name: '🇫🇷 França', ddi: '+33', flag: '🇫🇷', phoneLength: [9], format: formatters.european('+33') },
  { code: 'DE', name: '🇩🇪 Alemanha', ddi: '+49', flag: '🇩🇪', phoneLength: [10, 11, 12], format: formatters.european('+49') },
  { code: 'IT', name: '🇮🇹 Itália', ddi: '+39', flag: '🇮🇹', phoneLength: [9, 10, 11], format: formatters.european('+39') },
  { code: 'ES', name: '🇪🇸 Espanha', ddi: '+34', flag: '🇪🇸', phoneLength: [9], format: formatters.european('+34') },
];

// All other countries (lazy loaded)
let allCountriesCache: CountryData[] | null = null;

export const getAllCountries = (): CountryData[] => {
  if (allCountriesCache) return allCountriesCache;

  const otherCountries: CountryData[] = [
    // Europe
    { code: 'PT', name: '🇵🇹 Portugal', ddi: '+351', flag: '🇵🇹', phoneLength: [9], format: formatters.european('+351') },
    { code: 'NL', name: '🇳🇱 Holanda', ddi: '+31', flag: '🇳🇱', phoneLength: [9], format: formatters.european('+31') },
    { code: 'BE', name: '🇧🇪 Bélgica', ddi: '+32', flag: '🇧🇪', phoneLength: [9], format: formatters.european('+32') },
    { code: 'CH', name: '🇨🇭 Suíça', ddi: '+41', flag: '🇨🇭', phoneLength: [9], format: formatters.european('+41') },
    { code: 'AT', name: '🇦🇹 Áustria', ddi: '+43', flag: '🇦🇹', phoneLength: [10, 11], format: formatters.european('+43') },
    { code: 'SE', name: '🇸🇪 Suécia', ddi: '+46', flag: '🇸🇪', phoneLength: [9], format: formatters.european('+46') },
    { code: 'NO', name: '🇳🇴 Noruega', ddi: '+47', flag: '🇳🇴', phoneLength: [8], format: formatters.european('+47') },
    { code: 'DK', name: '🇩🇰 Dinamarca', ddi: '+45', flag: '🇩🇰', phoneLength: [8], format: formatters.european('+45') },
    { code: 'FI', name: '🇫🇮 Finlândia', ddi: '+358', flag: '🇫🇮', phoneLength: [9], format: formatters.european('+358') },
    { code: 'PL', name: '🇵🇱 Polônia', ddi: '+48', flag: '🇵🇱', phoneLength: [9], format: formatters.european('+48') },
    { code: 'CZ', name: '🇨🇿 República Tcheca', ddi: '+420', flag: '🇨🇿', phoneLength: [9], format: formatters.european('+420') },
    { code: 'HU', name: '🇭🇺 Hungria', ddi: '+36', flag: '🇭🇺', phoneLength: [9], format: formatters.european('+36') },
    { code: 'GR', name: '🇬🇷 Grécia', ddi: '+30', flag: '🇬🇷', phoneLength: [10], format: formatters.european('+30') },
    { code: 'IE', name: '🇮🇪 Irlanda', ddi: '+353', flag: '🇮🇪', phoneLength: [9], format: formatters.european('+353') },
    { code: 'RU', name: '🇷🇺 Rússia', ddi: '+7', flag: '🇷🇺', phoneLength: [10], format: formatters.european('+7') },
    
    // Asia
    { code: 'CN', name: '🇨🇳 China', ddi: '+86', flag: '🇨🇳', phoneLength: [11], format: formatters.asian('+86') },
    { code: 'JP', name: '🇯🇵 Japão', ddi: '+81', flag: '🇯🇵', phoneLength: [10, 11], format: formatters.asian('+81') },
    { code: 'KR', name: '🇰🇷 Coreia do Sul', ddi: '+82', flag: '🇰🇷', phoneLength: [10, 11], format: formatters.asian('+82') },
    { code: 'IN', name: '🇮🇳 Índia', ddi: '+91', flag: '🇮🇳', phoneLength: [10], format: formatters.asian('+91') },
    { code: 'ID', name: '🇮🇩 Indonésia', ddi: '+62', flag: '🇮🇩', phoneLength: [9, 10, 11], format: formatters.asian('+62') },
    { code: 'TH', name: '🇹🇭 Tailândia', ddi: '+66', flag: '🇹🇭', phoneLength: [9], format: formatters.asian('+66') },
    { code: 'VN', name: '🇻🇳 Vietnã', ddi: '+84', flag: '🇻🇳', phoneLength: [9, 10], format: formatters.asian('+84') },
    { code: 'PH', name: '🇵🇭 Filipinas', ddi: '+63', flag: '🇵🇭', phoneLength: [10], format: formatters.asian('+63') },
    { code: 'MY', name: '🇲🇾 Malásia', ddi: '+60', flag: '🇲🇾', phoneLength: [9, 10], format: formatters.asian('+60') },
    { code: 'SG', name: '🇸🇬 Singapura', ddi: '+65', flag: '🇸🇬', phoneLength: [8], format: formatters.asian('+65') },
    
    // Middle East
    { code: 'AE', name: '🇦🇪 Emirados Árabes', ddi: '+971', flag: '🇦🇪', phoneLength: [9], format: formatters.simple('+971') },
    { code: 'SA', name: '🇸🇦 Arábia Saudita', ddi: '+966', flag: '🇸🇦', phoneLength: [9], format: formatters.simple('+966') },
    { code: 'IL', name: '🇮🇱 Israel', ddi: '+972', flag: '🇮🇱', phoneLength: [9], format: formatters.simple('+972') },
    { code: 'TR', name: '🇹🇷 Turquia', ddi: '+90', flag: '🇹🇷', phoneLength: [10], format: formatters.simple('+90') },
    
    // Africa
    { code: 'ZA', name: '🇿🇦 África do Sul', ddi: '+27', flag: '🇿🇦', phoneLength: [9], format: formatters.simple('+27') },
    { code: 'EG', name: '🇪🇬 Egito', ddi: '+20', flag: '🇪🇬', phoneLength: [10], format: formatters.simple('+20') },
    { code: 'NG', name: '🇳🇬 Nigéria', ddi: '+234', flag: '🇳🇬', phoneLength: [10], format: formatters.simple('+234') },
    
    // Oceania
    { code: 'AU', name: '🇦🇺 Austrália', ddi: '+61', flag: '🇦🇺', phoneLength: [9], format: formatters.simple('+61') },
    { code: 'NZ', name: '🇳🇿 Nova Zelândia', ddi: '+64', flag: '🇳🇿', phoneLength: [8, 9], format: formatters.simple('+64') },
    
    // Latin America
    { code: 'CL', name: '🇨🇱 Chile', ddi: '+56', flag: '🇨🇱', phoneLength: [9], format: formatters.simple('+56') },
    { code: 'CO', name: '🇨🇴 Colômbia', ddi: '+57', flag: '🇨🇴', phoneLength: [10], format: formatters.simple('+57') },
    { code: 'PE', name: '🇵🇪 Peru', ddi: '+51', flag: '🇵🇪', phoneLength: [9], format: formatters.simple('+51') },
    { code: 'VE', name: '🇻🇪 Venezuela', ddi: '+58', flag: '🇻🇪', phoneLength: [10], format: formatters.simple('+58') },
    { code: 'UY', name: '🇺🇾 Uruguai', ddi: '+598', flag: '🇺🇾', phoneLength: [8], format: formatters.simple('+598') },
    { code: 'PY', name: '🇵🇾 Paraguai', ddi: '+595', flag: '🇵🇾', phoneLength: [9], format: formatters.simple('+595') },
    { code: 'BO', name: '🇧🇴 Bolívia', ddi: '+591', flag: '🇧🇴', phoneLength: [8], format: formatters.simple('+591') },
    { code: 'EC', name: '🇪🇨 Equador', ddi: '+593', flag: '🇪🇨', phoneLength: [9], format: formatters.simple('+593') },
    { code: 'CR', name: '🇨🇷 Costa Rica', ddi: '+506', flag: '🇨🇷', phoneLength: [8], format: formatters.simple('+506') },
    { code: 'PA', name: '🇵🇦 Panamá', ddi: '+507', flag: '🇵🇦', phoneLength: [8], format: formatters.simple('+507') },
    { code: 'GT', name: '🇬🇹 Guatemala', ddi: '+502', flag: '🇬🇹', phoneLength: [8], format: formatters.simple('+502') },
    { code: 'HN', name: '🇭🇳 Honduras', ddi: '+504', flag: '🇭🇳', phoneLength: [8], format: formatters.simple('+504') },
    { code: 'NI', name: '🇳🇮 Nicarágua', ddi: '+505', flag: '🇳🇮', phoneLength: [8], format: formatters.simple('+505') },
    { code: 'SV', name: '🇸🇻 El Salvador', ddi: '+503', flag: '🇸🇻', phoneLength: [8], format: formatters.simple('+503') },
    { code: 'CU', name: '🇨🇺 Cuba', ddi: '+53', flag: '🇨🇺', phoneLength: [8], format: formatters.simple('+53') },
    { code: 'DO', name: '🇩🇴 República Dominicana', ddi: '+1809', flag: '🇩🇴', phoneLength: [10], format: formatters.northAmerican('+1809') },
    { code: 'JM', name: '🇯🇲 Jamaica', ddi: '+1876', flag: '🇯🇲', phoneLength: [10], format: formatters.northAmerican('+1876') },
  ];

  allCountriesCache = [...popularCountries, ...otherCountries];
  return allCountriesCache;
};

// Fast lookup maps (created on demand)
let ddiMap: Map<string, CountryData> | null = null;
let codeMap: Map<string, CountryData> | null = null;

const createMaps = () => {
  if (!ddiMap || !codeMap) {
    const allCountries = getAllCountries();
    ddiMap = new Map(allCountries.map(country => [country.ddi, country]));
    codeMap = new Map(allCountries.map(country => [country.code, country]));
  }
};

export const getCountryByDDI = (ddi: string): CountryData | undefined => {
  createMaps();
  return ddiMap!.get(ddi);
};

export const getCountryByCode = (code: string): CountryData | undefined => {
  createMaps();
  return codeMap!.get(code);
};

// For the dropdown, return popular countries first, then all others
export const getCountriesForDropdown = (): CountryData[] => {
  return getAllCountries();
};

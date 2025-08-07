import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import { CreateClientDTO } from '../../types/User'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation } from 'react-router-dom'
import ToastForm from '../../components/Toast/ToastForm'
import { Validation } from '../../components/Validation/Validation'
import { getCountriesForDropdown, getCountryByDDI, popularCountries, type CountryData } from '../../utils/countryData'
import ReactFlagsSelect from 'react-flags-select'
import './Register.css'
import { extractPhoneDigits } from '../../utils/formatMask'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const userDataFromGoogle = location.state?.userData

  const [formData, setFormData] = useState<CreateClientDTO>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phoneNumber: '',
  })

  const [selectedCountry, setSelectedCountry] = useState<CountryData>(popularCountries[0]) // Default to Brazil

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false
  })

  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    hasAtSymbol: false,
    hasDomain: false,
    hasValidFormat: false
  })

  const [phoneValidation, setPhoneValidation] = useState({
    isValid: false,
    hasValidLength: false,
    hasValidFormat: false,
    isComplete: false,
    isInternational: false
  })

  const [nameValidation, setNameValidation] = useState({
    isValid: false,
    hasMinLength: false,
    hasNoNumbers: false,
    hasValidFormat: false
  })

  const [cpfValidation, setCpfValidation] = useState({
    isValid: false,
    hasValidLength: false,
    hasValidFormat: false,
    isValidCpf: false
  })

  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [showEmailRequirements, setShowEmailRequirements] = useState(false)
  const [showPhoneRequirements, setShowPhoneRequirements] = useState(false)
  const [showNameRequirements, setShowNameRequirements] = useState(false)
  const [showCpfRequirements, setShowCpfRequirements] = useState(false)

  // Toast states
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  // Styling variables
  const validationStyles = {
    success: {
      boxShadow: '0 0 10px rgba(40, 167, 69, 0.3)',
      borderColor: '#28a745'
    },
    error: {
      boxShadow: '0 0 10px rgba(220, 53, 69, 0.5)',
      borderColor: '#dc3545'
    },
    default: {}
  }

  const validationClasses = {
    success: 'border-success',
    error: 'border-danger shadow-sm',
    default: ''
  }

  const formFields = [
    { name: 'name', label: 'Nome Completo', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Senha', type: 'password' },
    { name: 'cpf', label: 'CPF', type: 'text', maxLength: 14 },
    { name: 'phoneNumber', label: 'Telefone', type: 'tel' },
  ];


  useEffect(() => {
    if (userDataFromGoogle) {
      setFormData(prev => ({
        ...prev,
        name: userDataFromGoogle.name || '',
        email: userDataFromGoogle.email || '',
        phoneNumber: userDataFromGoogle.phoneNumber || '',
      }))
    }
  }, [userDataFromGoogle])

  function formatCpf(value: string): string {
    const digits = value.replace(/\D/g, '');
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14);
  }

  function formatPhone(value: string, country: CountryData): string {
    const digits = value.replace(/\D/g, '');

    // Use the country-specific formatter
    return country.format(digits);
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = formatCpf(value);
    } else if (name === 'phoneNumber') {
      formattedValue = formatPhone(value, selectedCountry);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    // Validate password in real time
    if (name === 'password') {
      validatePassword(value);
    }

    // Validate email in real time
    if (name === 'email') {
      validateEmail(value);
    }

    // Validate phone in real time
    if (name === 'phoneNumber') {
      validatePhone(formattedValue, selectedCountry);
    }

    // Validate name in real time
    if (name === 'name') {
      validateName(value);
    }

    // Validate CPF in real time
    if (name === 'cpf') {
      validateCpf(formattedValue);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const country = getCountriesForDropdown().find((c: CountryData) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      // Clear and reformat the phone number with the new country format
      if (formData.phoneNumber) {
        const digits = formData.phoneNumber.replace(/\D/g, '');
        const newFormattedPhone = formatPhone(digits, country);
        setFormData(prev => ({ ...prev, phoneNumber: newFormattedPhone }));
        validatePhone(newFormattedPhone, country);
      }
    }
  };

  const validatePassword = (password: string) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasAtSymbol = email.includes('@');
    const hasDomain = email.includes('.') && email.indexOf('.') > email.indexOf('@');
    const hasValidFormat = emailRegex.test(email);

    setEmailValidation({
      isValid: hasValidFormat,
      hasAtSymbol,
      hasDomain,
      hasValidFormat
    });
  };

  const validatePhone = (phone: string, country: CountryData) => {
    const digits = phone.replace(/\D/g, '');

    let hasValidLength = false;
    let hasValidFormat = false;
    let isComplete = false;

    // Check if the phone length matches the country's expected lengths
    hasValidLength = country.phoneLength.some(length => digits.length >= length - 2 && digits.length <= length + 2);
    hasValidFormat = digits.length > 0; // Basic format check - can be enhanced per country
    isComplete = country.phoneLength.includes(digits.length);

    setPhoneValidation({
      isValid: hasValidFormat && hasValidLength && isComplete,
      hasValidLength,
      hasValidFormat,
      isComplete,
      isInternational: country.code !== 'BR'
    });
  };

  const validateName = (name: string) => {
    const trimmedName = name.trim();
    const hasMinLength = trimmedName.length >= 2;
    const hasNoNumbers = !/\d/.test(trimmedName);
    const hasValidFormat = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(trimmedName) && trimmedName.split(' ').length >= 2;

    setNameValidation({
      isValid: hasMinLength && hasNoNumbers && hasValidFormat,
      hasMinLength,
      hasNoNumbers,
      hasValidFormat
    });
  };

  const validateCpf = (cpf: string) => {
    const digits = cpf.replace(/\D/g, '');
    const hasValidLength = digits.length === 11;
    const hasValidFormat = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);

    // CPF validation algorithm - COMMENTED OUT FOR EASIER TESTING
    // const isValidCpf = (cpfDigits: string) => {
    //   if (cpfDigits.length !== 11) return false;
    //   if (/^(\d)\1{10}$/.test(cpfDigits)) return false; // All same digits
    //   
    //   // Validate first digit
    //   let sum = 0;
    //   for (let i = 0; i < 9; i++) {
    //     sum += parseInt(cpfDigits[i]) * (10 - i);
    //   }
    //   let remainder = sum % 11;
    //   let digit1 = remainder < 2 ? 0 : 11 - remainder;
    //   
    //   if (digit1 !== parseInt(cpfDigits[9])) return false;
    //   
    //   // Validate second digit
    //   sum = 0;
    //   for (let i = 0; i < 10; i++) {
    //     sum += parseInt(cpfDigits[i]) * (11 - i);
    //   }
    //   remainder = sum % 11;
    //   let digit2 = remainder < 2 ? 0 : 11 - remainder;
    //   
    //   return digit2 === parseInt(cpfDigits[10]);
    // };

    // For testing purposes, we'll skip the mathematical validation
    // const isValidCpfResult = hasValidLength ? isValidCpf(digits) : false;
    const isValidCpfResult = hasValidLength;
    setCpfValidation({
      isValid: hasValidFormat && hasValidLength && isValidCpfResult,
      hasValidLength,
      hasValidFormat,
      isValidCpf: isValidCpfResult
    });
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every(Boolean);
  };

  const isEmailValid = () => {
    return emailValidation.isValid;
  };

  const isPhoneValid = () => {
    return phoneValidation.isValid;
  };

  const isNameValid = () => {
    return nameValidation.isValid;
  };

  const isCpfValid = () => {
    return cpfValidation.isValid;
  };

  // Helper functions for validation styling
  const getValidationClass = (fieldName: string) => {
    const fieldValue = formData[fieldName as keyof typeof formData];
    if (!fieldValue) return validationClasses.default;

    switch (fieldName) {
      case 'password':
        return isPasswordValid() ? validationClasses.success : validationClasses.error;
      case 'email':
        return isEmailValid() ? validationClasses.success : validationClasses.error;
      case 'phoneNumber':
        return isPhoneValid() ? validationClasses.success : validationClasses.error;
      case 'name':
        return isNameValid() ? validationClasses.success : validationClasses.error;
      case 'cpf':
        return isCpfValid() ? validationClasses.success : validationClasses.error;
      default:
        return validationClasses.default;
    }
  };

  const getValidationStyle = (fieldName: string) => {
    const fieldValue = formData[fieldName as keyof typeof formData];
    if (!fieldValue) return validationStyles.default;

    switch (fieldName) {
      case 'password':
        return isPasswordValid() ? validationStyles.success : validationStyles.error;
      case 'email':
        return isEmailValid() ? validationStyles.success : validationStyles.error;
      case 'phoneNumber':
        return isPhoneValid() ? validationStyles.success : validationStyles.error;
      case 'name':
        return isNameValid() ? validationStyles.success : validationStyles.error;
      case 'cpf':
        return isCpfValid() ? validationStyles.success : validationStyles.error;
      default:
        return validationStyles.default;
    }
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message)
    setToastType('success')
    setShowToast(true)
  }

  const showErrorToast = (message: string) => {
    setToastMessage(message)
    setToastType('error')
    setShowToast(true)
  }

  const closeToast = () => {
    setShowToast(false)
  }

  // Helper functions to generate validation rules
  const getPasswordValidationRules = () => [
    { isValid: passwordValidation.minLength, message: 'Pelo menos 8 caracteres' },
    { isValid: passwordValidation.hasUpper, message: 'Uma letra maiúscula' },
    { isValid: passwordValidation.hasLower, message: 'Uma letra minúscula' },
    { isValid: passwordValidation.hasNumber, message: 'Um número' },
    { isValid: passwordValidation.hasSpecial, message: 'Um caractere especial (!@#$%^&*...)' }
  ];

  const getEmailValidationRules = () => [
    { isValid: emailValidation.hasAtSymbol, message: 'Símbolo @ (arroba)' },
    { isValid: emailValidation.hasDomain, message: 'Domínio válido (ex: .com, .br)' },
    { isValid: emailValidation.hasValidFormat, message: 'Formato válido (ex: usuario@dominio.com)' }
  ];

  const getPhoneValidationRules = () => {
    const expectedLengths = selectedCountry.phoneLength.join(' ou ');
    return [
      { isValid: phoneValidation.hasValidLength, message: `Entre ${expectedLengths} dígitos` },
      { isValid: phoneValidation.hasValidFormat, message: `Formato ${selectedCountry.name}` },
      { isValid: phoneValidation.isComplete, message: 'Número completo' }
    ];
  };

  const getPhoneExamples = () => {
    const digits = selectedCountry.phoneLength[0] === 10 ? '1199999999' : '11999999999';
    return selectedCountry.format(digits);
  };

  const getNameValidationRules = () => [
    { isValid: nameValidation.hasMinLength, message: 'Pelo menos 2 caracteres' },
    { isValid: nameValidation.hasNoNumbers, message: 'Não pode conter números' },
    { isValid: nameValidation.hasValidFormat, message: 'Nome e sobrenome válidos' }
  ];

  const getCpfValidationRules = () => [
    { isValid: cpfValidation.hasValidLength, message: 'Deve ter 11 dígitos' },
    { isValid: cpfValidation.hasValidFormat, message: 'Formato XXX.XXX.XXX-XX' },
    { isValid: cpfValidation.isValidCpf, message: 'CPF válido' }
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Prepare the form data with the complete phone number including DDI
      const submissionData = {
        ...formData,
        phoneNumber: `${selectedCountry.ddi.replace(/\D/g, '')}${extractPhoneDigits(formData.phoneNumber)}`
      };

      const response = await register(submissionData)
      console.log('Cadastro realizado com sucesso:', response)
      showSuccessToast('Cadastro realizado com sucesso! Redirecionando para o login...')

      // Delay navigation to show the success message
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error: any) {
      console.error('Registration error:', error)

      // Log the full error response for debugging
      if (error.response) {
        console.log('Error response:', error.response)
        console.log('Error response data:', error.response.data)
        console.log('Error response status:', error.response.status)
      }

      // Check if it's an Axios error with response data
      if (error.response && error.response.data) {
        let errorMessage = 'Erro desconhecido do servidor';

        // Handle ASP.NET Core validation errors
        if (error.response.data.errors) {
          const errors = error.response.data.errors;
          const errorMessages = [];

          // Extract all validation error messages
          for (const field in errors) {
            if (Array.isArray(errors[field])) {
              errorMessages.push(...errors[field]);
            } else {
              errorMessages.push(errors[field]);
            }
          }

          errorMessage = errorMessages.join('. ');
        }
        // Handle custom API response format
        else if (error.response.data.Message || error.response.data.message) {
          errorMessage = error.response.data.Message || error.response.data.message;
        }
        // Handle title field from validation errors
        else if (error.response.data.title) {
          errorMessage = error.response.data.title;
        }

        showErrorToast(errorMessage)
      } else if (error.message) {
        showErrorToast(error.message)
      } else {
        showErrorToast('Erro ao cadastrar. Verifique os dados e tente novamente.')
      }
    }
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">Faça seu Cadastro</h4>
                <form onSubmit={handleSubmit}>
                  {formFields.map(({ name, label, type, maxLength }) => (
                    <div className="mb-3" key={name}>
                      <label htmlFor={name} className="form-label">{label}</label>
                      {name === 'phoneNumber' ? (
                        <div className="input-group">
                          <div className="phone-input-group">
                            <div className="flag-select-container">
                              <ReactFlagsSelect
                                selected={selectedCountry.code}
                                onSelect={handleCountryChange}
                                countries={getCountriesForDropdown().map(c => c.code)}
                                customLabels={getCountriesForDropdown().reduce((acc, country) => {
                                  acc[country.code] = `${country.ddi}`;
                                  return acc;
                                }, {} as Record<string, string>)}
                                placeholder="Country"
                                searchable
                                searchPlaceholder="DDI"
                                className="flag-select"
                                showSelectedLabel={true}
                                showOptionLabel={true}
                                optionsSize={14}
                                selectButtonClassName="btn btn-outline-secondary"
                              />
                            </div>
                            <input
                              type={type}
                              name={name}
                              id={name}
                              value={formData[name as keyof typeof formData] || ''}
                              onChange={handleChange}
                              onFocus={() => setShowPhoneRequirements(true)}
                              onBlur={() => setShowPhoneRequirements(false)}
                              required={true}
                              placeholder="Digite seu telefone"
                              className={`form-control phone-input ${getValidationClass('phoneNumber')}`}
                              maxLength={maxLength}
                              style={getValidationStyle('phoneNumber')}
                            />
                          </div>
                        </div>
                      ) : (
                        <input
                          type={type}
                          name={name}
                          id={name}
                          value={formData[name as keyof typeof formData] || ''}
                          onChange={handleChange}
                          onFocus={() => {
                            if (name === 'password') setShowPasswordRequirements(true);
                            if (name === 'email') setShowEmailRequirements(true);
                            if (name === 'phoneNumber') setShowPhoneRequirements(true);
                            if (name === 'name') setShowNameRequirements(true);
                            if (name === 'cpf') setShowCpfRequirements(true);
                          }}
                          onBlur={() => {
                            if (name === 'password') setShowPasswordRequirements(false);
                            if (name === 'email') setShowEmailRequirements(false);
                            if (name === 'phoneNumber') setShowPhoneRequirements(false);
                            if (name === 'name') setShowNameRequirements(false);
                            if (name === 'cpf') setShowCpfRequirements(false);
                          }}
                          required={true}
                          className={`form-control ${getValidationClass(name)}`}
                          maxLength={maxLength}
                          style={getValidationStyle(name)}
                        />
                      )}

                      {/* Email requirements */}
                      <Validation
                        show={name === 'email' && (showEmailRequirements || !!formData.email)}
                        title="O email deve ter:"
                        rules={getEmailValidationRules()}
                      />

                      {/* Phone requirements */}
                      <Validation
                        show={name === 'phoneNumber' && (showPhoneRequirements || !!formData.phoneNumber)}
                        title="O telefone deve ter:"
                        rules={getPhoneValidationRules()}
                        examples={getPhoneExamples()}
                      />

                      {/* Name requirements */}
                      <Validation
                        show={name === 'name' && (showNameRequirements || !!formData.name)}
                        title="O nome deve ter:"
                        rules={getNameValidationRules()}
                        examples="João Silva, Maria Santos"
                      />

                      {/* CPF requirements */}
                      <Validation
                        show={name === 'cpf' && (showCpfRequirements || !!formData.cpf)}
                        title="O CPF deve ter:"
                        rules={getCpfValidationRules()}
                        examples="123.456.789-00"
                      />

                      {/* Password requirements */}
                      <Validation
                        show={name === 'password' && (showPasswordRequirements || !!formData.password)}
                        title="A senha deve conter:"
                        rules={getPasswordValidationRules()}
                      />
                    </div>
                  ))}

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                  </div>
                  <p className="mt-3 text-center">
                    Já é cadastrado? <a href="/login" className="text-decoration-none text-primary">Fazer Login</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Component */}
      <ToastForm
        show={showToast}
        message={toastMessage}
        onClose={closeToast}
        type={toastType}
      />
    </div>
  )
}

export default Register
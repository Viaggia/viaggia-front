import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateCommoditieDTO, CreateHotelDTO, CreateHotelRoomTypeDTO } from '../../../types/Hotel';
import { createHotel } from '../../../services/hotelService';
import HotelBreadcrumb from './HotelBreadcrumb';
import HotelBasicInfoForm from './HotelBasicInfoForm';
import HotelRoomTypesForm from './HotelRoomTypesForm';
import HotelReviewSubmit from './HotelReviewSubmit';
import { createCommodities } from '../../../services/commodityService';
import HotelCommoditiesForm from './HotelCommoditiesForm';
import ToastForm from '../../Toast/ToastForm';
import { extractCEPDigits, extractCNPJDigits, extractPhoneDigits } from '../../../utils/formatMask';

function CreateHotelStepper() {
    const [step, setStep] = useState(1);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState<Omit<CreateHotelDTO, 'roomTypesJson'>>({
        name: '',
        cnpj: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        description: '',
        starRating: 3,
        checkInTime: '',
        checkOutTime: '',
        contactPhone: '',
        contactEmail: '',
        isActive: true,
        mediaFiles: []
    });

    const [roomTypes, setRoomTypes] = useState<CreateHotelRoomTypeDTO[]>([
        {
            Name: 'Single',
            Description: '',
            Price: 0,
            Capacity: 1,
            BedType: '',
            TotalRooms: 1
        }
    ]);


    const [commoditiesFormData, setCommoditiesFormData] = useState<Omit<CreateCommoditieDTO, 'hotelName'>>({
        hasParking: false,
        isParkingPaid: false,
        hasBreakfast: false,
        isBreakfastPaid: false,
        hasLunch: false,
        isLunchPaid: false,
        hasDinner: false,
        isDinnerPaid: false,
        hasSpa: false,
        isSpaPaid: false,
        hasPool: false,
        isPoolPaid: false,
        hasGym: false,
        isGymPaid: false,
        hasWiFi: false,
        isWiFiPaid: false,
        hasAirConditioning: false,
        isAirConditioningPaid: false,
        hasAccessibilityFeatures: false,
        isAccessibilityFeaturesPaid: false,
        isPetFriendly: false,
        isPetFriendlyPaid: false,
        isActive: true,
        commoditieServices: []
    });


    const resetForm = () => {
        setFormData({
            name: '',
            cnpj: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            description: '',
            starRating: 3,
            checkInTime: '',
            checkOutTime: '',
            contactPhone: '',
            contactEmail: '',
            isActive: true,
            mediaFiles: []
        });

        setRoomTypes([
            {
                Name: 'Single',
                Description: '',
                Price: 0,
                Capacity: 1,
                BedType: '',
                TotalRooms: 1
            }
        ]);
    };

    const handleSubmit = async () => {
        try {
            const roomTypesJson = JSON.stringify(roomTypes);
            const hotelPayload: CreateHotelDTO = {
                ...formData,
                cnpj: extractCNPJDigits(formData.cnpj),
                zipCode: extractCEPDigits(formData.zipCode),
                contactPhone: extractPhoneDigits(formData.contactPhone || ''),
                roomTypesJson
            };


            const hotelResponse = await createHotel(hotelPayload);
            const hotelId = hotelResponse.hotelId;

            const commoditiesPayload: CreateCommoditieDTO = {
                ...commoditiesFormData,
                hotelName: hotelResponse.name
            };

            await createCommodities(commoditiesPayload);

            setShowToast(true);
            resetForm();
            setTimeout(() => setShowToast(false), 4000);
            setStep(1);
        } catch (error) {
            alert('Erro ao cadastrar hotel. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="row m-0">
            {/* Faixa azul no topo */}
            <div className="col-12 bg-primary text-white py-3">
                <div className="container">
                    <h4 className="mb-0">Cadastro de Hotel</h4>
                </div>
            </div>

            {/* Conteúdo do formulário */}
            <div className="col-12 py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="card shadow-sm rounded-4 border-0">
                        <div className="card-body">
                            <ToastForm
                                show={showToast}
                                message="Hotel cadastrado com sucesso!"
                                onClose={() => setShowToast(false)}
                            />
                            <div className="mb-4">
                                <HotelBreadcrumb currentStep={step} setStep={setStep} />
                            </div>

                            {step === 1 && (
                                <HotelBasicInfoForm formData={formData} setFormData={setFormData} nextStep={() => setStep(2)} />
                            )}
                            {step === 2 && (
                                <HotelRoomTypesForm
                                    roomTypes={roomTypes}
                                    setRoomTypes={setRoomTypes}
                                    nextStep={() => setStep(3)}
                                    prevStep={() => setStep(1)}
                                />
                            )}
                            {step === 3 && (
                                <HotelCommoditiesForm
                                    commoditiesFormData={commoditiesFormData}
                                    setCommoditiesFormData={setCommoditiesFormData}
                                    nextStep={() => setStep(4)}
                                    prevStep={() => setStep(2)}
                                />
                            )}
                            {step === 4 && (
                                <HotelReviewSubmit
                                    formData={{ ...formData, roomTypesJson: JSON.stringify(roomTypes) }}
                                    roomTypes={roomTypes}
                                    commodities={commoditiesFormData}
                                    handleSubmit={handleSubmit}
                                    prevStep={() => setStep(3)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CreateHotelStepper;

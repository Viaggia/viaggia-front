import { useState } from 'react';
import { CreateCommodityDTO, CreateHotelDTO, CreateHotelRoomTypeDTO } from '../../../types/Hotel';
import { createHotel } from '../../../services/hotelService';
import HotelBreadcrumb from './HotelBreadcrumb';
import HotelBasicInfoForm from './HotelBasicInfoForm';
import HotelRoomTypesForm from './HotelRoomTypesForm';
import HotelReviewSubmit from './HotelReviewSubmit';
import { createCommodities, createCustomCommodity } from '../../../services/commodityService';
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
            name: 'Single',
            description: '',
            price: 0,
            capacity: 1,
            bedType: '',
            totalRooms: 1
        }
    ]);


    const [commoditiesFormData, setCommoditiesFormData] = useState<Omit<CreateCommodityDTO, 'hotelName'>>({
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
        parkingPrice: 0,
        breakfastPrice: 0,
        lunchPrice: 0,
        dinnerPrice: 0,
        spaPrice: 0,
        poolPrice: 0,
        gymPrice: 0,
        wiFiPrice: 0,
        airConditioningPrice: 0,
        accessibilityFeaturesPrice: 0,
        petFriendlyPrice: 0,
        customCommodities: []
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
                name: 'Single',
                description: '',
                price: 0,
                capacity: 1,
                bedType: '',
                totalRooms: 1
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

            console.log("hotelResponse", hotelResponse)

            // Cria commodity SEM custom
            const commoditiesPayload: CreateCommodityDTO = {
                ...commoditiesFormData,
                hotelName: hotelResponse.data.name,
                customCommodities: [] // Não envia custom aqui!
            };
            await createCommodities(commoditiesPayload);

            // Cria custom commodities individualmente
            for (const custom of commoditiesFormData.customCommodities) {
                await createCustomCommodity({
                    name: custom.name,
                    isPaid: custom.isPaid,
                    price: custom.price,
                    description: custom.description,
                    isActive: custom.isActive,
                    hotelName: hotelResponse.data.name
                });
            }

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
                                    data={commoditiesFormData}
                                    setData={setCommoditiesFormData}
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

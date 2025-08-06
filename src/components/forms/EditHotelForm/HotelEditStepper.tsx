import { useEffect, useState } from 'react';
import { getHotelById, updateHotel } from '../../../services/hotelService';
import HotelBasicInfoForm from '../CreateHotelForm/HotelBasicInfoForm';
import HotelRoomTypesForm from '../CreateHotelForm/HotelRoomTypesForm';
import HotelReviewSubmit from '../CreateHotelForm/HotelReviewSubmit';
import ToastForm from '../../Toast/ToastForm';
import { HotelDTO, CreateHotelRoomTypeDTO, CreateCommodityDTO } from '../../../types/Hotel';
import HotelCommoditiesForm from '../CreateHotelForm/HotelCommoditiesForm';
import { updateCommodity, updateCustomCommodity } from '../../../services/commodityService';

interface Props {
    hotelId: number;
    onClose: () => void;
    onHotelUpdated?: (hotel: HotelDTO) => void;
}

const roomTypeEnumMap = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'] as const;

function HotelEditStepper({ hotelId, onClose, onHotelUpdated }: Props) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<any>(null);
    const [roomTypes, setRoomTypes] = useState<CreateHotelRoomTypeDTO[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [commoditiesFormData, setCommoditiesFormData] = useState<Omit<CreateCommodityDTO, 'hotelName'>>({
        hasParking: false,
        isParkingPaid: false,
        parkingPrice: 0,
        hasBreakfast: false,
        isBreakfastPaid: false,
        breakfastPrice: 0,
        hasLunch: false,
        isLunchPaid: false,
        lunchPrice: 0,
        hasDinner: false,
        isDinnerPaid: false,
        dinnerPrice: 0,
        hasSpa: false,
        isSpaPaid: false,
        spaPrice: 0,
        hasPool: false,
        isPoolPaid: false,
        poolPrice: 0,
        hasGym: false,
        isGymPaid: false,
        gymPrice: 0,
        hasWiFi: false,
        isWiFiPaid: false,
        wiFiPrice: 0,
        hasAirConditioning: false,
        isAirConditioningPaid: false,
        airConditioningPrice: 0,
        hasAccessibilityFeatures: false,
        isAccessibilityFeaturesPaid: false,
        accessibilityFeaturesPrice: 0,
        isPetFriendly: false,
        isPetFriendlyPaid: false,
        petFriendlyPrice: 0,
        isActive: true,
        customCommodities: []
    });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const hotel: HotelDTO = await getHotelById(hotelId);

            setFormData({
                name: hotel.name,
                cnpj: hotel.cnpj,
                street: hotel.street,
                city: hotel.city,
                state: hotel.state,
                zipCode: hotel.zipCode,
                description: hotel.description || '',
                starRating: hotel.starRating,
                checkInTime: hotel.checkInTime || '',
                checkOutTime: hotel.checkOutTime || '',
                contactPhone: hotel.contactPhone || '',
                contactEmail: hotel.contactEmail || '',
                isActive: hotel.isActive,
                mediaFiles: [],
            });

            setRoomTypes(
                hotel.roomTypes?.map(rt => ({
                    name: roomTypeEnumMap[typeof rt.name === 'number' ? rt.name : 0],
                    description: rt.description || '',
                    price: Number(rt.price) || 0,
                    capacity: Number(rt.capacity) || 1,
                    bedType: rt.bedType || '',
                    totalRooms: Number(rt.totalRooms) || 1,
                })) || []
            );

            const c = hotel.commodities?.[0];
            console.log("commodities", c);
            setCommoditiesFormData({
                hasParking: c?.hasParking ?? false,
                isParkingPaid: c?.isParkingPaid ?? false,
                parkingPrice: c?.parkingPrice ?? 0,
                hasBreakfast: c?.hasBreakfast ?? false,
                isBreakfastPaid: c?.isBreakfastPaid ?? false,
                breakfastPrice: c?.breakfastPrice ?? 0,
                hasLunch: c?.hasLunch ?? false,
                isLunchPaid: c?.isLunchPaid ?? false,
                lunchPrice: c?.lunchPrice ?? 0,
                hasDinner: c?.hasDinner ?? false,
                isDinnerPaid: c?.isDinnerPaid ?? false,
                dinnerPrice: c?.dinnerPrice ?? 0,
                hasSpa: c?.hasSpa ?? false,
                isSpaPaid: c?.isSpaPaid ?? false,
                spaPrice: c?.spaPrice ?? 0,
                hasPool: c?.hasPool ?? false,
                isPoolPaid: c?.isPoolPaid ?? false,
                poolPrice: c?.poolPrice ?? 0,
                hasGym: c?.hasGym ?? false,
                isGymPaid: c?.isGymPaid ?? false,
                gymPrice: c?.gymPrice ?? 0,
                hasWiFi: c?.hasWiFi ?? false,
                isWiFiPaid: c?.isWiFiPaid ?? false,
                wiFiPrice: c?.wiFiPrice ?? 0,
                hasAirConditioning: c?.hasAirConditioning ?? false,
                isAirConditioningPaid: c?.isAirConditioningPaid ?? false,
                airConditioningPrice: c?.airConditioningPrice ?? 0,
                hasAccessibilityFeatures: c?.hasAccessibilityFeatures ?? false,
                isAccessibilityFeaturesPaid: c?.isAccessibilityFeaturesPaid ?? false,
                accessibilityFeaturesPrice: c?.accessibilityFeaturesPrice ?? 0,
                isPetFriendly: c?.isPetFriendly ?? false,
                isPetFriendlyPaid: c?.isPetFriendlyPaid ?? false,
                petFriendlyPrice: c?.petFriendlyPrice ?? 0,
                isActive: c?.isActive ?? true,
                customCommodities: [
                    ...(c?.customCommodities ?? []),
                    ...(hotel.customCommodities ?? [])
                ].map(custom => ({
                    name: custom.name,
                    isPaid: custom.isPaid,
                    price: custom.price,
                    description: custom.description,
                    isActive: custom.isActive,
                    hotelName: '',
                }))
            });

            setLoading(false);
        }
        fetchData();
    }, [hotelId]);

    const handleSubmit = async () => {
        // 1. Atualiza o hotel
        const dto = {
            hotelId,
            name: formData.name,
            cnpj: formData.cnpj,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            description: formData.description || '',
            starRating: Number(formData.starRating),
            checkInTime: formData.checkInTime || '',
            checkOutTime: formData.checkOutTime || '',
            contactPhone: formData.contactPhone || '',
            contactEmail: formData.contactEmail || '',
            isActive: Boolean(formData.isActive),
            mediaFiles: formData.mediaFiles || [],
            roomTypesJson: JSON.stringify(roomTypes),
        };
        await updateHotel(hotelId, dto);

        // 2. Atualiza a commodity principal
        // Pegue o commodityId do hotel carregado (você já tem no objeto hotel)
        const hotel = await getHotelById(hotelId);
        console.log("Loaded hotel:", hotel);
        const commodityId = hotel.commodities?.[0]?.commodityId;
        console.log("hotel.commodities:", hotel.commodities);
        console.log("Updating commodity with ID:", commodityId);
        if (commodityId) {
            await updateCommodity(commodityId, {
                hotelName: hotel.name,
                ...commoditiesFormData
            });
        }

        // 3. Atualiza cada custom commodity
        if (commoditiesFormData.customCommodities && commoditiesFormData.customCommodities.length > 0) {
            for (const custom of commoditiesFormData.customCommodities) {
                // Só atualize se já existir customCommodityId (senão é novo, aí seria POST)
                if ((custom as any).customCommodityId) {
                    await updateCustomCommodity((custom as any).customCommodityId, {
                        name: custom.name,
                        hotelName: hotel.name,
                        isPaid: custom.isPaid,
                        price: custom.price,
                        description: custom.description,
                        isActive: custom.isActive,
                    });
                }
            }
        }

        setShowToast(true);
        if (onHotelUpdated) {
            const updatedHotel = await getHotelById(hotelId);
            onHotelUpdated(updatedHotel);
        }
        setTimeout(() => {
            setShowToast(false);
            onClose();
        }, 2000);
    };

    if (loading || !formData) return <div>Carregando...</div>;

    return (
        <div>
            <ToastForm
                show={showToast}
                message="Hotel atualizado com sucesso!"
                onClose={() => setShowToast(false)}
            />
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
    );
}

export default HotelEditStepper;
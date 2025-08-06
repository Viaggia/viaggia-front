import { useEffect, useState } from 'react';
import { getHotelById, updateHotel } from '../../../services/hotelService';
import HotelBasicInfoForm from '../CreateHotelForm/HotelBasicInfoForm';
import HotelRoomTypesForm from '../CreateHotelForm/HotelRoomTypesForm';
import HotelReviewSubmit from '../CreateHotelForm/HotelReviewSubmit';
import ToastForm from '../../Toast/ToastForm';
import { HotelDTO, HotelRoomTypeDTO, CommodityDTO, CustomCommodityDTO, UpdateHotelDTO, UpdateCommodityDTO, UpdateCustomCommodityDTO } from '../../../types/Hotel';
import HotelCommoditiesForm from '../CreateHotelForm/HotelCommoditiesForm';
import { updateCommodity, updateCustomCommodity } from '../../../services/commodityService';

interface Props {
    hotelId: number;
    onClose: () => void;
    onHotelUpdated?: (hotel: HotelDTO) => void;
}

// Tipos para edição (incluem IDs)
type EditRoomType = HotelRoomTypeDTO;
type EditCommodity = CommodityDTO;
type EditCustomCommodity = CustomCommodityDTO;

function HotelEditStepper({ hotelId, onClose, onHotelUpdated }: Props) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);

    // Estado com IDs
    const [formData, setFormData] = useState<UpdateHotelDTO | null>(null);
    const [roomTypes, setRoomTypes] = useState<EditRoomType[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [commodity, setCommodity] = useState<EditCommodity | null>(null);
    const [customCommodities, setCustomCommodities] = useState<EditCustomCommodity[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const hotel: HotelDTO = await getHotelById(hotelId);

            setFormData({
                hotelId: hotel.hotelId,
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
                roomTypesJson: '', // será preenchido no submit
            });

            console.log('hotel', hotel);

            setRoomTypes(hotel.roomTypes || []);
            setCommodity(hotel.commodities?.[0] || null);

            // Junta customCommodities da commodity e do hotel (caso existam nos dois)
            const customs: EditCustomCommodity[] = [
                ...(hotel.commodities?.[0]?.customCommodities ?? []),
                ...(hotel.customCommodities ?? [])
            ];
            // Remove duplicados por customCommodityId
            const customsUnique = customs.filter(
                (item, idx, arr) =>
                    item.customCommodityId &&
                    arr.findIndex(i => i.customCommodityId === item.customCommodityId) === idx
            );
            setCustomCommodities(customsUnique);

            setLoading(false);
        }
        fetchData();
    }, [hotelId]);

    // Atualiza o hotel, commodity e custom commodities
    const handleSubmit = async () => {
        if (!formData || !commodity) return;

        // Atualiza hotel
        const dto: UpdateHotelDTO = {
            ...formData,
            roomTypesJson: JSON.stringify(roomTypes),
        };
        await updateHotel(formData.hotelId, dto);

        // Atualiza commodity
        await updateCommodity(commodity.commodityId, {
            hotelName: formData.name,
            hasParking: commodity.hasParking,
            isParkingPaid: commodity.isParkingPaid,
            parkingPrice: commodity.parkingPrice,
            hasBreakfast: commodity.hasBreakfast,
            isBreakfastPaid: commodity.isBreakfastPaid,
            breakfastPrice: commodity.breakfastPrice,
            hasLunch: commodity.hasLunch,
            isLunchPaid: commodity.isLunchPaid,
            lunchPrice: commodity.lunchPrice,
            hasDinner: commodity.hasDinner,
            isDinnerPaid: commodity.isDinnerPaid,
            dinnerPrice: commodity.dinnerPrice,
            hasSpa: commodity.hasSpa,
            isSpaPaid: commodity.isSpaPaid,
            spaPrice: commodity.spaPrice,
            hasPool: commodity.hasPool,
            isPoolPaid: commodity.isPoolPaid,
            poolPrice: commodity.poolPrice,
            hasGym: commodity.hasGym,
            isGymPaid: commodity.isGymPaid,
            gymPrice: commodity.gymPrice,
            hasWiFi: commodity.hasWiFi,
            isWiFiPaid: commodity.isWiFiPaid,
            wiFiPrice: commodity.wiFiPrice,
            hasAirConditioning: commodity.hasAirConditioning,
            isAirConditioningPaid: commodity.isAirConditioningPaid,
            airConditioningPrice: commodity.airConditioningPrice,
            hasAccessibilityFeatures: commodity.hasAccessibilityFeatures,
            isAccessibilityFeaturesPaid: commodity.isAccessibilityFeaturesPaid,
            accessibilityFeaturesPrice: commodity.accessibilityFeaturesPrice,
            isPetFriendly: commodity.isPetFriendly,
            isPetFriendlyPaid: commodity.isPetFriendlyPaid,
            petFriendlyPrice: commodity.petFriendlyPrice,
            isActive: commodity.isActive,
        });

        console.log("customCommodities", customCommodities)

        // Atualiza custom commodities existentes
        for (const custom of customCommodities) {
            if (custom.customCommodityId) {
                await updateCustomCommodity(custom.customCommodityId, {
                    name: custom.name,
                    hotelName: formData.name,
                    isPaid: custom.isPaid,
                    price: custom.price,
                    description: custom.description,
                    isActive: custom.isActive,
                });
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

    if (loading || !formData || !commodity) return <div>Carregando...</div>;

    return (
        <div>
            <ToastForm
                show={showToast}
                message="Hotel atualizado com sucesso!"
                onClose={() => setShowToast(false)}
            />
            {step === 1 && (
                <HotelBasicInfoForm
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <HotelRoomTypesForm
                    roomTypes={roomTypes}
                    setRoomTypes={setRoomTypes}
                    nextStep={() => setStep(3)}
                    prevStep={() => setStep(1)}
                />
            )}
            {step === 3 && commodity && (
                <HotelCommoditiesForm
                    data={commodity}
                    setData={(updater) => {
                        // Type guard: nunca permita setar null
                        if (typeof updater === 'function') {
                            setCommodity(prev => {
                                if (!prev) return prev; // não altera se for null
                                const result = (updater as (prev: CommodityDTO) => CommodityDTO)(prev);
                                return result;
                            });
                        } else if (updater) {
                            setCommodity(updater);
                        }
                    }}
                    customCommoditiesOverride={customCommodities}
                    setCustomCommodities={setCustomCommodities}
                    nextStep={() => setStep(4)}
                    prevStep={() => setStep(2)}
                />
            )}
            {step === 4 && (
                <HotelReviewSubmit
                    formData={{
                        ...formData,
                        roomTypesJson: JSON.stringify(roomTypes),
                        mediaFiles: formData.mediaFiles ?? [],
                    }}
                    roomTypes={roomTypes}
                    commodity={commodity}
                    customCommodities={[
                        ...(commodity?.customCommodities ?? []),
                        ...customCommodities.filter(
                            c => !(commodity?.customCommodities ?? []).some(cc => cc.customCommodityId === c.customCommodityId)
                        )
                    ]}
                    handleSubmit={handleSubmit}
                    prevStep={() => setStep(3)}
                />
            )}
        </div>
    );
}

export default HotelEditStepper;
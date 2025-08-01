import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateHotelDTO, CreateHotelRoomTypeDTO } from '../../../types/Hotel';
import { createHotel } from '../../../services/hotelService';
import HotelBreadcrumb from './HotelBreadcrumb';
import HotelBasicInfoForm from './HotelBasicInfoForm';
import HotelRoomTypesForm from './HotelRoomTypesForm';
import HotelReviewSubmit from './HotelReviewSubmit';

function CreateHotelStepper() {
    const navigate = useNavigate();
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
            const payload: CreateHotelDTO = {
                ...formData,
                roomTypesJson
            };

            await createHotel(payload);
            setShowToast(true);
            resetForm();
            setTimeout(() => setShowToast(false), 4000);
            setStep(1);
        } catch (error) {
            alert('Erro ao cadastrar hotel. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 mb-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Cadastro de Hotel</h4>

                            <HotelBreadcrumb currentStep={step} setStep={setStep} />

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
                                <HotelReviewSubmit
                                    formData={{ ...formData, roomTypesJson: JSON.stringify(roomTypes) }}
                                    roomTypes={roomTypes}
                                    handleSubmit={handleSubmit}
                                    prevStep={() => setStep(2)}
                                />
                            )}

                            {showToast && (
                                <div
                                    className="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-4 show"
                                    role="alert"
                                    aria-live="assertive"
                                    aria-atomic="true"
                                    style={{ zIndex: 9999 }}
                                >
                                    <div className="d-flex">
                                        <div className="toast-body">Hotel cadastrado com sucesso!</div>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white me-2 m-auto"
                                            onClick={() => setShowToast(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CreateHotelStepper;

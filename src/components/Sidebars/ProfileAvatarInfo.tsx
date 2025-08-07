import React from 'react';

interface ProfileAvatarInfoProps {
    user: any;
    hover: boolean;
    setHover: (v: boolean) => void;
    setShowModal: (v: boolean) => void;
    size?: number; // px
    textColor?: string;
}

const ProfileAvatarInfo: React.FC<ProfileAvatarInfoProps> = ({
    user,
    hover,
    setHover,
    setShowModal,
    size = 100,
    textColor = 'text-white'
}) => (
    <div className="d-flex flex-column align-items-center">
        <div
            className="position-relative rounded-circle shadow mb-2"
            style={{ width: size, height: size, overflow: 'hidden' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                src={user.avatarUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="imagem-perfil"
                width={size}
                height={size}
            />
            <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-circle"
                style={{
                    backgroundColor: hover ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
                    opacity: hover ? 1 : 0,
                    transition: 'background-color 0.3s, opacity 0.3s',
                    cursor: hover ? 'pointer' : 'default'
                }}
                onClick={() => setShowModal(true)}
            >
                <i className="bi bi-pencil-fill text-white fs-4"></i>
            </div>
        </div>
        {/* Agora o nome e email ficam fora do círculo */}
        <div className={`mt-2 text-center ${textColor}`}>
            <h5 className="mb-1">{user.name}</h5>
            <p className="mb-1">{user.email}</p>
        </div>
    </div>
);

export default ProfileAvatarInfo;
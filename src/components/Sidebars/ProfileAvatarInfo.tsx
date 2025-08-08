import React from 'react';

interface ProfileAvatarInfoProps {
  user: any;
  hover: boolean;
  setHover: (v: boolean) => void;
  setShowModal: (v: boolean) => void;
  size?: number; 
  textColor?: string;
}

const ProfileAvatarInfo: React.FC<ProfileAvatarInfoProps> = ({
  user,
  hover,
  setHover,
  setShowModal,
  size = 250,
  textColor = 'text-white'
}) => {
  const backendUrl = import.meta.env.VITE_API_URL;

  const getAvatarUrl = () => {
    if (!user.avatarUrl) return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    return user.avatarUrl.startsWith("http")
      ? user.avatarUrl
      : backendUrl + user.avatarUrl;
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="position-relative rounded-circle shadow mb-2"
        style={{ width: size, height: size, overflow: 'hidden' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={getAvatarUrl()}
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
      <div className={`mt-2 text-center ${textColor}`}>
        <h5 className="mb-1 text-truncate" style={{ maxWidth: 250 }} title={user.name}>
          {user.name}
        </h5>
        <p className="mb-1 text-truncate" style={{ maxWidth: 250 }} title={user.email}>
          {user.email}
        </p>
      </div>

    </div>
  );
};

export default ProfileAvatarInfo;

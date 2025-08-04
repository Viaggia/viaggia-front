import React from 'react';
import ProfileAvatarInfo from './ProfileAvatarInfo';

interface MenuOption {
  value: string;
  label: string;
}

interface ProfileSidebarProps {
  user: any;
  menuOptions: MenuOption[];
  activeButton: string;
  setActiveButton: (value: string) => void;
  hover: boolean;
  setHover: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  menuOptions,
  activeButton,
  setActiveButton,
  hover,
  setHover,
  setShowModal,
}) => (
  <div className="mt-4 text-center w-100 d-none d-md-block">
    <div className="d-flex flex-column align-items-center w-100">
      <ProfileAvatarInfo
        user={user}
        hover={hover}
        setHover={setHover}
        setShowModal={setShowModal}
        size={100}
        textColor=""
      />
      <div style={{ height: 32 }} />
    </div>
    <div className="w-100 d-flex flex-column align-items-center gap-2 mt-0">
      {menuOptions.map(opt => (
        <button
          key={opt.value}
          className={`btn w-100 ${activeButton === opt.value ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export default ProfileSidebar;
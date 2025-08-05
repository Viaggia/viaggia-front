import React from 'react';
import ProfileAvatarInfo from './ProfileAvatarInfo';

interface MenuOption {
  value: string;
  label: string;
}

interface ProfileMobileMenuProps {
  user: any;
  hover: boolean;
  setHover: (v: boolean) => void;
  setShowModal: (v: boolean) => void;
  activeButton: string;
  setActiveButton: (v: string) => void;
  menuOptions: MenuOption[];
}

const ProfileMobileMenu: React.FC<ProfileMobileMenuProps> = ({
  user,
  hover,
  setHover,
  setShowModal,
  activeButton,
  setActiveButton,
  menuOptions
}) => (
  <div className="d-flex flex-column align-items-center py-3" style={{ backgroundColor: '#2577f2' }}>
    <ProfileAvatarInfo
      user={user}
      hover={hover}
      setHover={setHover}
      setShowModal={setShowModal}
      size={100}
      textColor="text-white"
    />
    <select
      className="form-select w-75 mb-2"
      value={activeButton}
      onChange={e => setActiveButton(e.target.value)}
    >
      {menuOptions.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default ProfileMobileMenu;
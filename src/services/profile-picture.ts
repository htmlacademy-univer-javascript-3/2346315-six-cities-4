const PROFILE_KEY_NAME = 'six-cities-profile-picture';

export const saveProfilePicture = (picture: string): void => {
  localStorage.setItem(PROFILE_KEY_NAME, picture);
};

export const getProfilePicture = (): string => {
  const token = localStorage.getItem(PROFILE_KEY_NAME);
  return token ?? '';
};

export const removeProfilePicture = (): void => {
  localStorage.removeItem(PROFILE_KEY_NAME);
};

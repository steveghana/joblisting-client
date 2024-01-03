import { IProfession } from '@/types/roles';

type InitialType = { text: string; error: string };

const checkValid = (
  value: InitialType,
  setValue: React.Dispatch<React.SetStateAction<InitialType>>,
  // validator: (val: string) => boolean
): boolean => {
  if (!value.text) {
    setValue({ ...value, error: 'This is required' });
    return false;
  }
  // if (typeof validator === "function" && !validator(value.text)) {
  //   setValue({ ...value, error: "This is invalid" });
  //   return false;
  // }
  return true;
};

export default checkValid;

export const getAvailableRoles = (filledRoles: IProfession[] | null): IProfession[] => {
  const allRoles: IProfession[] = ['Ceo', 'Recruitment'];
  if (filledRoles === null || !Array.isArray(filledRoles)) {
    return [];
  }
  return allRoles.filter((role) => !filledRoles?.includes(role));
};

export const isRegistrationOpen = (filledRoles: IProfession[]): boolean => {
  const availableRoles = getAvailableRoles(filledRoles);
  return availableRoles.length > 0;
};
// utils.ts (your utility file)

export const checkRegistrationAvailability = (data: IProfession[]): { isOpen: boolean; closedRoles?: string[] } => {
  const rolesAvailable: string[] = [];
  const ceoAvailable = data?.includes('Ceo');
  const recruitmentAvailable = data?.includes('Recruitment');

  if (!ceoAvailable) {
    rolesAvailable.push('Ceo');
  }
  if (!recruitmentAvailable) {
    rolesAvailable.push('Recruitment');
  }

  if (rolesAvailable.length > 0) {
    sessionStorage.setItem('rolesAvailable', JSON.stringify(rolesAvailable));
    // Registration is open
    return { isOpen: true };
  } else {
    // All roles are filled
    if (ceoAvailable && recruitmentAvailable) {
      // Both "Ceo" and "Recruitment" are already filled.
      // Registration is closed for these specific roles.
      return { isOpen: false, closedRoles: ['Ceo', 'Recruitment'] };
    } else {
      // All other roles are filled, but some roles are still available.
      return { isOpen: false, closedRoles: ['All roles except for some specific roles'] };
    }
  }
};

import { IProfession } from '@/types/roles';
import { shuffleArray } from './arrayShuffle';
import { checkRegistrationAvailability, getAvailableRoles, isRegistrationOpen } from './checkvalid';

// import { test, expect } from 'jest';

test('shuffleArray shuffles array', () => {
  const originalArray = [1, 2, 3, 4, 5];
  const shuffledArray = shuffleArray(originalArray);

  expect(shuffledArray).toHaveLength(5);
  expect(shuffledArray).not.toEqual(originalArray);
  expect(new Set(shuffledArray)).toEqual(new Set(originalArray));
});

test('shuffleArray returns new array', () => {
  const originalArray = [1, 2, 3];
  const shuffledArray = shuffleArray(originalArray);

  expect(shuffledArray).not.toBe(originalArray);
});

test('shuffleArray handles empty array', () => {
  const emptyArray: any[] = [];
  const shuffledEmptyArray = shuffleArray(emptyArray);

  expect(shuffledEmptyArray).toEqual([]);
});
describe('checkRegistrationAvailability', () => {
  it('should return true when at least one role is available', () => {
    const data: IProfession[] = ['Recruitment'];
    const result = checkRegistrationAvailability(data);
    expect(result).toEqual({ isOpen: true });
  });

  it('should return false and closed roles when all roles are filled', () => {
    const data: IProfession[] = ['Ceo', 'Recruitment'];
    const result = checkRegistrationAvailability(data);
    expect(result).toEqual({ isOpen: false, closedRoles: ['Ceo', 'Recruitment'] });
  });

  it('should return false and closed roles when both "Ceo" and "Recruitment" are already filled', () => {
    const data: IProfession[] = ['Ceo', 'Recruitment'];
    const result = checkRegistrationAvailability(data);
    expect(result).toEqual({ isOpen: false, closedRoles: ['Ceo', 'Recruitment'] });
  });
});

describe('getAvailableRoles', () => {
  it('should return an empty array when both "Ceo" and "Recruitment" are filled', () => {
    const filledRoles: IProfession[] = ['Ceo', 'Recruitment'];
    const result = getAvailableRoles(filledRoles);
    expect(result).toEqual([]);
  });

  it('should return an array with available roles when only "Ceo" is filled', () => {
    const filledRoles: IProfession[] = ['Ceo'];
    const result = getAvailableRoles(filledRoles);
    expect(result).toEqual(['Recruitment']);
  });

  it('should return an array with available roles when only "Recruitment" is filled', () => {
    const filledRoles: IProfession[] = ['Recruitment'];
    const result = getAvailableRoles(filledRoles);
    expect(result).toEqual(['Ceo']);
  });

  it('should return an array with all roles when no roles are filled', () => {
    const filledRoles: IProfession[] = [];
    const result = getAvailableRoles(filledRoles);
    expect(result).toEqual(['Ceo', 'Recruitment']);
  });
  it('should return an empty array if data is null or server fails', () => {
    const filledRoles: IProfession[] | null = null;
    const result = getAvailableRoles(filledRoles);
    expect(result).toEqual([]);
  });
});

describe('isRegistrationOpen', () => {
  it('should return true when no role is available', () => {
    const filledRoles: IProfession[] = [];
    const result = isRegistrationOpen(filledRoles);
    expect(result).toBe(true);
  });
  it('should return true when at least one role is available', () => {
    const filledRoles: IProfession[] = ['Ceo'];
    const result = isRegistrationOpen(filledRoles);
    expect(result).toBe(true);
  });

  it('should return false when all roles are filled', () => {
    const filledRoles: IProfession[] = ['Ceo', 'Recruitment'];
    const result = isRegistrationOpen(filledRoles);
    expect(result).toBe(false);
  });

  // Add more tests based on different scenarios and edge cases
});

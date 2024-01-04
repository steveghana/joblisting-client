// ExampleForm.tsx
import React from 'react';
import { validateUser } from './tablevalidate';
import { toast } from 'react-toastify';

interface ExampleFormProps {
  validationErrors: Record<string, string | undefined>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>;
  createUser: any; // Change 'any' to the type of your createUser export function
  isCreatingUser: boolean;
  updateClient: any; // Change 'any' to the type of your updateClient export function
  isUpdatingUser: boolean;
  deleteUser: any; // Change 'any' to the type of your deleteUser export function
  table: any; // Change 'any' to the type of your table data
}

export const handleCreate = async (
  { values, table }: any,
  create: ExampleFormProps['createUser'],
  setValidationErrors: ExampleFormProps['setValidationErrors'],
) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await create(values as any);
  table.setCreatingRow(null);
};

export const handleSave = async (
  values: Record<string, any>,
  { table, row }: any,
  update: ExampleFormProps['updateClient'],
  setValidationErrors: ExampleFormProps['setValidationErrors'],
) => {
  if (Object.keys(values)[0] === 'salary') {
    const { salary } = values;
    const regex = /^\d+$/;
    if (!regex.test(salary)) {
      toast.error('Salary must be a number(s)', {
        position: 'bottom-center',
      });
      return;
    }
  }
  try {
    setValidationErrors({});
    const response = await update({ ...values, id: row.id }).unwrap();
    if (!response) return;
    toast.success('Updated Successfully', {
      position: 'bottom-center',
    });
    table.setEditingRow(null);
  } catch (error) {
    toast.error("Couldn't update Please try again later", {
      position: 'bottom-center',
    });
  }
};

export const openDeleteConfirmModal = (row: any, deleteUser: any) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    deleteUser(row.original.email);
  }
};

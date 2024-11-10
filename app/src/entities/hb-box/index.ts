import { nanoid } from 'nanoid';

export type HbBox = {
  origin: File;
  id: string;
};

export const generateBoxId = () => nanoid(3);

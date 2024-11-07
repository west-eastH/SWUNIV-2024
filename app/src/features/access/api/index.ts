import { apiClient } from '@shared/config';

type Accessible = {
  accessible: boolean;
};

export const getAccessible = (): Promise<Accessible> =>
  apiClient.get('/check-ip');

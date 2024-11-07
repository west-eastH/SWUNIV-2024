import { getAccessible } from '@features/access/api';
import { useModal } from '@shared/ui';

export const useAccessible = () => {
  const { openById } = useModal();

  const access = async () => {
    const { accessible } = await getAccessible();

    if (!accessible) {
      openById('cannot-access');
    }

    return accessible;
  };

  return access;
};

export { IpFilter } from './config/IpFilter';

import { getAccessible } from '@features/access/api';
import { useModal } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';

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

export const useAccessQuery = () =>
  useQuery({
    queryKey: ['access'],
    queryFn: getAccessible,
  });

export { IpFilter } from './config/IpFilter';

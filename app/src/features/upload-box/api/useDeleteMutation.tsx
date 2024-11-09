import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@shared/config';
import { boxQueryKeys } from '@shared/query';
import { deleteFile } from '..';

export const useDeleteMutation = () =>
  useMutation({
    mutationFn: deleteFile,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [boxQueryKeys.list],
        exact: false,
      }),
  });

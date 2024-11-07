import { useModal } from '@shared/ui';
import { useEffect, useMemo, useState } from 'react';
import { square } from 'ldrs';

square.register();

const useLoading = () => {
  const { createModal, openById, closeById } = useModal();
  const [loading, setLoading] = useState(false);

  const onLoading = () => setLoading(true);
  const finishLoading = () => setLoading(false);

  const id = useMemo(
    () =>
      createModal({
        id: 'loading',
        node: () => {
          return (
            <article className="flex flex-col items-center justify-center">
              <l-square
                size="35"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="1.2"
                color="black"
              />

              <span className="py-6 text-xl">로딩 중..</span>
            </article>
          );
        },
        options: {
          noContent: true,
        },
      }),
    [createModal],
  );

  useEffect(() => {
    if (loading) {
      openById('loading');
    }

    if (!loading) {
      closeById('loading');
    }

    return () => closeById(id);
  }, [loading, id]);

  return {
    onLoading,
    finishLoading,
    open: () => openById(id),
    close: () => closeById(id),
  };
};

export default useLoading;

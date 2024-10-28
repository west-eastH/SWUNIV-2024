import { useModal } from '@shared/ui';
import { create } from 'zustand/react';
import { useEffect, useMemo } from 'react';
import { square } from 'ldrs';

square.register();

type StoreStates = {
  loading: boolean;
  onLoading: () => void;
  finishLoading: () => void;
};

const useStore = create<StoreStates>((set) => ({
  loading: false,
  onLoading: () => set({ loading: true }),
  finishLoading: () => set({ loading: false }),
}));

const useLoading = () => {
  const { createModal, openById, closeById } = useModal();
  const states = useStore();

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
    [],
  );

  useEffect(() => {
    if (states.loading) {
      return openById(id);
    }

    if (!states.loading) {
      return closeById(id);
    }

    return () => closeById(id);
  }, [states.loading, id]);

  return { ...states, open: () => openById(id), close: () => closeById(id) };
};

export default useLoading;

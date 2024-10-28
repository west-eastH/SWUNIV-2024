import { create } from 'zustand/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBoxList } from './index';
import { UploadBoxDetails } from '@entities/upload-box';

type StoreStates = {
  keyword?: string;
  setKeyword: (keyword?: string) => void;
  type: 'nickname' | 'title';
  changeSearchType: (type?: 'nickname' | 'title') => void;
  cursor?: number | -1;
  setNextCursor: (cursor: number | -1) => void;
};

const useStore = create<StoreStates>((set) => ({
  type: 'title',
  setKeyword: (keyword) => set({ keyword }),
  changeSearchType: (type) => set({ type }),
  setNextCursor: (cursor) => set({ cursor }),
}));

const debounce = (callback: () => void, ms: number) => {
  let timerId: number | undefined = undefined;

  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(callback, ms);
  };
};

const useBoxesQuery = () => {
  const { keyword, type, changeSearchType, setKeyword } = useStore();

  const { data, fetchNextPage, ...query } = useInfiniteQuery({
    queryKey: ['box-list', keyword, type],
    queryFn: ({ pageParam }) =>
      getBoxList({
        keyword,
        type,
        cursor: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
  });

  const boxes = (() => {
    if (!data) return [] as UploadBoxDetails[];
    return data.pages.map((page) => page.boxes).flat();
  })();

  const onSearch = (content: string) => {
    debounce(() => setKeyword(content), 500)();
  };

  const dataReturns = {
    boxes,
    keyword,
    type,
  };

  const getNextData = () => {
    fetchNextPage();
  };

  return {
    data: dataReturns,
    query,
    getNextData,
    changeSearchType,
    onSearch,
  };
};

export default useBoxesQuery;

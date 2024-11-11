import { create } from 'zustand/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBoxList } from './index';
import { UploadBoxDetails } from '@entities/upload-box';
import { boxQueryKeys } from '@shared/query';
import { useEffect } from 'react';
import { useLoading } from '@widgets/modal';

type StoreStates = {
  keyword?: string;
  setKeyword: (keyword?: string) => void;
  type: 'nickname' | 'title';
  changeSearchType: (type?: 'nickname' | 'title') => void;
  cursor?: number | -1;
  setNextCursor: (cursor: number | -1) => void;
  isInitialFetch: boolean;
  setIsInitialFetch: (isInitialFetch: boolean) => void;
};

const useStore = create<StoreStates>((set) => ({
  type: 'title',
  setKeyword: (keyword) => set({ keyword }),
  changeSearchType: (type) => set({ type }),
  setNextCursor: (cursor) => set({ cursor }),
  isInitialFetch: true,
  setIsInitialFetch: (isInitialFetch) => set({ isInitialFetch }),
}));

let timerId: number | undefined = undefined;

const debounce = (callback: () => void, ms: number) => {
  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(callback, ms);
  };
};

const useBoxesQuery = () => {
  const {
    keyword,
    type,
    changeSearchType,
    setKeyword,
    cursor,
    isInitialFetch,
    setIsInitialFetch,
  } = useStore();
  const { data, fetchNextPage, fetchStatus, ...query } = useInfiniteQuery({
    queryKey: [boxQueryKeys.list, keyword, type],
    queryFn: ({ pageParam }) =>
      getBoxList({
        keyword,
        type,
        cursor: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
  });
  const { onLoading, finishLoading } = useLoading();

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

  useEffect(() => {
    if (!isInitialFetch) return;
    if (boxes.length > 0) {
      setIsInitialFetch(false);
    }
  }, [boxes, isInitialFetch]);

  useEffect(() => {
    if (fetchStatus === 'fetching') {
      onLoading();
    } else {
      finishLoading();
    }
  }, [fetchStatus]);

  return {
    data: dataReturns,
    query,
    keyword,
    getNextData,
    changeSearchType,
    onSearch,
    isInitialFetch,
    endOfPage: !cursor || cursor === 1,
  };
};

export default useBoxesQuery;

import { apiClient } from '@shared/config';
import { UploadBoxDetails } from '@entities/upload-box';
import qs from 'query-string';

export type BoxSummary = {
  id: number;
  uploader: string;
  title: string;
  fileSize: number;
  crypted: boolean;
};

export type BoxListRequestParam = {
  cursor?: number;
  keyword?: string;
  type?: string;
};

export type BoxListResponse = {
  boxes: UploadBoxDetails[];
  nextCursorId: number | -1;
};

export const getBoxList = async ({
  type,
  cursor,
  keyword,
}: BoxListRequestParam): Promise<BoxListResponse> =>
  apiClient.get(
    `/boxes?${qs.stringify({
      cursor,
      type: !!type ? (type.trim() === '' ? undefined : type) : undefined,
      keyword: !!keyword
        ? keyword.trim() === ''
          ? undefined
          : keyword
        : undefined,
    })}`,
  );

export { default as useBoxesQuery } from './useBoxesQuery';

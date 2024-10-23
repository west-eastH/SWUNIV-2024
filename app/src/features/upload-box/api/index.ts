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

export const getBoxList = async (
  params: BoxListRequestParam,
): Promise<BoxListResponse> => apiClient.get(`/boxes?${qs.stringify(params)}`);

export { default as useBoxesQuery } from './useBoxesQuery';

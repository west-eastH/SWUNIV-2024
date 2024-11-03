import { apiClient } from '@shared/config';
import { UploadBoxDetails } from '@entities/upload-box';
import qs from 'query-string';
import { downloadClient } from '@shared/config/axios';

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

const getFilename = (contentDisposition?: string) => {
  if (!contentDisposition) return 'unknown';
  const tokens = contentDisposition.split('filename=');
  return decodeURIComponent(tokens[1]);
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

export const download = async (id: number, password: string) => {
  const response = await downloadClient.post(
    `/files/downloads/${id}`,
    { password },
    {
      responseType: 'blob',
    },
  );

  const contentDisposition = response.headers['content-disposition'] as
    | string
    | undefined;

  const filename = getFilename(contentDisposition);
  const blob = response.data as Blob;

  return { blob, filename };
};

export { default as useBoxesQuery } from './useBoxesQuery';

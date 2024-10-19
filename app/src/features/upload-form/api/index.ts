import { apiClient } from '@shared/config';
import { BoxCreation } from '@entities/upload-box';

export const upload = (body: BoxCreation): Promise<number> =>
  apiClient.post('/boxes/uploads', createFormData(body), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const createFormData = (body: BoxCreation) => {
  const formData = new FormData();

  const json = {
    title: body.title,
    uploader: body.uploader,
    password: body.password,
  };
  const data = new Blob([JSON.stringify(json)], { type: 'application/json' });

  formData.append('data', data);
  body.files.forEach((file) => formData.append('files', file));

  return formData;
};

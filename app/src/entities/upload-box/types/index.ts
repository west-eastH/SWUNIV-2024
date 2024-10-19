export type UploadBoxDetails = {
  id: number;
  uploader: string;
  title: string;
  fileSize: number;
  crypted: boolean;
  dateUploaded: string;
};

export type BoxCreation = {
  uploader: string;
  title: string;
  password: string;
  files: File[];
};

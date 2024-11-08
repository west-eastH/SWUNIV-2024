export type AnnounceState = {
  src: string;
  profile: {
    name: {
      kor: string;
      eng: string;
      styleName: string;
    };
    prefixSrc?: string;
    email: string;
    description: string;
    subDescription: string;
  };
};

export type Task = {
  iconSrc: string;
  text: string;
};

export type ProfileProps = {
  announcement: AnnounceState;
  greet: string;
  tasks: Task[];
};

import { Announcer } from './Announcer';
import { TaskBody } from './TaskBody';
import { ProfileProps } from '@pages/within-people/types';

export const ProfileCard: React.FC<ProfileProps> = ({
  announcement,
  greet,
  tasks,
}) => {
  const bodyProps = { greet, tasks };

  return (
    <article className="">
      <Announcer {...announcement} />
      <TaskBody {...bodyProps} />
    </article>
  );
};

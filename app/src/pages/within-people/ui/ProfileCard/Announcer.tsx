import { Typo } from '@shared/ui';
import { AnnounceState } from '../../types';

export const Announcer: React.FC<AnnounceState> = ({ src, profile }) => {
  const {
    name: { kor, eng, styleName },
    description,
    subDescription,
    email,
    prefixSrc,
  } = profile;

  return (
    <div className="min-h-[468px] announcer-radius overflow-hidden relative">
      <img src={src} alt="people.png" className="w-full h-fit" />
      <div className="announcer-body announcer-body__background">
        <div className="col flex-1">
          <div className="flex items-end gap-x-2">
            <Typo size={28} color="white" bold>
              {kor}
            </Typo>
            <Typo size={22} className={styleName} bold>
              {eng}
            </Typo>
          </div>
          <div className="col">
            <Typo size={20} color="white" bold>
              {description}
            </Typo>
            <Typo size={20} color="white" className="pl-[12px]" bold>
              {subDescription}
            </Typo>
          </div>
        </div>

        <div className="flex w-full justify-end items-center gap-x-2">
          {prefixSrc && (
            <img src={prefixSrc} width={35} height={25} alt="animation.gif" />
          )}
          <Typo size={12} color="white">
            {email}
          </Typo>
        </div>
      </div>
    </div>
  );
};

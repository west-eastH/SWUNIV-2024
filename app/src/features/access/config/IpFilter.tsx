import React, { PropsWithChildren, useEffect } from 'react';
import { useAccessible } from '@features/access';
import { useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';
import { useNameManager } from '@features/nickname';

export const IpFilter: React.FC<PropsWithChildren> = ({ children }) => {
  const access = useAccessible();
  const navigate = useNavigate();
  const { exit } = useNameManager();

  useEffect(() => {
    (async () => {
      const accessible = await access();
      if (!accessible) {
        exit();
        navigate(urlPath.root);
      }
    })();
  }, []);

  return children;
};

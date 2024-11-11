import React from 'react';
import { Helmet } from 'react-helmet-async';

export const HelmetConfig: React.FC<{ title: string }> = ({ title }) => (
  <Helmet>
    <title>한밭박스 - {title}</title>
    <meta property="og:title" content="파일공유를 더 손쉽고 빠르게." />
    <meta
      property="og:description"
      content="교내에서 자료를 더 손쉽고 빠르게 공유하세요!"
    />
    <meta
      property="og:image"
      content="https://www.han-box.co.kr/images/og-image.png"
    />
  </Helmet>
);

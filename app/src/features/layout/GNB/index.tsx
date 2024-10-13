import React from 'react';
import Button from "./Button";

const GNB: React.FC = () => {
  return (
    <div className="gnb sticky bottom-0">
      <nav className="w-[380px] flex justify-evenly items-center py-[9px]">
        <Button type="home" />
        <Button type="upload" />
        <Button type="menu" />
      </nav>

    </div>
  );
}

export default GNB;

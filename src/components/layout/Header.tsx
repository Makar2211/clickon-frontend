import React from 'react';
import { LocaleSwitcher } from '../shared';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <LocaleSwitcher />
    </div>
  );
};

export default Header;

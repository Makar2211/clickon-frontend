'use client';
import { currency } from '@/constants';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui';

interface Props {
  className?: string;
}

const CurrencySwitcher: React.FC<Props> = ({ className }) => {
  const [value, setValue] = useState('USD');
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        value={value}
        className="shadow-none border-0 bg-transparent p-0 "
      >
        <span className="uppercase font-medium text-sm">{value}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currency.map((cur) => (
            <SelectItem
              key={cur.code}
              value={cur.code}
              className={
                cur.code === value ? 'text-[var(--primary-orange)]' : ''
              }
            >
              {cur.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencySwitcher;

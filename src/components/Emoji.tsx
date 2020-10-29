import React, { FC } from 'react';

export const Emoji: FC<{ label?: string }> = ({ label, children }) => (
  <span
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? false : true}
  >
    {children}
  </span>
);

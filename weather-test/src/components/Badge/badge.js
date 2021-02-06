import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './badge.scss';

export const Badge = ({ title, color, className }) => {
  return (
    <p className='badge'>
      <FontAwesomeIcon className='circle-badge' icon={faCircle} color={color}/>
      <span className={className}>{title}</span>
    </p>
  );
};
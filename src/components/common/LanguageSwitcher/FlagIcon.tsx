'use client';

import React from 'react';

interface FlagIconProps {
  code: string;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, className }) => {
  const normalizedCode = code.toLowerCase();

  switch (normalizedCode) {
    case 'id':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="12" fill="#E70011" />
          <rect y="12" width="36" height="12" fill="#FFFFFF" />
          <rect width="36" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      );

    case 'en':
    case 'gb':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#012169" />
          <path d="M0 0l36 24M36 0L0 24" stroke="#FFFFFF" strokeWidth="4.2" />
          <path d="M0 0l36 24" stroke="#C8102E" strokeWidth="1.8" strokeDasharray="18 18" />
          <path d="M36 0L0 24" stroke="#C8102E" strokeWidth="1.8" strokeDasharray="18 18" strokeDashoffset="18" />
          <path d="M18 0v24M0 12h36" stroke="#FFFFFF" strokeWidth="6.5" />
          <path d="M18 0v24M0 12h36" stroke="#C8102E" strokeWidth="3.8" />
        </svg>
      );

    case 'de':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="8" fill="#111111" />
          <rect y="8" width="36" height="8" fill="#DD0000" />
          <rect y="16" width="36" height="8" fill="#FFCE00" />
        </svg>
      );

    case 'zh-cn':
    case 'cn':
    case 'zh':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#DE2910" />
          <polygon
            points="7,2 8.5,5.8 12.2,6.1 9.4,8.6 10.3,12.2 7,10.2 3.7,12.2 4.6,8.6 1.8,6.1 5.5,5.8"
            fill="#FFDE00"
          />
          <polygon points="13,2.5 13.5,3.7 14.8,3.8 13.8,4.7 14.1,6 13,5.3 11.9,6 12.2,4.7 11.2,3.8 12.5,3.7" fill="#FFDE00" />
          <polygon points="16,5 16.5,6.2 17.8,6.3 16.8,7.2 17.1,8.5 16,7.8 14.9,8.5 15.2,7.2 14.2,6.3 15.5,6.2" fill="#FFDE00" />
          <polygon points="16,9.5 16.5,10.7 17.8,10.8 16.8,11.7 17.1,13 16,12.3 14.9,13 15.2,11.7 14.2,10.8 15.5,10.7" fill="#FFDE00" />
          <polygon points="13,12.5 13.5,13.7 14.8,13.8 13.8,14.7 14.1,16 13,15.3 11.9,16 12.2,14.7 11.2,13.8 12.5,13.7" fill="#FFDE00" />
        </svg>
      );

    case 'ja':
    case 'jp':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#FFFFFF" />
          <circle cx="18" cy="12" r="7.2" fill="#BC002D" />
          <rect width="36" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      );

    case 'ko':
    case 'kr':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#FFFFFF" />
          <g transform="translate(18, 12)">
            <path d="M0 -6A6 6 0 0 1 0 6A3 3 0 0 0 0 0A3 3 0 0 1 0 -6" fill="#C60C30" />
            <path d="M0 6A6 6 0 0 1 0 -6A3 3 0 0 0 0 0A3 3 0 0 1 0 6" fill="#003478" />
            <g stroke="#111111" strokeWidth="0.85">
              <path d="M-10 -7.5l-2.2 2.2M-8.8 -8.7l-2.2 2.2M-7.6 -9.9l-2.2 2.2" />
              <path d="M10 7.5l2.2 -2.2M8.8 8.7l2.2 -2.2M7.6 9.9l2.2 -2.2" />
              <path d="M10 -7.5l2.2 2.2M8.8 -8.7l2.2 2.2M7.6 -9.9l2.2 2.2" />
              <path d="M-10 7.5l-2.2 -2.2M-8.8 8.7l-2.2 -2.2M-7.6 9.9l-2.2 -2.2" />
            </g>
          </g>
          <rect width="36" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      );

    case 'ar':
    case 'sa':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#006C35" />
          <path d="M8 16.5h18l-3-2M8 16.5l2 2" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M9 10.5h18M11 8.5c1 0 1 3 2 3s1-3 2-3 1 3 2 3M20 8.5c1 0 1 3 2 3s1-3 2-3" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'th':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="4" fill="#A51931" />
          <rect y="4" width="36" height="4" fill="#FFFFFF" />
          <rect y="8" width="36" height="8" fill="#2D2A4A" />
          <rect y="16" width="36" height="4" fill="#FFFFFF" />
          <rect y="20" width="36" height="4" fill="#A51931" />
        </svg>
      );

    case 'vi':
    case 'vn':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#DA251D" />
          <polygon
            points="18,4 20.8,11.5 28.5,11.5 22.3,16 24.6,23.5 18,19 11.4,23.5 13.7,16 7.5,11.5 15.2,11.5"
            fill="#FFFF00"
            transform="scale(0.85) translate(3.2, 1.5)"
          />
        </svg>
      );

    case 'ms':
    case 'my':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect y="0" width="36" height="1.71" fill="#CC0000" />
          <rect y="1.71" width="36" height="1.71" fill="#FFFFFF" />
          <rect y="3.42" width="36" height="1.71" fill="#CC0000" />
          <rect y="5.13" width="36" height="1.71" fill="#FFFFFF" />
          <rect y="6.84" width="36" height="1.71" fill="#CC0000" />
          <rect y="8.55" width="36" height="1.71" fill="#FFFFFF" />
          <rect y="10.26" width="36" height="1.71" fill="#CC0000" />
          <rect y="11.97" width="36" height="1.71" fill="#FFFFFF" />
          <rect y="13.68" width="36" height="1.71" fill="#CC0000" />
          <rect y="15.39" width="36" height="1.71" fill="#FFFFFF" />
          <rect y="17.1" width="36" height="1.71" fill="#CC0000" />
          <rect y="18.81" width="36" height="1.71" fill="#FFFFFF" />
          <rect y="20.52" width="36" height="1.71" fill="#CC0000" />
          <rect y="22.23" width="36" height="1.77" fill="#FFFFFF" />
          <rect width="18" height="13.7" fill="#010066" />
          <circle cx="8" cy="6.85" r="4.2" fill="#FFCC00" />
          <circle cx="9.2" cy="6.85" r="3.6" fill="#010066" />
          <circle cx="12" cy="6.85" r="2.2" fill="#FFCC00" />
        </svg>
      );

    case 'hi':
    case 'in':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="8" fill="#FF9933" />
          <rect y="8" width="36" height="8" fill="#FFFFFF" />
          <rect y="16" width="36" height="8" fill="#128807" />
          <circle cx="18" cy="12" r="3.2" fill="none" stroke="#000080" strokeWidth="0.8" />
          <circle cx="18" cy="12" r="0.8" fill="#000080" />
          <path d="M18 9v6M15 12h6M16 10l4 4M20 10l-4 4" stroke="#000080" strokeWidth="0.5" />
        </svg>
      );

    case 'tl':
    case 'ph':
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="12" fill="#0038A8" />
          <rect y="12" width="36" height="12" fill="#CE1126" />
          <polygon points="0,0 20,12 0,24" fill="#FFFFFF" />
          <circle cx="6.5" cy="12" r="2.2" fill="#FCD116" />
          <circle cx="2.5" cy="3.5" r="0.8" fill="#FCD116" />
          <circle cx="2.5" cy="20.5" r="0.8" fill="#FCD116" />
          <circle cx="14" cy="12" r="0.8" fill="#FCD116" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
          <rect width="36" height="24" fill="#333333" />
          <text x="18" y="15" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
            {code.toUpperCase().slice(0, 2)}
          </text>
        </svg>
      );
  }
};

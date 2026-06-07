'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer_source: string;
}

export function useUTMParams(): UTMParams {
  const searchParams = useSearchParams();

  const utmParams = useMemo<UTMParams>(
    () => ({
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      referrer_source: typeof document !== 'undefined' ? document.referrer : '',
    }),
    [searchParams]
  );

  return utmParams;
}

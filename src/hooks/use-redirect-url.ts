import { useSearchParams } from 'next/navigation';

export const useRedirectUrl = (
  defaultRedirectUrl?: string,
) => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const appId = redirectUrl
    ? new URL(redirectUrl).host
    : defaultRedirectUrl;

  return { appId, redirectUrl };
};

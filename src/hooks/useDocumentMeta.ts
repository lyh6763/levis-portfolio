import { useEffect } from 'react';

const DEFAULT_TITLE = "LEVI'S Heritage | Since 1853";

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = description
      ? document.querySelector<HTMLMetaElement>('meta[name="description"]')
      : null;
    const previousDescription = metaDescription?.getAttribute('content') ?? null;

    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}

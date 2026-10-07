import { useEffect } from 'react';

export const SITE_NAME = 'WARP & WEFT';

/** 라우트별 문서 제목. `null`이면 사이트 이름만 쓴다. */
export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Levi's와 블루진의 150년`;
  }, [title]);
}

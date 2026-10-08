import { ComponentType, lazy, LazyExoticComponent } from 'react';

import type { VizId } from '../data/chapterMeta';

type VizModule = { default: ComponentType };

// 시각화마다 별도 청크. GSAP는 스크롤 스크럽을 쓰는 시각화와 함께 처음 필요할 때 내려받는다.
const loaders: Record<VizId, () => Promise<VizModule>> = {
  route: () => import('./RouteViz').then((m) => ({ default: m.RouteViz })),
  patent: () => import('./PatentViz').then((m) => ({ default: m.PatentViz })),
  lot501: () => import('./Lot501Viz').then((m) => ({ default: m.Lot501Viz })),
  warpaint: () => import('./WarPaintViz').then((m) => ({ default: m.WarPaintViz })),
  indigo: () => import('./IndigoViz').then((m) => ({ default: m.IndigoViz })),
  loom: () => import('./LoomViz').then((m) => ({ default: m.LoomViz })),
  spread: () => import('./SpreadViz').then((m) => ({ default: m.SpreadViz })),
  anatomy: () => import('./AnatomyViz').then((m) => ({ default: m.AnatomyViz })),
  water: () => import('./WaterViz').then((m) => ({ default: m.WaterViz })),
};

export const vizRegistry = Object.fromEntries(
  Object.entries(loaders).map(([id, load]) => [id, lazy(load)]),
) as Record<VizId, LazyExoticComponent<ComponentType>>;

/** 화면에 그리기 전에 시각화 청크를 미리 받아 둔다. 모듈 캐시를 공유하므로 lazy와 중복 요청이 없다. */
export const preloadViz = (id: VizId) => loaders[id]().catch(() => undefined);

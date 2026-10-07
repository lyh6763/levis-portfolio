import type { ComponentType } from 'react';

import type { VizId } from '../data/chapters';
import { AnatomyViz } from './AnatomyViz';
import { IndigoViz } from './IndigoViz';
import { LoomViz } from './LoomViz';
import { Lot501Viz } from './Lot501Viz';
import { PatentViz } from './PatentViz';
import { RouteViz } from './RouteViz';
import { SpreadViz } from './SpreadViz';
import { WarPaintViz } from './WarPaintViz';
import { WaterViz } from './WaterViz';

export const vizRegistry: Record<VizId, ComponentType> = {
  route: RouteViz,
  patent: PatentViz,
  lot501: Lot501Viz,
  warpaint: WarPaintViz,
  indigo: IndigoViz,
  loom: LoomViz,
  spread: SpreadViz,
  anatomy: AnatomyViz,
  water: WaterViz,
};

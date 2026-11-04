import { describe, expect, it } from 'vitest';

import { blocksBySlug } from '../content/chapters/buildIndex';
import { collectNotes, notesByBlock } from '../editorial/Footnote';
import { chapters } from './chapterMeta';
import { citedInChapters, usedInInsideOut } from './citations';
import { sourceById, sourceGroups, sources } from './sources';

// 각주 마커의 시작. 앱이 각주로 바꾸는 형식(소문자·숫자·하이픈 id)인지는 collectNotes로 따로 센다.
const MARKER_START = /\[\^/g;
const countMarkers = (text: string) => text.match(MARKER_START)?.length ?? 0;

const chapterBlocks = chapters.map((chapter) => ({ slug: chapter.slug, blocks: blocksBySlug[chapter.slug] }));

describe('챕터 본문 색인', () => {
  it('목차의 챕터와 본문 색인이 일치한다', () => {
    expect(Object.keys(blocksBySlug).sort()).toEqual(chapters.map((chapter) => chapter.slug).sort());
  });
});

describe('각주', () => {
  it.each(chapterBlocks)('$slug: 모든 각주가 출처 목록에 있다', ({ blocks }) => {
    const missing = collectNotes(blocks).filter((id) => !sourceById.has(id));
    expect(missing).toEqual([]);
  });

  it.each(chapterBlocks)('$slug: 각주 마커는 각주로 바뀌는 형식으로만 쓴다', ({ blocks }) => {
    for (const block of blocks) {
      if (block.type === 'p' || block.type === 'aside') {
        // 대문자·밑줄 등이 섞인 마커는 각주로 바뀌지 않고 글자 그대로 보인다.
        const recognized = collectNotes([block]).reduce(
          (sum, id) => sum + block.text.split(`[^${id}]`).length - 1,
          0,
        );
        expect(recognized, block.text).toBe(countMarkers(block.text));
      } else {
        // 문단·박스 밖의 마커는 각주로 바뀌지 않는다.
        for (const value of Object.values(block)) {
          if (typeof value === 'string') {
            expect(countMarkers(value), `${block.type}: ${value}`).toBe(0);
          }
        }
      }
    }
  });

  it.each(chapterBlocks)('$slug: 옆주는 블록마다 그 블록의 각주를, 전체 표기는 출처마다 한 번 쓴다', ({ blocks }) => {
    const perBlock = notesByBlock(blocks);
    for (const [i, notes] of perBlock.entries()) {
      expect(notes.map((note) => note.id)).toEqual(collectNotes([blocks[i]]));
    }
    // 전체 표기(first)가 나오는 순서가 각주 번호 순서와 같다.
    const firsts = perBlock.flatMap((notes) => notes.filter((note) => note.first).map((note) => note.id));
    expect(firsts).toEqual(collectNotes(blocks));
  });
});

describe('출처 목록', () => {
  it('id가 겹치지 않는다', () => {
    const ids = sources.map((source) => source.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('묶음 주소가 출처 id와 겹치지 않는다', () => {
    for (const group of sourceGroups) {
      expect(sourceById.has(`sources-${group.id}`), group.id).toBe(false);
    }
  });

  it.each(sources)('$id: 대조 시점은 YYYY-MM, 주소는 http(s)로 쓴다', (source) => {
    if (source.checked !== undefined) {
      expect(source.checked).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
    }
    if (source.url !== undefined) {
      expect(source.url).toMatch(/^https?:\/\//);
    }
  });
});

describe('출처가 쓰인 곳', () => {
  it('출처 페이지의 인용 장 목록이 본문 각주와 같다', () => {
    const fromText: Record<string, string[]> = {};
    for (const { slug, blocks } of chapterBlocks) {
      for (const id of new Set(collectNotes(blocks))) {
        (fromText[id] ??= []).push(slug);
      }
    }
    expect(citedInChapters).toEqual(fromText);
  });

  it('감정 도구가 근거로 쓰는 출처가 목록에 있다', () => {
    expect(usedInInsideOut.filter((id) => !sourceById.has(id))).toEqual([]);
  });

  it.each(sources)('$id: 어딘가에 쓰인다 (장 각주나 감정 도구)', (source) => {
    const used = (citedInChapters[source.id]?.length ?? 0) > 0 || usedInInsideOut.includes(source.id);
    expect(used).toBe(true);
  });
});

"""공유 미리보기(OG) 이미지 생성: 표지(인디고 + 능직 사선 + 특허 도면풍 라인 드로잉)를 1200x630으로 옮긴다.

외부 이미지·폰트 없이 Windows 기본 폰트(Georgia, Malgun Gothic, Consolas)만 쓴다.
2배 크기로 그린 뒤 축소해 선의 계단 현상을 줄인다.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path("public/images/og-image.png")
WIDTH, HEIGHT = 1200, 630
S = 2  # 슈퍼샘플링 배율

INDIGO = (18, 33, 61)
ECRU = (243, 234, 215)
ECRU_MUTED = (216, 205, 184)
INDIGO_300 = (143, 160, 189)
SELVEDGE = (168, 17, 46)
COPPER = (201, 138, 79)

FONTS = "C:/Windows/Fonts/"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONTS + name, size * S)


def twill(canvas: Image.Image) -> None:
    """표지와 같은 방향(-62deg)의 옅은 사선 결."""
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    w, h = canvas.size
    run = int(h / 1.88)  # tan(62deg) ≈ 1.88: 높이 h를 내려가는 동안 x가 이만큼 이동
    for x in range(-run, w + run, 7 * S):
        draw.line((x, 0, x + run, h), fill=(255, 255, 255, 10), width=2 * S)
    canvas.alpha_composite(layer)


def quad(p0, p1, p2, steps=24):
    """2차 베지어를 선분 점열로."""
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0]
        y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1]
        pts.append((x, y))
    return pts


def drawing(draw: ImageDraw.ImageDraw, ox: float, oy: float, scale: float) -> None:
    """src/viz/CoverDrawing.tsx의 501 정면 도식(400x600 viewBox)을 그대로 옮긴다."""

    def p(x, y):
        return ((ox + x * scale) * S, (oy + y * scale) * S)

    stroke = {"fill": ECRU, "width": int(2.2 * S)}

    def rect(x, y, w, h):
        draw.line([p(x, y), p(x + w, y), p(x + w, y + h), p(x, y + h), p(x, y)], joint="curve", **stroke)

    rect(90, 40, 220, 34)
    draw.line([p(*pt) for pt in [(92, 74), (80, 540), (188, 540), (200, 262), (212, 540), (320, 540), (308, 74)]], joint="curve", **stroke)
    draw.line([p(214, 74), p(214, 222)] + [p(*pt) for pt in quad((214, 222), (214, 250), (200, 258))], joint="curve", **stroke)
    draw.line([p(*pt) for pt in quad((100, 80), (142, 92), (152, 152))], joint="curve", **stroke)
    draw.line([p(*pt) for pt in quad((300, 80), (258, 92), (248, 152))], joint="curve", **stroke)
    rect(258, 90, 34, 40)
    for x in (112, 160, 240, 288):
        rect(x, 34, 9, 46)

    cx, cy = p(200, 57)
    r = 7 * scale * S
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=ECRU, width=int(2.2 * S))

    for x, y in [(104, 84), (150, 150), (296, 84), (250, 150), (258, 90), (292, 90)]:
        cx, cy = p(x, y)
        r = 5 * scale * S
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=COPPER)


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)

    canvas = Image.new("RGBA", (WIDTH * S, HEIGHT * S), INDIGO + (255,))
    twill(canvas)
    draw = ImageDraw.Draw(canvas)

    x = 72 * S
    draw.text((x, 78 * S), "ISSUE 501 · AN UNOFFICIAL LONG READ", fill=INDIGO_300, font=font("consola.ttf", 17))
    title = font("georgiab.ttf", 118)
    draw.text((x, 118 * S), "WARP &", fill=ECRU, font=title)
    draw.text((x, 240 * S), "WEFT", fill=ECRU, font=title)
    draw.text((x, 410 * S), "Levi's와 블루진의 150년을 아홉 개의 장으로", fill=ECRU_MUTED, font=font("malgun.ttf", 30))
    draw.text(
        (x, 466 * S),
        "9 CHAPTERS · FOOTNOTED · INSIDE OUT · HERITAGE LINE",
        fill=INDIGO_300,
        font=font("consola.ttf", 16),
    )

    drawing(draw, ox=800, oy=40, scale=0.86)
    draw.text(
        (972 * S, 568 * S),
        "FIG. 1 — No. 139,121 · MAY 20, 1873",
        fill=INDIGO_300,
        font=font("consola.ttf", 13),
        anchor="mm",
    )

    # 바짓단 셀비지처럼: 흰 가장자리 + 붉은 실
    draw.rectangle((0, (HEIGHT - 14) * S, WIDTH * S, (HEIGHT - 10) * S), fill=ECRU)
    draw.rectangle((0, (HEIGHT - 10) * S, WIDTH * S, HEIGHT * S), fill=SELVEDGE)

    image = canvas.convert("RGB").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    image.save(OUT, "PNG", optimize=True)
    print(f"{OUT} {OUT.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()

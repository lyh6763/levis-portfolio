from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


OUT = Path("public/images/og-image.webp")
PNG_SOURCE = Path("images-src/og-image.png")
WIDTH = 1200
HEIGHT = 630


def font(path: str, size: int):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def paste_tile(canvas: Image.Image, source: Path, x: int, y: int, size: int) -> None:
    image = Image.open(source).convert("RGB")
    image.thumbnail((size, size), Image.Resampling.LANCZOS)

    tile = Image.new("RGB", (size, size), "#d9cdb5")
    tile.paste(image, ((size - image.width) // 2, (size - image.height) // 2))
    tile = tile.filter(ImageFilter.UnsharpMask(radius=1, percent=120))
    canvas.paste(tile, (x, y))


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    PNG_SOURCE.parent.mkdir(parents=True, exist_ok=True)

    canvas = Image.new("RGB", (WIDTH, HEIGHT), "#12213d")
    draw = ImageDraw.Draw(canvas)

    draw.rectangle([0, 0, WIDTH, HEIGHT], outline="#a8112e", width=18)
    draw.text((72, 118), "LEVI'S", fill="#f6efe2", font=font("C:/Windows/Fonts/arialbd.ttf", 76))
    draw.text((72, 210), "Heritage Archive", fill="#f6efe2", font=font("C:/Windows/Fonts/arial.ttf", 30))
    draw.text(
        (72, 268),
        "Since 1853 / Blue jean since 1873",
        fill="#d9cdb5",
        font=font("C:/Windows/Fonts/arial.ttf", 22),
    )
    draw.line((72, 340, 520, 340), fill="#a8112e", width=4)
    draw.text((72, 380), "Denim. Craft. Culture.", fill="#f6efe2", font=font("C:/Windows/Fonts/arial.ttf", 30))

    paste_tile(canvas, Path("public/images/generated/generated-501-original-fit.webp"), 690, 170, 260)
    paste_tile(canvas, Path("public/images/generated/generated-frayed-layers.webp"), 860, 170, 260)
    paste_tile(canvas, Path("public/images/generated/generated-indigo-vat.webp"), 1030, 170, 260)

    canvas.save(PNG_SOURCE)
    canvas.save(OUT, "WEBP", quality=86, method=6)
    print(f"{OUT} {OUT.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()

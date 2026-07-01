from pathlib import Path

from PIL import Image, ImageOps


SOURCE_DIR = Path("public/images/generated")
MAX_LONG_EDGE = 1600
QUALITY = 78


def optimize_image(source: Path) -> tuple[Path, int, int]:
    target = source.with_suffix(".webp")

    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        width, height = image.size
        long_edge = max(width, height)

        if long_edge > MAX_LONG_EDGE:
            ratio = MAX_LONG_EDGE / long_edge
            next_size = (round(width * ratio), round(height * ratio))
            image = image.resize(next_size, Image.Resampling.LANCZOS)

        image.save(target, "WEBP", quality=QUALITY, method=6)

    return target, source.stat().st_size, target.stat().st_size


def main() -> None:
    rows = []

    for source in sorted(SOURCE_DIR.glob("generated-*.png")):
        rows.append((source.name, *optimize_image(source)))

    original_total = sum(original_size for _, _, original_size, _ in rows)
    optimized_total = sum(optimized_size for _, _, _, optimized_size in rows)

    for name, target, original_size, optimized_size in rows:
        saved = 100 - (optimized_size / original_size * 100)
        print(
            f"{name} -> {target.name}: "
            f"{original_size / 1024:.0f} KB -> {optimized_size / 1024:.0f} KB "
            f"({saved:.1f}% saved)"
        )

    total_saved = 100 - (optimized_total / original_total * 100)
    print(
        f"TOTAL: {original_total / 1024 / 1024:.2f} MB -> "
        f"{optimized_total / 1024 / 1024:.2f} MB ({total_saved:.1f}% saved)"
    )


if __name__ == "__main__":
    main()

// Ham ürün görsellerini (raw-media/) WebP'ye çevirip public/products/ altına yerleştirir.
// Yeniden çalıştırılabilir — üzerine yazar. Yeni görsel geldikçe MAPPING'e satır eklenir.
//
// Kullanım: npm run images:convert

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'raw-media'
const OUTPUT_DIR = 'public/products'
const MAX_BYTES = 200 * 1024

const VARIANTS = [
  { suffix: 'mobile', width: 480 },
  { suffix: 'tablet', width: 800 },
  { suffix: 'desktop', width: 1200 },
  { suffix: 'blur', width: 24 },
]

// Kaynak dosya (raw-media/) → hedef branş + ürün kimliği (src/data/products.ts ile eşleşir).
const MAPPING = [
  { source: '01-futbol.png', branchId: 'football', productId: 'ball' },
  { source: '02-kaleci-eldiveni.png', branchId: 'football', productId: 'goalkeeper-gloves' },
  { source: '03-civili-ayakkabi.png', branchId: 'athletics', productId: 'spikes' },
  { source: '04-yuzme-gozlugu.png', branchId: 'swimming', productId: 'goggles' },
]

async function convertVariant(inputPath, outPath, width) {
  let quality = width <= 24 ? 60 : 80
  let buffer = await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()

  while (buffer.length > MAX_BYTES && quality > 20) {
    quality -= 10
    buffer = await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
  }

  await sharp(buffer).toFile(outPath)
  return { size: buffer.length, quality }
}

async function main() {
  for (const entry of MAPPING) {
    const inputPath = path.join(SOURCE_DIR, entry.source)
    const outDir = path.join(OUTPUT_DIR, entry.branchId)
    await mkdir(outDir, { recursive: true })

    console.log(`\n${entry.source} → ${entry.branchId}/${entry.productId}`)
    for (const variant of VARIANTS) {
      const outPath = path.join(outDir, `${entry.productId}-${variant.suffix}.webp`)
      const { size, quality } = await convertVariant(inputPath, outPath, variant.width)
      const kb = (size / 1024).toFixed(1)
      const flag = size > MAX_BYTES ? '  ⚠ 200 KB üstü' : ''
      console.log(`  ${variant.suffix.padEnd(7)} ${String(variant.width).padStart(4)}px  q=${quality}  ${kb} KB${flag}`)
    }
  }
}

main()

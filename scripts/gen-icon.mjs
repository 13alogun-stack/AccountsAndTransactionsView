/**
 * Generates a 1024x1024 Ibra OS icon PNG using pure Node.js (no canvas).
 * Produces: public/icons/icon-1024.png
 * Then `pnpm tauri icon` will generate all required sizes.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { deflateSync } from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// CRC32
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  CRC_TABLE[i] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (const b of buf) crc = CRC_TABLE[(crc ^ b) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const d = Buffer.from(data);
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(d.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, d])), 0);
  return Buffer.concat([lenBuf, t, d, crcBuf]);
}

function makePNG(size, drawPixel) {
  // IHDR: width, height, bit-depth=8, color-type=6(RGBA), compression=0, filter=0, interlace=0
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Raw pixel data: 1 filter byte per row + RGBA per pixel
  const raw = Buffer.allocUnsafe(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 4)] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const offset = y * (1 + size * 4) + 1 + x * 4;
      const [r, g, b, a] = drawPixel(x, y, size);
      raw[offset] = r; raw[offset + 1] = g; raw[offset + 2] = b; raw[offset + 3] = a;
    }
  }

  const idat = deflateSync(raw, { level: 6 });

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function drawIbraOS(x, y, size) {
  const cx = size / 2;
  const cy = size / 2;

  // Rounded square background
  const margin = size * 0.05;
  const radius = size * 0.22;
  const left = margin, right = size - margin, top = margin, bottom = size - margin;
  const dx = Math.max(0, Math.max(left + radius - x, x - (right - radius)));
  const dy = Math.max(0, Math.max(top + radius - y, y - (bottom - radius)));
  const inShape = dx * dx + dy * dy <= radius * radius && x >= left && x < right && y >= top && y < bottom;

  if (!inShape) return [0, 0, 0, 0]; // transparent

  // Subtle gradient: dark navy
  const gradFactor = ((x + y) / (size * 2)) * 0.12;
  const bgR = Math.floor(17 + gradFactor * 255);
  const bgG = Math.floor(17 + gradFactor * 255);
  const bgB = Math.floor(24 + gradFactor * 40);

  // Gold color
  const goldR = 201, goldG = 168, goldB = 68;

  // Draw a bold diamond (rotated square) in the center
  const diamondSize = size * 0.28;
  const ddx = Math.abs(x - cx);
  const ddy = Math.abs(y - cy);
  const inDiamond = ddx + ddy <= diamondSize;

  // Inner diamond (cutout for ring effect)
  const innerDiamond = size * 0.14;
  const inInner = ddx + ddy <= innerDiamond;

  // Draw thick cross through center (inside diamond only)
  const barW = size * 0.055;
  const inCrossH = inDiamond && Math.abs(y - cy) <= barW;
  const inCrossV = inDiamond && Math.abs(x - cx) <= barW;

  if (inDiamond && !inInner) {
    // Gold diamond ring
    return [goldR, goldG, goldB, 255];
  }

  if (inCrossH || inCrossV) {
    // Gold cross at center
    return [goldR, goldG, goldB, 255];
  }

  // Small dot at center
  const centerDot = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= size * 0.025;
  if (centerDot) return [goldR, goldG, goldB, 255];

  return [bgR, bgG, bgB, 255];
}

// Generate 1024px icon
const iconDir = path.join(ROOT, 'public', 'icons');
mkdirSync(iconDir, { recursive: true });
mkdirSync(path.join(ROOT, 'src-tauri', 'icons'), { recursive: true });

console.log('Generating 1024x1024 icon...');
const icon1024 = makePNG(1024, drawIbraOS);
writeFileSync(path.join(iconDir, 'icon-1024.png'), icon1024);
writeFileSync(path.join(ROOT, 'src-tauri', 'icons', 'icon-source.png'), icon1024);
console.log('✓ public/icons/icon-1024.png');
console.log('✓ src-tauri/icons/icon-source.png');

// Generate smaller sizes for PWA
for (const size of [192, 512]) {
  console.log(`Generating ${size}x${size} icon...`);
  const png = makePNG(size, drawIbraOS);
  writeFileSync(path.join(iconDir, `icon-${size}.png`), png);
  console.log(`✓ public/icons/icon-${size}.png`);
}

// Generate Tauri icon sizes
const tauriSizes = [
  { size: 32, name: '32x32.png' },
  { size: 128, name: '128x128.png' },
  { size: 256, name: '128x128@2x.png' },
];
for (const { size, name } of tauriSizes) {
  const png = makePNG(size, drawIbraOS);
  writeFileSync(path.join(ROOT, 'src-tauri', 'icons', name), png);
  console.log(`✓ src-tauri/icons/${name}`);
}

console.log('\n✅ All icons generated.');

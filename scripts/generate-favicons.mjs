import fs from 'fs';
import sharp from 'sharp';

async function generate() {
  const svgPath = 'src/app/icon.svg';
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Generate multi-size favicon.ico (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map(size =>
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);

  let offset = 6 + sizes.length * 16;
  const dirEntries = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  fs.writeFileSync('public/favicon.ico', icoBuffer);

  // 2. Copy icon.svg to public
  fs.copyFileSync('src/app/icon.svg', 'public/icon.svg');

  // 3. Generate apple-icon.png (180x180)
  const appleBuf = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync('src/app/apple-icon.png', appleBuf);
  fs.writeFileSync('public/apple-touch-icon.png', appleBuf);

  console.log('Successfully generated all favicons and icons!');
}

generate().catch(console.error);

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ICON_SRC   = path.join(__dirname, '../assets/voiceforall_icon.png');
const SPLASH_SRC = path.join(__dirname, '../assets/voiceforall_splash.png');
const RES        = path.join(__dirname, '../android/app/src/main/res');

const iconSizes = [
  { folder: 'mipmap-mdpi',    size: 48  },
  { folder: 'mipmap-hdpi',    size: 72  },
  { folder: 'mipmap-xhdpi',   size: 96  },
  { folder: 'mipmap-xxhdpi',  size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

const splashSizes = [
  { folder: 'drawable-mdpi',    w: 320,  h: 480  },
  { folder: 'drawable-hdpi',    w: 480,  h: 800  },
  { folder: 'drawable-xhdpi',   w: 720,  h: 1280 },
  { folder: 'drawable-xxhdpi',  w: 960,  h: 1600 },
  { folder: 'drawable-xxxhdpi', w: 1280, h: 1920 },
];

async function run() {
  console.log('🚀 Generating icons and splash screens...\n');

  // Generate icons
  for (const { folder, size } of iconSizes) {
    const dir = path.join(RES, folder);
    fs.mkdirSync(dir, { recursive: true });
    await sharp(ICON_SRC).resize(size, size).toFile(path.join(dir, 'ic_launcher.png'));
    await sharp(ICON_SRC).resize(size, size).toFile(path.join(dir, 'ic_launcher_round.png'));
    console.log(`✅ Icon ${size}x${size}  →  ${folder}`);
  }

  console.log('');

  // Generate splash screens
  for (const { folder, w, h } of splashSizes) {
    const dir = path.join(RES, folder);
    fs.mkdirSync(dir, { recursive: true });
    await sharp(SPLASH_SRC)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .toFile(path.join(dir, 'launch_screen.png'));
    console.log(`✅ Splash ${w}x${h}  →  ${folder}`);
  }

  console.log('\n🎉 All images generated successfully!');
  console.log('👉 Now follow Step 5 in the guide to wire up the splash screen.\n');
}

run().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

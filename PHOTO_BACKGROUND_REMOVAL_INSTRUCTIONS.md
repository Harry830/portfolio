# How to Remove Background from Your Photo

## Quick Steps:

### Option 1: Remove.bg (Easiest - Free)
1. Go to https://www.remove.bg/
2. Click "Upload Image"
3. Select `public/profile.jpg`
4. Wait 5 seconds for automatic background removal
5. Click "Download" (free version is fine)
6. Save the downloaded file as `profile-cutout.png`
7. Move it to the `public/` folder in your portfolio

### Option 2: Photopea (Free Photoshop Alternative)
1. Go to https://www.photopea.com/
2. Open `public/profile.jpg`
3. Use the "Magic Wand" or "Quick Selection" tool
4. Select the background
5. Press Delete
6. File → Export As → PNG
7. Save as `profile-cutout.png` in the `public/` folder

### Option 3: Canva (Free)
1. Go to https://www.canva.com/
2. Create a new design
3. Upload `public/profile.jpg`
4. Click "Edit photo" → "Background Remover"
5. Download as PNG
6. Save as `profile-cutout.png` in the `public/` folder

## After Removing Background:

1. Save the cutout image as: `public/profile-cutout.png`
2. The website will automatically use it!
3. If the file doesn't exist, it falls back to the original photo

## What the Code Does:

The hero section now looks for `/profile-cutout.png` first. If it doesn't find it, it automatically falls back to your regular profile photo. So the site works either way!

The cutout will have a much more dramatic "popout" effect with:
- Floating geometric shapes behind
- 3D shadow layers
- Subtle animations
- Amber accent corners
- Professional depth and dimension

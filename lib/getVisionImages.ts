import fs from 'fs';
import path from 'path';

/**
 * Automatically reads all image files from the vision folder
 * Returns an array of image paths relative to the public folder
 */
export function getVisionImages(): string[] {
  try {
    const visionFolderPath = path.join(process.cwd(), 'public', 'images', 'vision', 'horizontal_images');
    
    // Check if folder exists
    if (!fs.existsSync(visionFolderPath)) {
      console.warn('Vision horizontal_images folder not found:', visionFolderPath);
      return [];
    }

    // Read all files in the horizontal_images folder
    const files = fs.readdirSync(visionFolderPath);
    
    // Filter for image files (common image extensions)
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Sort files alphabetically for consistent ordering
    imageFiles.sort();

    // Return paths relative to public folder (as used in Next.js)
    return imageFiles.map(file => `/images/vision/horizontal_images/${file}`);
  } catch (error) {
    console.error('Error reading vision images:', error);
    return [];
  }
}





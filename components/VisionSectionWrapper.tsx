import { getVisionImages } from "@/lib/getVisionImages";
import VisionSection from "./VisionSection";

/**
 * Server component wrapper that automatically loads all images from the vision folder
 * and passes them to the client component
 */
export default function VisionSectionWrapper() {
  const images = getVisionImages();
  
  return <VisionSection images={images} />;
}






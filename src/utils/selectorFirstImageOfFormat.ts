import { ImageContext } from '../model/image-context';

export function selectorFirstImageOfFormat(
    images: ImageContext[],
    imageFormat: string,
    imageType: string
): ImageContext | undefined {
  return (images) ? images.find(x => x.format === imageFormat && x.imageType === imageType) : undefined;

}

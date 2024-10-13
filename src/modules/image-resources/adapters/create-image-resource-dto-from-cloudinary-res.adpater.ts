import { CreateImageResourceDto } from '../dto';
import { ResourceProvider } from '../constants';
import { CloudinaryImage } from 'src/modules/cloudinary/interfaces';

export function createImageResourceDtoFromCloudinaryResAdapter(data?: CloudinaryImage): CreateImageResourceDto | null {
  if (!data) return null;

  return {
    url: data.url,
    fileName: data.publicId || null,
    publicId: data.publicId || null,
    width: data.width || null,
    height: data.height || null,
    format: data.format || null,
    size: data.bytes || null,
    provider: ResourceProvider.Cloudinary,
  };
}

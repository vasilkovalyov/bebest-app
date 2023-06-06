import { File } from 'buffer';

// const cloudinary = require('../utils/cloudinary');
import cloudinary from './cloudinary';

// avatarImage base64 type
export async function uploadAvatar(avatarImage: string) {
  const res = await cloudinary.uploader.upload(avatarImage, {
    folder: 'bebest',
    width: 120,
    crop: 'scale',
  });
  return res;
}

export async function uploadVideo(video: string) {
  const res = await cloudinary.uploader.upload(video, {
    folder: 'bebest/video',
    resource_type: 'video',
  });
  return res;
}

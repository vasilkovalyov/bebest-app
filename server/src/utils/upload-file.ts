import { File } from 'buffer';

const cloudinary = require('../utils/cloudinary');

// avatarImage base64 type
export async function uploadAvatar(avatarImage: File) {
  const res = await cloudinary.uploader.upload(avatarImage, {
    folder: 'bebest',
    width: 120,
    crop: 'scale',
  });
  return res;
}

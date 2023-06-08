import cloudinary from './cloudinary';

// avatarImage base64 type
export async function uploadAvatar(avatarImage: string) {
  const res = await cloudinary.uploader.upload(avatarImage, {
    folder: 'bebest/images',
    width: 120,
    crop: 'scale',
  });
  return res;
}

export async function uploadVideo(video: string) {
  const res = await cloudinary.uploader.upload(video, {
    folder: 'bebest/videos',
    resource_type: 'video',
  });
  return res;
}

export async function uploadCertificate(image: string) {
  const res = await cloudinary.uploader.upload(image, {
    folder: 'bebest/certificates',
  });
  return res;
}

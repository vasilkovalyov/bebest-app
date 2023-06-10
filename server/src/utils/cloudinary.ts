const CLOUDINARY_NAME = 'dh5dvguqw';
const CLOUDINARY_KEY = '971891743274228';
const CLOUDINARY_SECRET = 'ubFMeThpfbgowAlso2dBfzMEILc';

import { v2 as cloudinary, VideoFormat } from 'cloudinary';

export interface ICloudinaryVideo {
  asset_id: string;
  public_id: string;
  width: number;
  height: number;
  format: VideoFormat;
  resource_type: string;
  created_at: string;
  pages: 0;
  bytes: number;
  placeholder: false;
  url: string;
  secure_url: string;
  playback_url: string;
  folder: string;
  is_audio: boolean;
  duration: number;
  rotation: number;
  original_filename: string;
}

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export default cloudinary;

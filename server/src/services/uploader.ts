import { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import cloudinary from '../utils/cloudinary';

class Uploader {
  private _fileName: string;
  private _options: UploadApiOptions;

  constructor(fileName: string, options: UploadApiOptions) {
    this._fileName = fileName;
    this._options = options;
  }
}

class UploadAvatar {
  private _filePath: string;
  private _options: UploadApiOptions;

  constructor(filePath: string, options: UploadApiOptions) {
    this._filePath = filePath;
    this._options = {
      folder: 'bebest/images',
      width: 120,
      crop: 'scale',
      ...options,
    };
  }

  // async uploadFile() {
  //   try {
  //     const response = await cloudinary.uploader.upload(
  //       this._filePath,
  //       this._options
  //     );
  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}

// class UploadAvatar extends Uploader<UploadApiResponse> {
//   uploader: Uploader<UploadApiResponse>;
//   options: UploadApiOptions;

//   constructor(
//     uploader: Uploader<UploadApiResponse>,
//     options: UploadApiOptions
//   ) {
//     super();
//     this.uploader = uploader;
//     this.options = options;
//   }

//   async uploadFile(filePath: string): Promise<UploadApiResponse> {
//     const res = await cloudinary.uploader.upload(avatarImage, {
//       folder: 'bebest/images',
//       width: 120,
//       crop: 'scale',
//     });
//     return res;
//   }
//   // removeFile(): W {}
// }

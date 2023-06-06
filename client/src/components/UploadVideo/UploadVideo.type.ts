export interface IUploadVideoProps {
  video?: string | null
  onChange: (fileList: FileList) => void
}

// libs
import { useRef, ChangeEvent } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DownloadIcon from '@mui/icons-material/Download'

// relate utils
import { IUploadImageProps } from './UploadImage.type'
import Image from 'next/image'

function UploadImage({
  image,
  width = '200px',
  height = 'auto',
  onChange,
}: IUploadImageProps) {
  const refFieldInputFile = useRef<HTMLInputElement>(null)

  function handleChangeImageFile(e: ChangeEvent<HTMLInputElement>) {
    const file: File | null = e.currentTarget.files && e.currentTarget.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as File)
    fileReader.onloadend = () => {
      const imageString: string = fileReader.result as string
      onChange(imageString || '')
    }
  }

  return (
    <Box>
      {image ? (
        // <Image
        //   src={image || ''}
        //   width={0}
        //   height={0}
        //   alt="image"
        //   style={{
        //     width: width,
        //     height: height,
        //   }}
        // />
        <img src={image || ''} alt="image" width={200} />
      ) : null}
      <Box marginTop={2}>
        <Button onClick={() => refFieldInputFile.current?.click()} size="small">
          <DownloadIcon />
          Upload
        </Button>
        <input
          ref={refFieldInputFile}
          hidden
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
          onChange={handleChangeImageFile}
        />
      </Box>
    </Box>
  )
}

export default UploadImage

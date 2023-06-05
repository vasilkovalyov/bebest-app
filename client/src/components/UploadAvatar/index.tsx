// libs
import { useRef, ChangeEvent } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import DownloadIcon from '@mui/icons-material/Download'

// relate utils
import { IUploadAvatarProps } from './UploadAvatar.type'

function UploadAvatar({ image, onChange }: IUploadAvatarProps) {
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
      <Avatar
        src={image || ''}
        sx={{
          width: 100,
          height: 100,
        }}
      />
      <Box marginTop={2}>
        <Button onClick={() => refFieldInputFile.current?.click()} size="small">
          <DownloadIcon />
          Upload
        </Button>
        <input
          ref={refFieldInputFile}
          hidden
          type="file"
          onChange={handleChangeImageFile}
        />
      </Box>
    </Box>
  )
}

export default UploadAvatar

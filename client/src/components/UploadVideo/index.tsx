// libs
import { useRef, useState, ChangeEvent } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DownloadIcon from '@mui/icons-material/Download'

// relate utils
import { IUploadVideoProps } from './UploadVideo.type'

function UploadVideo({ video, onChange }: IUploadVideoProps) {
  const refFieldInputFile = useRef<HTMLInputElement>(null)
  const [source, setSource] = useState<string | null>(video || null)

  function handleChangeVideoFile(e: ChangeEvent<HTMLInputElement>) {
    setSource(null)
    if (e.currentTarget.files) {
      const url = URL.createObjectURL(e.currentTarget.files[0])
      setSource(url)
      onChange(e.currentTarget.files)
    }
  }
  return (
    <Box>
      {source ? (
        <video width="100%" height={300} controls>
          <source src={source} type="video/mp4" />
        </video>
      ) : null}
      <Box marginTop={2} textAlign="center">
        <Button onClick={() => refFieldInputFile.current?.click()} size="small">
          <DownloadIcon />
          Upload video
        </Button>
        <input
          ref={refFieldInputFile}
          hidden
          type="file"
          accept=".mov,.mp4"
          onChange={handleChangeVideoFile}
        />
      </Box>
    </Box>
  )
}

export default UploadVideo

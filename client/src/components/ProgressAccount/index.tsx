// libs
import { useEffect } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// hooks
import { useProgressAccount } from './useProgressAccount'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import ListItemText from '@mui/material/ListItemText'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function ProgressAccount() {
  const progressAccountStore = useAppSelector(
    (store) => store.teacher.user.progress_account
  )
  const {
    progressInfo,
    toggleContent,
    setToggleContent,
    getGeneratedProgressInfo,
  } = useProgressAccount(progressAccountStore)

  useEffect(() => {
    getGeneratedProgressInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressAccountStore])

  return (
    <Box>
      <Typography variant="h6">
        Fill out your profile 100% so that students can find you
      </Typography>
      {progressAccountStore?.profile_progress ? (
        <Box marginBottom={2}>
          <Typography>{progressAccountStore.profile_progress}%</Typography>
          <LinearProgress
            variant="determinate"
            color="success"
            value={progressAccountStore.profile_progress}
          />
        </Box>
      ) : null}

      <Box marginBottom={2}>
        <Button
          fullWidth
          size="small"
          onClick={() => setToggleContent(!toggleContent)}
        >
          {toggleContent ? 'Close details' : 'Show details'}
        </Button>
      </Box>

      {toggleContent ? (
        <>
          {progressInfo.length &&
            progressInfo.map((item, index) => (
              <ListItemText key={index}>
                <Stack direction="row" gap={1} alignItems="center">
                  <CheckCircleIcon
                    color={item.props.value ? 'success' : 'info'}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Typography
                    variant="body2"
                    style={{
                      textDecoration: item.props.value ? 'line-through' : '',
                    }}
                    fontWeight={400}
                    marginBottom={0}
                  >
                    {item.props.title}
                  </Typography>
                </Stack>
              </ListItemText>
            ))}
        </>
      ) : null}
    </Box>
  )
}

export default ProgressAccount

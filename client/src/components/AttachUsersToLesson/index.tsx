// libs
import { useEffect, useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import WarningIcon from '@/components/Generic/WarningIcon'

import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import UserListLesson from '@/components/UserListLesson'
import { IUserForLesson } from '@/components/UserListLesson/UserListLesson'
import AutocompleteUserListLesson from '@/components/AutocompleteUserListLesson'

//relate utils
import { IAttachUsersToLessonProps } from './AttachUsersToLesson.type'

const defaultUser: IUserForLesson = {
  _id: '',
  fullname: '',
  avatar: '',
}

function AttachUsersToLesson({
  loading,
  loadingUsers,
  options,
  users,
  notification,
  userRole,
  modal,
  deleteUserFromLesson,
  onHandleAddUser,
  onStart,
}: IAttachUsersToLessonProps) {
  const [selectedUser, setSelectedUser] = useState<IUserForLesson>(defaultUser)
  const [modalOpen, setModalOpen] = useState<boolean>(modal)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(notification)

  function openDropdown() {
    if (options.length) return
    onStart()
  }

  function onOpenModal(props: IUserForLesson) {
    setSelectedUser(props)
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false)
  }

  useEffect(() => {
    setSnackbarOpen(notification)
  }, [notification])

  useEffect(() => {
    setModalOpen(modal)
  }, [modal])

  return (
    <ContainerWithShadow
      paddingSize="sm"
      className="attach-student-to-lesson-block"
    >
      <Box marginBottom={2}>
        <AutocompleteUserListLesson
          loading={loading}
          openDropdown={() => openDropdown()}
          options={options as unknown as IUserForLesson[]}
          onHandleSelectUser={(prop) => {
            setSelectedUser(prop)
          }}
        />
        <Button
          size="small"
          variant="contained"
          onClick={() => onHandleAddUser(selectedUser)}
          disabled={selectedUser._id === ''}
        >
          Add {userRole}
        </Button>
      </Box>

      {loadingUsers ? (
        <Box textAlign="center">
          <CircularProgress size={20} />
        </Box>
      ) : (
        <>
          {users && users.length ? (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2">List of {userRole}s</Typography>
                <Typography variant="subtitle2">
                  {users.length} {userRole}
                  {users.length > 1 ? 's' : ''}
                </Typography>
              </Stack>
              <UserListLesson users={users} onHandleDelete={onOpenModal} />
            </>
          ) : null}
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity="error"
          sx={{ width: '100%' }}
        >
          {userRole} already exist in the list!
        </Alert>
      </Snackbar>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color="#000000"
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}>
              <WarningIcon />
            </Box>
            <Typography variant="h5" className="ta-c">
              Do you really want to remove {userRole} <br /> {'"'}
              {selectedUser.fullname}
              {'"'}
              <br />
              from lesson?
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              marginTop={2}
              marginBottom={2}
              spacing={3}
            >
              <Button
                size="small"
                variant="contained"
                onClick={handleCloseModal}
              >
                decline
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => deleteUserFromLesson(selectedUser._id)}
              >
                accept
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </ContainerWithShadow>
  )
}
export default AttachUsersToLesson

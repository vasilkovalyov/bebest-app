//libs
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

// material ui components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Modal from '@mui/material/Modal'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Button from '@mui/material/Button'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import LessonModuleForm from '@/components/Forms/LessonModule'

//other utils
import dateFormat from '@/constants/date-forma'
import {
  ITeacherLessonModule,
  ITeacherLessonModuleEditableProps,
} from '@/types/teacher/teacher-lesson-module'
import colors from '@/constants/colors'
import teacherLessonModuleService from '@/services/teacher-lesson-module'

// relate utils
import { ILessonModulesProps } from './LessonModules.type'
import WarningIcon from '../Generic/WarningIcon'

type ModeModalType = 'update' | 'delete'

interface IRowProps extends ITeacherLessonModule {
  onHandleUpdate: (props: ITeacherLessonModule) => void
  onHandleRemove: (lessonModuleId: string) => void
}

function Row({ onHandleRemove, onHandleUpdate, ...props }: IRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.topic}
        </TableCell>
        <TableCell>
          {dayjs(props.start_date).format(dateFormat.secondary)}
        </TableCell>
        <TableCell>{props.time_start}</TableCell>
        <TableCell>{props.duration_time}</TableCell>
        <TableCell>
          <Stack direction="row">
            <Button size="small" onClick={() => onHandleUpdate(props)}>
              <Icon icon={IconEnum.EDIT} size={16} />
            </Button>
            <Button
              size="small"
              onClick={() => onHandleRemove(props._id as string)}
            >
              <Icon icon={IconEnum.BIN} size={16} />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} paddingY={2}>
              <Typography variant="body2" marginBottom={0}>
                {props.rich_text}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

function LessonModules({ items }: ILessonModulesProps) {
  const { query } = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modeModal, setModeModal] = useState<ModeModalType | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [lessonModules, setLessonModules] = useState<
    ITeacherLessonModule[] | []
  >(items)
  const [selectedLessonModule, setSelectedLessonModule] =
    useState<ITeacherLessonModule | null>(null)
  const [isLoadingUpdateButton, setIsLoadingUpdateButton] =
    useState<boolean>(false)
  const [isLoadingRemoveButton, setIsLoadingRemoveButton] =
    useState<boolean>(false)

  function handleCloseModal() {
    setModalOpen(false)
    setModeModal(null)
    setSelectedId(null)
  }

  function openModalUpdateModule(props: ITeacherLessonModule) {
    setModeModal('update')
    setSelectedLessonModule(props)
    setModalOpen(true)
  }

  function openModalRemoveModule(moduleId: string) {
    setModeModal('delete')
    setSelectedId(moduleId)
    setModalOpen(true)
  }

  async function onHandleUpdateLessonModule(
    props: ITeacherLessonModuleEditableProps
  ) {
    if (!selectedLessonModule) return
    setIsLoadingUpdateButton(true)
    await teacherLessonModuleService.updateLessonModule({
      _id: selectedLessonModule._id,
      ...props,
    })
    setIsLoadingUpdateButton(false)
    handleCloseModal()
    loadLessonModules()
  }

  async function onHandleRemoveLessonModule() {
    setIsLoadingRemoveButton(true)
    await teacherLessonModuleService.deleteLessonModuleById(
      query._id as string,
      selectedId as string
    )
    setIsLoadingRemoveButton(false)
    handleCloseModal()
    loadLessonModules()
  }

  async function loadLessonModules() {
    const lessonId = query._id as string
    const responseLessonModules =
      await teacherLessonModuleService.getModulesLesson(lessonId)
    setLessonModules(responseLessonModules.data)
  }

  useEffect(() => {
    setLessonModules(items)
  }, [items])

  return (
    <Box className="lesson-modules">
      {lessonModules.length ? (
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Topic module</TableCell>
                <TableCell>Start date</TableCell>
                <TableCell>Start time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonModules.map((item) => (
                <Row
                  key={item._id}
                  {...item}
                  onHandleRemove={(id) => openModalRemoveModule(id)}
                  onHandleUpdate={(props) => openModalUpdateModule(props)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center">
          <Box marginBottom={2}>
            <Icon icon={IconEnum.LESSONS} size={40} color={colors.dark_blue} />
          </Box>
          <Typography variant="h5">No modules in the lesson</Typography>
        </Box>
      )}

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color={colors.black_color}
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            {modeModal === 'update' ? (
              <>
                <Typography variant="h4">
                  Add new module for the lesson
                </Typography>
                <LessonModuleForm
                  mode="update"
                  isLoading={isLoadingUpdateButton}
                  initialData={selectedLessonModule}
                  onSubmit={onHandleUpdateLessonModule}
                />
              </>
            ) : null}
            {modeModal === 'delete' ? (
              <>
                <Box textAlign="center" marginBottom={2}>
                  <WarningIcon />
                </Box>
                <Typography variant="h4" className="ta-c" marginBottom={2}>
                  Do you really want to remove module for the lesson?
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  marginTop={2}
                  marginBottom={2}
                  spacing={3}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCloseModal}
                  >
                    decline
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={isLoadingRemoveButton}
                    onClick={onHandleRemoveLessonModule}
                  >
                    accept
                  </Button>
                </Stack>
              </>
            ) : null}
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default LessonModules

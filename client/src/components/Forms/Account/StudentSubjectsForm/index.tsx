// libs
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

//redux
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks'
import { fetchStudentSubjects } from '@/redux/slices/student-subjects'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

//custom components
import { IconEnum } from '@/types/icons'
import Icon from '@/components/Generic/Icon'
import WarningIcon from '@/components/Generic/WarningIcon'

// relate utils
import { IStudentSubjectsFormProps } from './StudentSubjectsForm.type'
import { StudentSubjectsFormValidationSchema } from './StudentSubjectsForm.validation'

// other utils
import colors from '@/constants/colors'
import studentSubjectsService from '@/services/student-subjects'
import {
  IStudentSubject,
  IStudentSubjects,
} from '@/types/student/student-subject'

const defaultStudentSubjects: IStudentSubject = {
  subject_study: '',
  level_mastery_subject: '',
}

const defaultInitialData: IStudentSubjects = {
  subjects: [defaultStudentSubjects],
}

function StudentSubjectsForm({ onHandleClose }: IStudentSubjectsFormProps) {
  const dispatch = useDispatch<any>()
  const subjectsStore = useAppSelector(
    (store) => store.studentSubjects.subjects
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectRemoveSubjectId, setSelectRemoveSubjectId] = useState<{
    id: string
    index: number
  }>({
    id: '',
    index: -1,
  })

  const defaultFields = subjectsStore.length ? defaultInitialData.subjects : []

  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IStudentSubjects>({
    mode: 'onSubmit',
    defaultValues: {
      subjects: [...(subjectsStore || []), ...defaultFields],
    },
    resolver: yupResolver(StudentSubjectsFormValidationSchema),
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'subjects',
  })

  async function handleAddSubject(data: IStudentSubjects) {
    try {
      const subject = { ...data.subjects[data.subjects.length - 1] }
      await studentSubjectsService.createSubject(subject)

      append({
        subject_study: '',
        level_mastery_subject: '',
      })

      dispatch(fetchStudentSubjects())
    } catch (e) {
      console.log(e)
    }
  }

  async function handleOpenModal(id: string, index: number) {
    setSelectRemoveSubjectId({
      id,
      index,
    })
    setModalOpen(true)
  }

  async function handleRemoveSubject() {
    try {
      await studentSubjectsService.deleteSubject(selectRemoveSubjectId.id)
      remove(selectRemoveSubjectId.index)
      dispatch(fetchStudentSubjects())
      setSelectRemoveSubjectId({
        id: '',
        index: -1,
      })
    } catch (e) {
      console.log(e)
    }
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function handleAddFormStudentSubject() {
    setValue('subjects', [defaultStudentSubjects])
  }

  return (
    <Box>
      <form className="form">
        {getValues().subjects.length ? (
          <Box>
            {fields.map(({ id, _id }, index) => (
              <Box key={id}>
                <Box maxWidth={400}>
                  <Box marginBottom={2}>
                    <TextField
                      {...register(`subjects.${index}.subject_study`)}
                      id={`subjects-${index}-subject_study`}
                      type="text"
                      label="Subject"
                      variant="standard"
                      className="form-field"
                      placeholder="Example: javascript, english, react e.g"
                      fullWidth
                      disabled={fields.length - 1 > index}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.subjects?.[index]?.subject_study?.message}
                      helperText={
                        errors.subjects?.[index]?.subject_study?.message
                      }
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <TextField
                      {...register(`subjects.${index}.level_mastery_subject`)}
                      id={`subjects-${index}-level_mastery_subject`}
                      type="text"
                      label="The level of mastery of the subject"
                      variant="standard"
                      className="form-field"
                      fullWidth
                      multiline
                      minRows={4}
                      disabled={fields.length - 1 > index}
                      InputLabelProps={{ shrink: true }}
                      error={
                        !!errors.subjects?.[index]?.level_mastery_subject
                          ?.message
                      }
                      helperText={
                        errors.subjects?.[index]?.level_mastery_subject?.message
                      }
                    />
                  </Box>
                </Box>
                {fields.length - 1 > index ? (
                  <>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => handleOpenModal(_id || '', index)}
                    >
                      <Box
                        component="span"
                        marginRight={1}
                        display="inline-block"
                        style={{
                          verticalAlign: 'middle',
                        }}
                      >
                        <Icon
                          icon={IconEnum.BIN}
                          color={colors.primary}
                          size={16}
                        />
                      </Box>
                      <Box
                        component="span"
                        display="inline-block"
                        style={{
                          verticalAlign: 'middle',
                          paddingTop: 4,
                        }}
                      >
                        Remove
                      </Box>
                    </Button>
                    <Box marginTop={1} marginBottom={4}>
                      <Divider />
                    </Box>
                  </>
                ) : null}
              </Box>
            ))}
            <Box
              display="flex"
              alignItems="center"
              marginBottom={3}
              maxWidth={400}
            >
              <Stack direction="row" gap={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  onClick={handleSubmit(handleAddSubject)}
                >
                  <Box
                    component="span"
                    marginRight={1}
                    display="inline-block"
                    style={{
                      verticalAlign: 'middle',
                    }}
                  >
                    <Icon
                      icon={IconEnum.PLUS}
                      color={colors.primary}
                      size={16}
                    />
                  </Box>
                  <Box
                    component="span"
                    display="inline-block"
                    style={{
                      verticalAlign: 'middle',
                      paddingTop: 2,
                    }}
                  >
                    Add one more subject
                  </Box>
                </Button>
                <Button variant="outlined" size="small" onClick={onHandleClose}>
                  Close
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleAddFormStudentSubject}
          >
            <Box
              component="span"
              marginRight={1}
              display="inline-block"
              style={{
                verticalAlign: 'middle',
              }}
            >
              <Icon icon={IconEnum.PLUS} color={colors.white} size={16} />
            </Box>
            <Box
              component="span"
              display="inline-block"
              style={{
                verticalAlign: 'middle',
                paddingTop: 2,
              }}
            >
              Add work experience
            </Box>
          </Button>
        )}
      </form>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button className="modal-box__button-close" onClick={onHandleClose}>
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
            <Typography variant="h4" className="ta-c" marginBottom={2}>
              Do you really want to remove subject?
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
                onClick={handleRemoveSubject}
              >
                accept
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default StudentSubjectsForm

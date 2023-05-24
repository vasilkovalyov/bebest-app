// libs
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

//custom components
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import Icon from '@/components/Generic/Icon'

// relate utils
import { IStudentEducationInfo } from './StudentEducationInfoForm.type'
import { StudentEducationInfoFormValidationSchema } from './StudentEducationInfoForm.validation'

import colors from '@/constants/colors'
import { Stack } from '@mui/material'

const initialData: IStudentEducationInfo = {
  subjects: [
    {
      subject_study: '',
      level_mastery_subject: '',
    },
  ],
}

function AccountStudentForm({ onHandleClose }: { onHandleClose: () => void }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IStudentEducationInfo>({
    mode: 'onSubmit',
    defaultValues: initialData,
    resolver: yupResolver(StudentEducationInfoFormValidationSchema),
  })

  const {
    fields,
    remove: remove,
    append: append,
  } = useFieldArray({
    control,
    name: 'subjects',
  })

  function handleAddSubject(data: IStudentEducationInfo) {
    append({
      subject_study: '',
      level_mastery_subject: '',
    })
  }

  return (
    <Box>
      <form className="form">
        {fields.map(({ id }, index) => (
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
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.subjects?.[index]?.subject_study?.message}
                  helperText={errors.subjects?.[index]?.subject_study?.message}
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
                  InputLabelProps={{ shrink: true }}
                  error={
                    !!errors.subjects?.[index]?.level_mastery_subject?.message
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
                  onClick={() => remove(index)}
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

        <Box display="flex" alignItems="center" marginBottom={3} maxWidth={400}>
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
                <Icon icon={IconEnum.PLUS} color={colors.primary} size={16} />
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
      </form>
    </Box>
  )
}

export default AccountStudentForm

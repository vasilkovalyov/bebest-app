// libs
import { useState } from 'react';

//redux
import { useAppSelector } from '@/redux/hooks';

// material ui components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

//custom components
import Icon from '@/components/Generic/Icon';
import { IconEnum } from '@/types/icons';
import StudentSubjectsForm from '@/components/Forms/Account/StudentSubjectsForm';
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow';
import PreviewStudentSubjects from '@/components/Previews/PreviewStudentSubjects';

function StudentSubjectsBlock() {
  const [isEdit, seIsEdit] = useState<boolean>(false);

  const studentSubjectsStore = useAppSelector((store) => store.studentSubjects);

  function onHandleClose() {
    seIsEdit(!isEdit);
  }

  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography
        marginBottom={3}
        variant="h5"
        className="section-admin__heading"
      >
        Information education
      </Typography>
      <Box marginBottom={3}>
        <Divider />
      </Box>
      <Box paddingY={4} className="box-account">
        <Stack direction="row" className="box-account__controllers">
          <Button
            onClick={() => seIsEdit(!isEdit)}
            aria-label="button-open-edit-subject-form"
          >
            {!isEdit ? <Icon icon={IconEnum.EDIT} size={18} /> : 'Close'}
          </Button>
        </Stack>
        {studentSubjectsStore.loading ? (
          <Box textAlign="center">
            <Fade in={true} unmountOnExit>
              <CircularProgress />
            </Fade>
          </Box>
        ) : (
          <Box>
            {!isEdit ? (
              <PreviewStudentSubjects items={studentSubjectsStore.subjects} />
            ) : (
              <StudentSubjectsForm onHandleClose={onHandleClose} />
            )}
          </Box>
        )}
      </Box>
    </ContainerWithShadow>
  );
}

export default StudentSubjectsBlock;

// material ui components
import Typography from '@mui/material/Typography'

//custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import StudentEducationInfo from '@/components/Student/StudentEducationInfo'

function StudentEducationInfoBlock() {
  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography
        marginBottom={3}
        variant="h5"
        className="MuiTypography section-admin__heading"
      >
        Information education
      </Typography>
      <StudentEducationInfo />
    </ContainerWithShadow>
  )
}

export default StudentEducationInfoBlock

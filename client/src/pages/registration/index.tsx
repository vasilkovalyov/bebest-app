// libs
import { useState } from 'react'
import Link from 'next/link'

// material ui components
import RegistrationStudentForm from '@/components/Forms/Registration/RegistrationStudent'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

// custom components
import Layout from '@/layouts/Layout'
import TabPanel from '@/components/Generic/TabPanel'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import { IRegistrationStudent } from '../../components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'

// other utils
import { UserRole } from '@/types/role'
import studentService from '../../services/student'
import { AxiosError } from 'axios'

export default function Registration() {
  const [tabValue, setTabValue] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function handleRegistration<T extends IRegistrationStudent>(
    role: UserRole,
    data: T
  ) {
    try {
      setIsLoading(true)
      if (role === 'student') {
        const response = await studentService.registrationStudent(data as T)
        setSuccessMessage(response.data.message)
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data.message)
      }
    }
  }

  return (
    <Layout className="page-registration">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Link href="/" className="breadcrumbs__link">
            Home
          </Link>
          <Typography
            variant="body1"
            component="span"
            className="breadcrumbs__text"
          >
            Registration
          </Typography>
        </Breadcrumbs>

        <Typography
          variant="h3"
          className="MuiTypography ta-c"
          marginBottom={3}
        >
          Registration
        </Typography>
        {successMessage === null ? (
          <Box
            maxWidth={400}
            marginBottom={8}
            margin={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <ContainerWithShadow className="container--registration">
              <Box className="registration-switcher">
                <Box marginBottom={2}>
                  <Typography marginBottom={1} textAlign="center" variant="h6">
                    Register as:
                  </Typography>
                  <Tabs
                    className="registration-switcher__tabs"
                    value={tabValue}
                    onChange={(_, value: number) => setTabValue(value)}
                  >
                    <Tab
                      className="registration-switcher__tab-item"
                      value={0}
                      label="Student"
                    />
                    <Tab
                      className="registration-switcher__tab-item"
                      value={1}
                      label="Teacher"
                    />
                    <Tab
                      className="registration-switcher__tab-item"
                      value={2}
                      label="Company"
                    />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <Typography
                    marginBottom={2}
                    textAlign="center"
                    variant="subtitle2"
                  >
                    A student can study, participate in free and paid workshops,
                    courses and book individual lessons
                  </Typography>
                  <RegistrationStudentForm
                    onSubmit={(props) => handleRegistration('student', props)}
                    isLoading={isLoading}
                    validationMessage={errorMessage}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Typography
                    marginBottom={2}
                    textAlign="center"
                    variant="subtitle2"
                  >
                    A mentor can create and conduct workshops and individual
                    classes with students, on a paid or free basis
                  </Typography>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <Typography
                    marginBottom={2}
                    textAlign="center"
                    variant="subtitle2"
                  >
                    The company has opportunities to create courses, register,
                    appoint mentors and conduct courses on a paid and free basis
                  </Typography>
                </TabPanel>
              </Box>
            </ContainerWithShadow>
          </Box>
        ) : (
          <Box textAlign="center" marginBottom={8}>
            <Typography marginBottom={2}>{successMessage}</Typography>
            <Link
              href="/"
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-sghohy-MuiButtonBase-root-MuiButton-root"
            >
              Ok
            </Link>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

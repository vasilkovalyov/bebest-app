// libs
import { useState } from 'react'
import Link from 'next/link'

// material ui components
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// custom components
import Layout from '@/layouts/Layout'
import TabPanel from '@/components/Generic/TabPanel'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import RegistrationStudentForm from '@/components/Forms/Registration/RegistrationStudent'
import RegistrationTeacherForm from '@/components/Forms/Registration/RegistrationTeacher'
import RegistrationCompanyForm from '@/components/Forms/Registration/RegistrationCompany'

export default function Registration() {
  const [tabValue, setTabValue] = useState<number>(0)
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null)

  function onSuccess(msg: string) {
    setMessageSuccess(msg)
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

        <Typography variant="h3" className="ta-c" marginBottom={3}>
          Registration
        </Typography>
        {messageSuccess === null ? (
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
                      className="registration-switcher__tab-item font-semibold"
                      value={0}
                      label="Student"
                    />
                    <Tab
                      className="registration-switcher__tab-item font-semibold"
                      value={1}
                      label="Teacher"
                    />
                    <Tab
                      className="registration-switcher__tab-item font-semibold"
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
                  <RegistrationStudentForm onSuccess={onSuccess} />
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
                  <RegistrationTeacherForm onSuccess={onSuccess} />
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
                  <RegistrationCompanyForm onSuccess={onSuccess} />
                </TabPanel>
              </Box>
            </ContainerWithShadow>
          </Box>
        ) : (
          <Box textAlign="center" marginBottom={8}>
            <Typography marginBottom={2}>{messageSuccess}</Typography>
            <Button href="/" variant="contained" size="small">
              Ok
            </Button>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

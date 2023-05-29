// libs
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

//redux
import { useActions } from '@/redux/hooks'

// material ui components
import Layout from '@/layouts/Layout'
import LoginForm from '@/components/Forms/Login'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

// custom components
import { loginUser, ILogin } from '@/components/Forms/Login/Login.service'

// other utils
import studentService from '@/services/student'
import pages from '@/constants/pages'

function PageLogin() {
  const router = useRouter()
  const { setAuthState } = useActions()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit({ email, password }: ILogin) {
    try {
      setIsLoading(true)
      const loginResponse = await loginUser(email, password)
      if (loginResponse.status === 200) {
        setErrorMessage(null)
      }

      const { role, token, userId } = loginResponse.data

      router.push(pages.cabinet).then(() => {
        studentService.getUserInfo(role, userId, token).then((userResponse) => {
          setAuthState(userResponse.data)
        })
        setIsLoading(false)
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data.error)
      }
      setIsLoading(false)
    }
  }

  return (
    <Layout className="page-login">
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
            Login
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" className=" ta-c" marginBottom={3}>
          Sign in
        </Typography>
        <Box
          maxWidth={400}
          margin={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <LoginForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            validationMessage={errorMessage}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default PageLogin

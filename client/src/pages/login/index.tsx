import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

import pages from '@/constants/pages'

import Layout from '@/components/Layout'
import LoginForm from '@/components/Forms/Login'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { loginUser, ILogin } from '@/components/Forms/Login/Login.service'

function PageLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit({ email, password }: ILogin) {
    try {
      setIsLoading(true)
      const response = await loginUser(email, password)
      if (response.status === 200) {
        setErrorMessage(null)
      }
      router.push(pages.admin)
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data.error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout className="page-login">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Link href="/" className="breadcrumbs__item">
            Home
          </Link>
          <Typography
            variant="body2"
            className="MuiTypography breadcrumbs__item"
          >
            Sign in
          </Typography>
        </Breadcrumbs>
        <Typography
          component="h1"
          variant="h2"
          className="MuiTypography section-registration__heading ta-c"
          marginBottom={3}
        >
          Sign in
        </Typography>
        <LoginForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          validationMessage={errorMessage}
        />
      </Container>
    </Layout>
  )
}

export default PageLogin

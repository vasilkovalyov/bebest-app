import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>LearnLangPlatform - Page not found</title>
        <meta
          name="description"
          content="The platform for learning languages"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="not-found-page">
        <Typography variant="h1" className="ta-c" marginBottom={2}>
          404 - Page Not Found
        </Typography>
        <Box className="not-found-page__image" marginBottom={4}>
          <Image
            src="/images/404.png"
            alt="image 404"
            width={300}
            height={300}
          />
        </Box>
        <Box className="ta-c">
          <Button href="/" variant="contained" color="primary">
            Go back home
          </Button>
        </Box>
      </div>
    </>
  )
}

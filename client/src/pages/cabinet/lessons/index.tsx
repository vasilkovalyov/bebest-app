// libs
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'

// material ui components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

//custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import LessonTypeBox from '@/components/LessonTypeBox'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// other utils
import colors from '@/constants/colors'
import { LessonType } from '@/types/lessons'
import TeacherLessonsBlock from '@/blocks/TeacherLessonsBlock'

export default function PageLessons() {
  return (
    <CabinetLayout currentPageTitle="Lessons">
      <Box marginBottom={4}>
        <ContainerWithShadow paddingSize="sm">
          <Typography
            marginBottom={3}
            variant="h3"
            className="section-admin__heading"
          >
            Lessons
          </Typography>
        </ContainerWithShadow>
      </Box>
      <TeacherLessonsBlock />
    </CabinetLayout>
  )
}

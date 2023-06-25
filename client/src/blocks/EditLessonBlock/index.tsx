// libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchPaymentCard } from '@/redux/slices/payment-card'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'

function EditLessonBlock() {
  return <Box paddingY={4}>EditLessonBlock</Box>
}

export default EditLessonBlock

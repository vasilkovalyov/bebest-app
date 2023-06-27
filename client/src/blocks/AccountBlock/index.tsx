// libs
import React, { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

//custom components
import ChangePasswordForm from '@/components/Forms/ChangePassword'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TabPanel from '@/components/Generic/TabPanel'
import Icon from '@/components/Generic/Icon'
import PaymentBlock from '../PaymentBlock'
import StudentAccountBlock from '../StudentAccountBlock'
import TeacherAccountBlock from '../TeacherAccountBlock'
import CompanyAccountBlock from '../CompanyAccountBlock'
import { IconEnum } from '@/types/icons'
import InfoIcon from '@/components/Generic/InfoIcon'

//other utils
import colors from '@/constants/colors'
import { ITeacherProgressAccount } from '@/types/teacher/teacher-progress-account'

function getTeacherRequiredFields() {
  const fields: Array<keyof ITeacherProgressAccount> = [
    'payment_card',
    'avatar',
    'experience',
    'personal_lessons',
    'subjects',
  ]

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          {field.split('_').join(' ')}
          {index !== fields.length ? ', ' : null}
        </React.Fragment>
      ))}
    </>
  )
}

function AccountBlock() {
  const user = useAppSelector((store) => store.user.user)
  const teacherActivated = useAppSelector(
    (store) => store.teacher.user.activated
  )

  const [tabValue, setTabValue] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <ContainerWithShadow paddingSize="sm">
      <Stack direction="row" justifyContent="space-between">
        <Typography
          marginBottom={3}
          variant="h3"
          className="section-admin__heading"
        >
          Account
        </Typography>
        {user.role === 'teacher' && !teacherActivated ? (
          <Stack direction="row" alignItems="center">
            <Icon
              icon={IconEnum.LOCK}
              color={colors.primary}
              size={20}
              className="admin-account-tabs__item-icon"
            />
            <Typography marginBottom={0} fontWeight={500}>
              Account innactive
            </Typography>
            <Box
              onClick={() => setModalOpen(true)}
              marginLeft={2}
              style={{
                cursor: 'pointer',
              }}
            >
              <Icon
                icon={IconEnum.INFO_CIRCULAR_OUTLINE}
                size={18}
                color={colors.primary}
              />
            </Box>
          </Stack>
        ) : null}
      </Stack>
      <Box marginBottom={3}>
        <Divider />
      </Box>
      <Tabs
        value={tabValue}
        onChange={(_, value: number) => setTabValue(value)}
        className="admin-account-tabs"
      >
        <Tab
          value={0}
          icon={
            <Icon
              icon={IconEnum.PERSON}
              size={18}
              className="admin-account-tabs__item-icon"
            />
          }
          label="Account"
          className="admin-account-tabs__item"
        />
        <Tab
          value={1}
          icon={
            <Icon
              icon={IconEnum.LOCK}
              size={20}
              className="admin-account-tabs__item-icon"
            />
          }
          label="Change password"
          className="admin-account-tabs__item"
        />
        {user.role !== 'student' ? (
          <Tab
            value={2}
            icon={
              <Icon
                icon={IconEnum.PAYMENT_INFO}
                size={20}
                className="admin-account-tabs__item-icon"
              />
            }
            label="Bank data"
            className="admin-account-tabs__item"
          />
        ) : null}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {user.role === 'student' ? <StudentAccountBlock /> : null}
        {user.role === 'teacher' ? <TeacherAccountBlock /> : null}
        {user.role === 'company' ? <CompanyAccountBlock /> : null}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ChangePasswordForm />
      </TabPanel>
      {user.role === 'teacher' || user.role === 'company' ? (
        <TabPanel value={tabValue} index={2}>
          <PaymentBlock />
        </TabPanel>
      ) : null}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color={colors.black_color}
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}></Box>
            <Box maxWidth={300}>
              <Box textAlign="center" marginBottom={2}>
                <InfoIcon />
              </Box>
              <Typography variant="body1" className="ta-c">
                You have to add information for
                <br />
                <strong> {getTeacherRequiredFields()}</strong>
                <br />
                to do account visible for students and companies
              </Typography>
              <Box textAlign="center">
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ContainerWithShadow>
  )
}

export default AccountBlock

// libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'

//custom components
import ChangePasswordForm from '@/components/Forms/ChangePassword'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TabPanel from '@/components/Generic/TabPanel'
import StudentAccount from '@/components/Student/StudentAccount'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import BankData from '@/components/BankData'

function StudentAccountBlock() {
  const user = useAppSelector((store) => store.user.user)

  const [tabValue, setTabValue] = useState<number>(0)

  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography
        marginBottom={3}
        variant="h3"
        className="section-admin__heading"
      >
        Account
      </Typography>
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
        <StudentAccount />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ChangePasswordForm />
      </TabPanel>
      {user.role !== 'student' ? (
        <TabPanel value={tabValue} index={2}>
          <BankData />
        </TabPanel>
      ) : null}
    </ContainerWithShadow>
  )
}

export default StudentAccountBlock

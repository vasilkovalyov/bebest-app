// libs
import { useEffect, useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { ITeacherProgressAccount } from '@/types/teacher/teacher-progress-account'

type ProgressInfoType = {
  label: string
  props: {
    title: string
    value: string
  }
}

type UseProgressAccountReturnType = {
  progressInfo: ProgressInfoType[]
  toggleContent: boolean
  setToggleContent: (value: boolean) => void
  getGeneratedProgressInfo: () => void
}

export function useProgressAccount(
  progress: ITeacherProgressAccount
): UseProgressAccountReturnType {
  const [progressInfo, setProgressInfo] = useState<ProgressInfoType[]>([])
  const [toggleContent, setToggleContent] = useState<boolean>(false)

  function getGeneratedProgressInfo() {
    const progressArr = []
    if (!progress) return

    for (let [key, value] of Object.entries(progress)) {
      if (typeof value === 'object') {
        progressArr.push({
          label: key,
          props: value,
        })
      }
    }

    setProgressInfo(progressArr)
  }

  useEffect(() => {
    getGeneratedProgressInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  return {
    progressInfo,
    toggleContent,
    setToggleContent,
    getGeneratedProgressInfo,
  }
}

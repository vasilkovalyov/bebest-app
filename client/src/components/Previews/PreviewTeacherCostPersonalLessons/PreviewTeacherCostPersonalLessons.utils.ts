import { UseTrialLessonType } from '@/services/teacher-cost-personal-lessons'

export function getTrialLessonResult(
  useTrial: UseTrialLessonType,
  isTrialFree: boolean,
  trialPrice: string
): string {
  if (useTrial === 'false') {
    return 'I do NOT want to do trial classes'
  }
  if (isTrialFree) return 'Free'
  return trialPrice
}

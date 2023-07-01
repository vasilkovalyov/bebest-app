// hooks
import { useCreateLesson } from './useCreateLesson'

//custom components
import LessonForm from '@/components/Forms/Lesson'

//other utils
import { LessonType } from '@/types/lessons'

function CreateLessonBlock({ lessonType }: { lessonType: LessonType }) {
  const { loading, onSubmit } = useCreateLesson(lessonType)

  return (
    <LessonForm
      isLoading={loading}
      lessonType={lessonType}
      mode="create"
      onSubmit={onSubmit}
    />
  )
}

export default CreateLessonBlock

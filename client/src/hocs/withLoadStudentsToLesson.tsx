import React, { ComponentType } from 'react'

interface LoadUsersToLesson {
  loadStudents: () => void
  onHandleAddStudent: () => void
  loadStudentFromLesson: () => void
  deleteStudentFromLesson: () => void
}

export function withLoadStudentsToLesson<T extends LoadUsersToLesson>(
  Component: ComponentType<T>
) {
  const displayName = Component.displayName || Component.name || 'Component'

  const ComponentWithLoadUsers = (props: Omit<T, keyof LoadUsersToLesson>) => {
    return <Component {...props} {...(props as T)} />
  }

  ComponentWithLoadUsers.displayName = `withLoadStudents(${displayName})`

  return ComponentWithLoadUsers
}

// // Usage
// interface MyComponentProps {
//   name: string
//   age: number
// }

// const MyComponent: React.FC<MyComponentProps & AdditionalProps> = ({
//   name,
//   age,
//   additionalProp,
// }) => {
//   return (
//     <div>
//       <p>Name: {name}</p>
//       <p>Age: {age}</p>
//       <p>Additional Prop: {additionalProp}</p>
//     </div>
//   )
// }

// const EnhancedMyComponent = withLoadStudentsToLesson(MyComponent);

// // Render the enhanced component
// <EnhancedMyComponent name="John" age={25} additionalProp="Extra data" />;

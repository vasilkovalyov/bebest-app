import { useState } from 'react'

type MessageType = string | null

export function useNotification(): [
  boolean,
  MessageType,
  () => void,
  () => void,
  (value: string) => void
] {
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<MessageType>(null)

  function showNotification() {
    setShow(true)
  }

  function closeNotification() {
    setShow(false)
    setMessage(null)
  }

  return [show, message, showNotification, closeNotification, setMessage]
}

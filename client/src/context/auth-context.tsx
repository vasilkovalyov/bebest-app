import React, {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

interface IAuthContextProps {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

interface IAuthProviderProps {
  children: React.ReactNode
  userId: string
}

export const AuthContext = createContext<IAuthContextProps>({
  userId: '',
  setUserId: (): string => '',
})

export function AuthProvider({ children, userId: id }: IAuthProviderProps) {
  const [userId, setUserId] = useState<string>(id)
  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

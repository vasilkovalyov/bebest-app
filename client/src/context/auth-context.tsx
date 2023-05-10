import { IAuthUserInfo } from '@/services/auth'
import React, {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

interface IAuthContextProps {
  user: IAuthUserInfo | null
  setUser: Dispatch<SetStateAction<IAuthUserInfo | null>>
}

interface IAuthProviderProps {
  children: React.ReactNode
  user: IAuthUserInfo | null
}

export const AuthContext = createContext<IAuthContextProps>({
  user: null,
  setUser: (): string => '',
})

export function AuthProvider({ children, user: userData }: IAuthProviderProps) {
  const [user, setUser] = useState<IAuthUserInfo | null>(userData)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

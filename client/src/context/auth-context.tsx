import { IUser } from '../types/user'
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

interface IAuthContextProps {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
}

interface IAuthProviderProps {
  children: React.ReactNode
  user: IUser | null
}

export const AuthContext = createContext<IAuthContextProps>({
  user: null,
  setUser: (): string => '',
})

export function AuthProvider({ children, user: userData }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(userData)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

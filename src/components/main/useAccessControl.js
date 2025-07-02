// hooks/useAccessControl.js
import { useUnit } from 'effector-react'
import { $user, $family } from '../models/userStore'

export function useAccessControl() {
  const user = useUnit($user)
  const family = useUnit($family)

  const isAuthenticated = Boolean(user && user.isAuthenticated)
  const isInFamily = Boolean(family)

  return { isAuthenticated, isInFamily }
}
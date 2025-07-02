// src/models/authStore.js
import { createStore, createEvent } from 'effector'

export const setUser = createEvent()
export const setFamily = createEvent()

export const $user = createStore({
  username: '',
  isAuthenticated: false
}).on(setUser, (_, payload) => ({
  ..._,
  ...payload,
  isAuthenticated: true
}))
export const $family = createStore(null).on(setFamily, (_, family) => family)
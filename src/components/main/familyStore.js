// src/models/familyStore.js
import { createStore, createEvent } from 'effector'

export const addMember = createEvent()
export const removeMember = createEvent()
export const setAvailableUsers = createEvent()
export const setFamily = createEvent()


export const $availableUsers = createStore(['user1', 'user2', 'user3']).on(
  setAvailableUsers,
  (_, users) => users
)

export const $family = createStore({
  name: null,
  members: [],
  admin: ''
})
  .on(setFamily, (_, payload) => payload)
  .on(addMember, (state, newMember) => {
    if (state.members.includes(newMember)) return state

    return {
      ...state,
      members: [...state.members, newMember]
    }
  })
  .on(removeMember, (state, memberToRemove) => ({
    ...state,
    members: state.members.filter(m => m !== memberToRemove)
  }))
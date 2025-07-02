import { createStore, createEvent } from 'effector'
import { addCategoryExpense } from './categoryStore'

// События
export const setBalance = createEvent()
export const addDeposit = createEvent()
export const addWithdrawal = createEvent()
export const addCategory = createEvent()
export const removeCategory = createEvent()
export const addTransaction = createEvent()

// addWithdrawal.watch((payload) => {
//   addCategoryExpense({
//     category: 'Продукты',
//     amount: payload
//   })
// })

// Сторы
export const $balance = createStore(5000)
  .on(addDeposit, (state, payload) => {
    if (typeof payload === 'number') {
      return state + payload
    } else if (payload && typeof payload.amount === 'number') {
      return state + payload.amount
    }
    return state
  })
  .on(addWithdrawal, (state, payload) => {
    let amount = 0

    if (typeof payload === 'number') {
      amount = payload
    } else if (payload && typeof payload.amount === 'number') {
      amount = payload.amount
    }

    if (amount <= 0) return state
    if (amount > state) return 0 // или return state - amount

    return state - amount
  })

export const $categories = createStore(['Продукты', 'Транспорт', 'Развлечения'])
  .on(addCategory, (state, newCategory) => [...state, newCategory])
  .on(removeCategory, (state, category) => state.filter(c => c !== category))

export const $transactions = createStore([])
  .on(addTransaction, (state, transaction) => [transaction, ...state])
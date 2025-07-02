// src/models/transactionStore.js
import { createStore, createEvent } from 'effector'

// === События ===
export const addIncome = createEvent()
export const addExpense = createEvent()

// === Стор истории ===
export const $transactions = createStore([])
  .on(addIncome, (state, payload) => {
    return [
      {
        id: Date.now(),
        date: payload.date || new Date().toISOString().slice(0, 10),
        description: payload.description || payload.category,
        amount: payload.amount,
        type: 'income'
      },
      ...state
    ]
  })
  .on(addExpense, (state, payload) => {
    return [
      {
        id: Date.now(),
        date: payload.date || new Date().toISOString().slice(0, 10),
        description: payload.description || payload.category,
        amount: payload.amount,
        type: 'expense'
      },
      ...state
    ]
  })
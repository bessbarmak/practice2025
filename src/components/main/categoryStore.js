// src/models/categoryStore.js
import { createStore, createEvent } from 'effector'

// === События ===
export const addCategoryExpense = createEvent()
export const addCategoryIncome = createEvent()

// === Стор категорий ===
export const $categories = createStore([
  
])
  .on(addCategoryExpense, (state, payload) => {
    const { category, amount } = payload

    const existingIndex = state.findIndex(item => item.name === category)

    if (existingIndex >= 0) {
      // Обновляем существующую категорию и сохраняем её тип
      const updated = [...state]
      updated[existingIndex].amount += amount
      return updated
    }

    // Добавляем новую категорию как "расход"
    return [
      ...state,
      { id: Date.now(), name: category, amount, type: 'expense' }
    ]
  })
  .on(addCategoryIncome, (state, payload) => {
    const { category, amount } = payload

    const existingIndex = state.findIndex(item => item.name === category)

    if (existingIndex >= 0) {
      const updated = [...state]
      updated[existingIndex].amount += amount
      return updated
    }

    // Добавляем новую категорию как "доход"
    return [
      ...state,
      { id: Date.now(), name: category, amount, type: 'income' }
    ]
  })
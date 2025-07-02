// src/components/main/WithdrawalModal.jsx
import React, { useState } from 'react'
import { Modal, InputNumber, Input, Select, Button } from 'antd'
import styled from 'styled-components'
import { useUnit } from 'effector-react'

// События и сторы
import { addWithdrawal } from './financeStore'
import { closeWithdrawalModal, $withdrawalModalVisible } from './modalStore'
import { addCategoryExpense } from './categoryStore'
import { addExpense } from './transactionStore'

const FormContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`

export default function WithdrawalModal() {
  const isVisible = useUnit($withdrawalModalVisible)
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const handleSave = () => {
    if (amount <= 0) return

    console.log('Вызываю addWithdrawal', { amount, description, category, date })

    // Отправляем только сумму в стор баланса
    addWithdrawal(amount)
    addCategoryExpense({
    category,
    amount
  })

    addExpense({
    category: category,
    amount,
    description: description,
    date: date
  })
    // Если используешь отдельно историю трат:
    // addTransaction({ type: 'expense', amount, description, category, date })

    setAmount(0)
    setDescription('')
    setCategory('')
    setDate(new Date().toISOString().slice(0, 10))
    closeWithdrawalModal()
  }

  return (
    <Modal
      title="Списание"
      open={isVisible}
      onOk={handleSave}
      onCancel={closeWithdrawalModal}
      footer={[
        <Button key="back" onClick={closeWithdrawalModal}>
          Отмена
        </Button>,
        <Button key="submit" danger onClick={handleSave}>
          Списать
        </Button>
      ]}
    >
      <FormContainer>
        <div style={{ marginBottom: '12px' }}>
          <label>Сумма</label>
          <InputNumber
            min={0}
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="Введите сумму списания"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Описание</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Например: Обед"
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Категория</label>
          <Select
            value={category}
            onChange={setCategory}
            options={[
              { label: 'Продукты', value: 'Продукты' },
              { label: 'Транспорт', value: 'Транспорт' },
              { label: 'Развлечения', value: 'Развлечения' },
              
            ]}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Дата</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </FormContainer>
    </Modal>
  )
}
// src/components/main/DepositModal.jsx
import React, { useState } from 'react'
import { Modal, InputNumber, Input, Select, Button } from 'antd'
import styled from 'styled-components'
import { useUnit } from 'effector-react'

import { addDeposit } from './financeStore'
import { closeDepositModal, $depositModalVisible } from './modalStore'
import { addCategoryIncome } from './categoryStore'
import { addIncome } from './transactionStore'

const FormContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`

export default function DepositModal() {
  const isVisible = useUnit($depositModalVisible)
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const handleSave = () => {
    if (amount <= 0) return

    addDeposit({
      amount,
      description,
      category,
      date,
    })

    addCategoryIncome({
      category,
      amount
    })

    addIncome({
    category: category,
    amount,
    description: description,
    date: date
  })

    setAmount(0)
    setDescription('')
    setCategory('')
    setDate(new Date().toISOString().slice(0, 10))
    closeDepositModal()
  }

  return (
    <Modal
      title="Пополнение"
      open={isVisible}
      onOk={handleSave}
      onCancel={closeDepositModal}
      footer={[
        <Button key="back" onClick={closeDepositModal}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Пополнить
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
            placeholder="Введите сумму"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Описание</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Например: Зарплата"
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Категория</label>
          <Select
            value={category}
            onChange={setCategory}
            options={[
              { label: 'Зарплата', value: 'Зарплата' },
              { label: 'Доход от инвестиций', value: 'Инвестиции' },
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
// components/BalanceEditForm.jsx
import React, { useState } from 'react'
import { Modal, InputNumber, Button } from 'antd'
import styled from 'styled-components'
import { setBalance } from './financeStore'

const FormContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`

let setModalVisible = () => {}

function BalanceEditForm({ visible }) {
  const [value, setValue] = useState(0)

  const handleSave = () => {
    if (value >= 0) {
      setBalance(value)
      setModalVisible(false)
    }
  }

  return (
    <Modal
      title="Изменить баланс"
      open={visible}
      onOk={handleSave}
      onCancel={() => setModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setModalVisible(false)}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Сохранить
        </Button>,
      ]}
    >
      <FormContainer>
        <InputNumber
          min={0}
          step={100}
          value={value}
          onChange={setValue}
          placeholder="Введите новый баланс"
          style={{ width: '100%' }}
        />
      </FormContainer>
    </Modal>
  )
}

// Для удобства сделаем функцию доступа извне
export function openBalanceEditModal() {
  setModalVisible(true)
}

let modalVisible = false
setModalVisible = (newState) => {
  modalVisible = newState
  renderModal()
}

let renderModal = () => {}

const BalanceEditFormWrapper = () => {
  const [visible, setVisible] = useState(false)
  renderModal = () => setVisible(modalVisible)
  return <BalanceEditForm visible={visible} />
}

export default BalanceEditFormWrapper
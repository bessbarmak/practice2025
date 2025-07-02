// src/components/family/InviteFamilyWindow.jsx
import React, { useState } from 'react'
import { Card, Select, Button, Typography, notification } from 'antd'
import styled from 'styled-components'

// Для работы с данными
import { useUnit } from 'effector-react'
import { $family, addMember } from './familyStore'

const { Title, Text } = Typography

// ==== Стилизованные компоненты ====
const FullWidthCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
`

const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default function InviteFamilyWindow() {
  const family = useUnit($family)
  const availableUsers = ['user1', 'user2', 'user3'] // Ты можешь брать это из стора или JSON
  const [selectedUser, setSelectedUser] = useState('')

  const filteredUsers = availableUsers.filter(u => !family.members.includes(u))

  const handleInvite = () => {
    if (!selectedUser) return
    addMember(selectedUser)
    setSelectedUser('')
    navigate('/invite')
  }
  return (
    <FullWidthCard title="Пригласите члена семьи">
      <InviteContainer>
        <Text strong>Семья: {family.name}</Text>

        <Select
          showSearch
          value={selectedUser || undefined}
          placeholder="Выберите пользователя"
          options={filteredUsers.map(u => ({ label: u, value: u }))}
          style={{ width: '100%' }}
          onChange={setSelectedUser}
        />

        <Button type="primary" onClick={handleInvite} block disabled={!selectedUser}>
          ➕ Пригласить
        </Button>
      </InviteContainer>
    </FullWidthCard>
  )
}
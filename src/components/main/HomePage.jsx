// src/components/main/HomePage.jsx
import React, { useState, useEffect } from 'react'
import { Layout, Typography, Button, Select, Card } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Твои компоненты
import BalanceCard from './BalanceCard'
import CategoryList from './CategoryList'
import TransactionHistory from './TransactionHistory'
import BalanceEditForm from './BalanceEditForm'

// Для проверки доступа
import { useUnit } from 'effector-react'
import { $user } from './userStore'
import {$family, addMember, removeMember, $availableUsers  } from './familyStore'


const { Header, Content } = Layout
const { Title, Text } = Typography

// ==== Стилизованные компоненты ====
const FullWidthContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 24px;
  box-sizing: border-box;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Section = styled.div`
  margin-bottom: 24px;
  flex: 1 0 48%;
  display: flex;
  min-width: 300px;
`

const RowContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`

const FamilyInfo = styled.div`
  background-color: #E0FFFF; // светло-серый фон
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;

  h3 {
    font-size: 18px; // Заголовок
    margin-bottom: 12px;
  }

  li {
    font-size: 16px; // Участники
    margin-bottom: 8px;
  }
  `
// Overlay для заблокированных окон
const ReadOnlyOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #87CEFA;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  font-size: 16px;
  color: #888;
`

const MembersList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 8px 0;

  li {
    background-color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between; /* ← Ключевая часть */
    align-items: center;
    margin-bottom: 8px;
    border: 1px solid #ddd;
  }
`

const AdCard = styled(Card)`
  background-color: #E0FFFF;
  border: 1px solid #91caff;
  margin-bottom: 24px;
`

const AdTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const AdText = styled.div`
  font-size: 15px;
  margin-bottom: 12px;
`

export default function HomePage() {
  const user = useUnit($user)
  const family = useUnit($family)
  const availableUsers = useUnit($availableUsers)
  const [selectedUser, setSelectedUser] = useState('')
  const [showAd, setShowAd] = useState(true)
  const isAuthenticated = Boolean(user && user.isAuthenticated)
  const isInFamily = Boolean(family)

  // Если не авторизован → перенаправление через useEffect
  if (!isAuthenticated) {
    return (
      <RedirectMessage>
        <Typography.Title level={2}>Вы не вошли в аккаунт</Typography.Title>
        <p>Чтобы продолжить, войдите или зарегистрируйтесь.</p>
        <ButtonContainer>
        <StyledButton type="primary" href="/login">Войти</StyledButton>
        <StyledButton  href="/register">Зарегистрироваться</StyledButton>
        </ButtonContainer>
      </RedirectMessage>
    )
  }

  

    const filteredUsers = availableUsers.filter(u => !family.members.includes(u))

   const handleAddMember = () => {
      if (!selectedUser) return

      addMember(selectedUser)
      setSelectedUser('')
    }

    const handleRemoveMember = (member) => {
    if (member === family.admin) {
      alert('Нельзя удалить администратора')
      return
    }
    removeMember(member)
  }

  

  

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#87CEFA' }}>
      <Header style={{ backgroundColor: '#E0FFFF' }}>
        <HeaderContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="../../happy-family-home--21412.png"
              alt="Кошелёк"
              style={{ width: '48px', height: '48px', marginRight: '24px' }}
            />
            <Title level={2} style={{ margin: 0 }}>Наши сбережения</Title>
          </div>
        </HeaderContainer>
      </Header>

      <Content>
        <FullWidthContainer>
           {/* Информация о семье */}
          <FamilyInfo>
            <div>
            <h3>Семья: {family.name}</h3>
            </div>
            <div>
            <Text strong style={{ fontSize: '16px', display: 'block' }}>Участники:</Text>
            </div>
            <MembersList>
              {family.members.map((member) => (
                <li key={member}>
                  <span>{member}</span>
                  {member !== family.admin && (
                    <Button size="small" danger onClick={() => handleRemoveMember(member)}>
                      Удалить
                    </Button>
                  )}
                </li>
              ))}
            </MembersList>

            {/* Выбор пользователя для добавления */}
            <Select
              showSearch
              value={selectedUser || undefined}
              placeholder="Выберите пользователя"
              options={filteredUsers.map(u => ({
                label: u,
                value: u
              }))}
              style={{ width: '100%', marginBottom: '12px' }}
              onChange={(value) => setSelectedUser(value)}
            />

            <Button
              type="dashed"
              onClick={handleAddMember}
              disabled={!selectedUser} // ✅ Блокируем кнопку, если ничего не выбрано
              block
            >
              + Добавить выбранного
            </Button>
          </FamilyInfo>
          {/* Первые два окна рядом */}
          <RowContainer>
            <Section style={{ position: 'relative' }}>
              <BalanceCard />
              {!isInFamily && <ReadOnlyOverlay />}
            </Section>
            <Section style={{ position: 'relative' }}>
              <CategoryList />
              {!isInFamily && <ReadOnlyOverlay />}
            </Section>
          </RowContainer>

          {/* История платежей ниже */}
          <Section style={{ position: 'relative' }}>
            <TransactionHistory />
            {!isInFamily && <ReadOnlyOverlay />}
          </Section>

          {/* Рекламное окно */}
          {showAd && (
            <AdCard title="Пригласите в семью" extra={<Button onClick={() => setShowAd(false)}>Закрыть</Button>}>
              <AdTitle>Хотите больше участников?</AdTitle>
              <AdText>Пригласите членов своей семьи и управляйте бюджетом вместе.</AdText>
              <Button type="primary" block >
                Отправить приглашение
              </Button>
            </AdCard>
          )}
        </FullWidthContainer>
      </Content>
    </Layout>
  )
}

// Дополнительные стили
const RedirectMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #87CEFA;
  text-align: center;
  padding: 24px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledButton = styled(Button)`
  font-size: 16px;
  padding: 8px 24px;
  `
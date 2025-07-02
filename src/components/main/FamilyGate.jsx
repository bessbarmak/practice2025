// src/components/FamilyGate.jsx
import React from 'react'
import { Card, Button } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e6f7ff;
`

const StyledCard = styled(Card)`
  width: 400px;
`

export default function FamilyGate({ mode }) {
  return (
    <Wrapper>
      <StyledCard title={mode === 'auth' ? 'Авторизация' : 'Семья'}>
        <p style={{ marginBottom: '24px' }}>
          {mode === 'auth'
            ? 'Пожалуйста, войдите в свой аккаунт, чтобы продолжить.'
            : 'Выберите или создайте семью, чтобы начать использовать приложение.'}
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {mode === 'auth' ? (
            <>
              <Button type="primary" href="/login">
                Войти
              </Button>
              <Button href="/register">Зарегистрироваться</Button>
            </>
          ) : (
            <>
              <Button type="primary" href="/join-family">
                Вступить в семью
              </Button>
              <Button href="/create-family">
                Создать семью
              </Button>
            </>
          )}
        </div>
      </StyledCard>
    </Wrapper>
  )
}
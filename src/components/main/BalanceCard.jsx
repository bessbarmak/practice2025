// src/components/BalanceCard.jsx
import React from 'react'
import { Card, Typography, Button } from 'antd'
import styled from 'styled-components'

// Модалки
import DepositModalWrapper from './DepositModal'
import WithdrawalModalWrapper from './WithdrawalModal'
import { openDepositModal, openWithdrawalModal } from './modalStore'

// Для работы с балансом
import { useUnit } from 'effector-react'
import { $balance } from './financeStore'

const StyledCard = styled(Card)`
  margin-left: auto;
  background-color: #E0FFFF;
  width: 60%;
  padding: 24px;
`

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 16px;
`

export default function BalanceCard() {
  const balance = useUnit($balance)

  return (
    <>
      <StyledCard title="Общий остаток">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {balance} ₽
        </Typography.Title>

        <ButtonContainer>
          <Button type="primary" onClick={openDepositModal}>
            Пополнить
          </Button>
          <Button danger onClick={openWithdrawalModal}>
            Списать
          </Button>
        </ButtonContainer>
      </StyledCard>

      {/* Подключаем модалки */}
      <DepositModalWrapper />
      <WithdrawalModalWrapper />
    </>
  )
}
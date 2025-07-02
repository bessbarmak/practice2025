// src/components/main/CategoryList.jsx
import React from 'react'
import { Card, List } from 'antd'
import styled from 'styled-components'
import { useUnit } from 'effector-react'

// Твой стор
import { $categories } from './categoryStore'

const FullWidthCard = styled(Card)`
  width: 60%;
  margin-right: auto;
  background-color: #E0FFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const ScrollableListContainer = styled.div`
  max-height: 100px;
  overflow-y: auto;
  padding-right: 10px;
`

export default function CategoryList() {
  const categories = useUnit($categories)

  
  
  return (
    <FullWidthCard title="Категории трат и пополнений">
      <ScrollableListContainer>
        <List
          dataSource={categories}
          renderItem={(item) => (
            <List.Item style={{ justifyContent: 'space-between' }}>
              <span>{item.name}</span>
              <AmountText type={item.type}>
                {item.type === 'income' ? '+' : '-'}
                {item.amount.toLocaleString()} ₽
              </AmountText>
            </List.Item>
          )}
        />
      </ScrollableListContainer>
    </FullWidthCard>
  )
}

const AmountText = styled.span`
  color: ${(props) => {
    if (props.type === 'income') return '#52c41a'; // Зелёный
    if (props.type === 'expense') return '#ff4d4f'; // Красный
    return '#000'; // По умолчанию чёрный
  }};
  font-weight: 500;
  `
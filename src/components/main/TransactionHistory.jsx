// src/components/main/TransactionHistory.jsx
import React from 'react'
import { Card, Table, DatePicker } from 'antd'
import styled from 'styled-components'
import { useUnit } from 'effector-react'

// Для работы с датами и фильтром
import dayjs from 'dayjs'

// Твой стор с историей
import { $transactions } from './transactionStore'

const FullWidthCard = styled(Card)`
  width: 100%;
  border-radius: 8px;
  background-color: #e0ffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

export default function TransactionHistory() {
  const transactions = useUnit($transactions)
  const [dateFrom, setDateFrom] = React.useState(null)
  const [dateTo, setDateTo] = React.useState(null)

  // Фильтр по датам
  const filteredTransactions = React.useMemo(() => {
    if (!dateFrom && !dateTo) return transactions

    return transactions.filter((item) => {
      const itemDate = dayjs(item.date)

      if (dateFrom && dateTo) {
        return itemDate.isAfter(dayjs(dateFrom)) && itemDate.isBefore(dayjs(dateTo).add(1, 'day'))
      }

      if (dateFrom) {
        return itemDate.isAfter(dayjs(dateFrom))
      }

      if (dateTo) {
        return itemDate.isBefore(dayjs(dateTo).add(1, 'day'))
      }

      return true
    })
  }, [transactions, dateFrom, dateTo])

  // Колонки таблицы
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => {
        const isExpense = record.type === 'expense'
        const formattedAmount = new Intl.NumberFormat('ru-RU').format(record.amount)

        return (
          <span style={{ color: isExpense ? '#ff4d4f' : '#52c41a', fontWeight: 500 }}>
            {!isExpense && '+'}
            {formattedAmount} ₽
          </span>
        )
      }
    }
  ]

  return (
    <FullWidthCard title="История платежей">
      {/* Форма фильтрации */}
      <FilterContainer>
        <DatePicker
          placeholder="Начальная дата"
          value={dateFrom ? dayjs(dateFrom) : null}
          onChange={(date) => setDateFrom(date ? date.format('YYYY-MM-DD') : null)}
        />
        <DatePicker
          placeholder="Конечная дата"
          value={dateTo ? dayjs(dateTo) : null}
          onChange={(date) => setDateTo(date ? date.format('YYYY-MM-DD') : null)}
        />
      </FilterContainer>

      {/* Таблица с историями */}
      <Table
        dataSource={filteredTransactions}
        columns={columns}
        pagination={false}
        scroll={{ y: '60vh' }}
      />
    </FullWidthCard>
  )
}
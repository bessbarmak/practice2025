// src/components/LoginWindow.jsx
import React from 'react'
import { Form, Input, Button, Typography } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// Импорт effector сторов
import { setUser } from '../../main/userStore' // $user
import { useUnit } from 'effector-react'
import { $family } from '../../main/userStore' // $family

const FullScreenContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #87CEFA;
`

const CenteredFormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background-color: #E0FFFF;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`

export default function LoginWindow() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const family = useUnit($family)

  const onFinish = (values) => {
    console.log('Форма отправлена:', values)

    // Сохраняем данные о пользователе
    const user = {
      username: values.login,
      isAuthenticated: true,
      role: 'user',
    }

    // При входе или регистрации
    setUser({
      username: values.login,
      isAuthenticated: true
    })

    // Переход на страницу семьи или на главную
      if (!family || !family.name) {
        navigate('/join-family')
      } else {
        navigate('/')
      }
  }
  const passwordRegex = /^(?=.*[a-zA-Z])[\w!@#$%^&*()_+~`=\\|:";'<>?,.\/[\-]*$/

  // === Проверка существования логина ===
  const checkIfUsernameExists = async (_, value) => {
    if (!value || value.length < 4) return Promise.resolve()

    try {
      const response = await fetch('/users.json')
      if (!response.ok) throw new Error('Ошибка загрузки данных')

      const data = await response.json()
      const usernames = data.users.map(user => user.username)

      if (usernames.includes(value)) {
        return Promise.resolve()
      }

      return Promise.reject(new Error('Такого логина не существует'))
    } catch (error) {
      return Promise.reject(new Error('Не удалось проверить логин'))
    }
  }

  // === Проверка пароля ===
  const checkPasswordMatch = async (_, value) => {
    const login = form.getFieldValue('login')
    if (!login || !value) return Promise.resolve()

    try {
      const response = await fetch('/users.json')
      if (!response.ok) throw new Error('Ошибка загрузки данных')

      const data = await response.json()
      const user = data.users.find(user => user.username === login)

      if (!user) return Promise.resolve()
      if (user.password === value) return Promise.resolve()

      return Promise.reject(new Error('Неверный пароль'))
    } catch (error) {
      return Promise.reject(new Error('Не удалось проверить пароль'))
    }
  }

  return (
    <FullScreenContainer>
      <CenteredFormContainer>
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Войти в аккаунт
        </Typography.Title>

        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Логин */}
          <Form.Item
            label="Имя пользователя"
            name="login"
            rules={[
              { required: true, message: 'Введите логин' },
              { min: 4, message: 'Минимум 4 символа' },
              {
                validator: (_, value) => {
                  if (!value || /^[a-zA-Z0-9_\-!@#$%^&*]+$/.test(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Только латинские буквы, цифры и спецсимволы'))
                },
              },
              { validator: checkIfUsernameExists }, // ✅ Проверяем существование
            ]}
          >
            <Input placeholder="ivanov123" />
          </Form.Item>

          {/* Пароль */}
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 7, message: 'Минимум 7 символов' },
              {
                validator: (_, value) => {
                  if (!value || passwordRegex.test(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Пароль может содержать только латинские буквы, цифры и специальные символы'))
                },
              },
              { validator: checkPasswordMatch }, // ✅ Проверяем совпадение
            ]}
            hasFeedback
          >
            <Input.Password placeholder="•••••••" />
          </Form.Item>

          {/* Кнопка входа */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </CenteredFormContainer>
    </FullScreenContainer>
  )
}
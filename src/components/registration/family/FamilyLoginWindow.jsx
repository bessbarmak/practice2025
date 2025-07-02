// src/components/FamilyLoginWindow.jsx
import React from 'react'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// Для хранения состояния
import { setFamily, setUser } from '../../main/userStore' // $family

// === Стили ===
const FullScreenContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faebd7;
`

const CenteredFormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`

// === Регулярное выражение для пароля и логина ===
const passwordRegex = /^(?=.*[a-zA-Z])[\w!@#$%^&*()_+~`=\\|:";'<>?,.\/[\-]*$/

export const FamilyLoginWindow = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Форма отправлена:', values)

    // Сохраняем семью в стор
    setFamily({ name: values.login })

    // Перенаправляем на главную
    navigate('/')
  }

  // === Убирает пробелы и русские буквы из логина ===
  const onLoginChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '')
    value = value.replace(/[^a-zA-Z0-9_\-!@#$%^&*]/g, '')
    form.setFieldsValue({ login: value })
    form.setFields([{ name: 'login', errors: [] }])
    form.validateFields(['login'])
  }

  // === Убирает пробелы и русские буквы из пароля ===
  const onPasswordChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '')
    value = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+~`=\\|:";'<>?,.\/[\-]*/g, '')
    form.setFieldsValue({ password: value })
    form.setFields([{ name: 'password', errors: [] }])
    form.validateFields(['password'])
  }

  // === Проверка существования логина ===
  const checkIfUsernameExists = async (_, value) => {
    if (!value || value.length < 4) return Promise.resolve()

    try {
      const response = await fetch('/families.json')
      if (!response.ok) throw new Error('Ошибка загрузки данных')

      const data = await response.json()
      const familynames = data.families.map(family => family.familyname)

      if (familynames.includes(value)) {
        return Promise.resolve()
      }

      return Promise.reject(new Error('Такой семьи не существует'))
    } catch (error) {
      return Promise.reject(new Error('Не удалось проверить логин'))
    }
  }

  // === Проверка пароля ===
  const checkPasswordMatch = async (_, value) => {
    const login = form.getFieldValue('login')
    if (!login || !value) return Promise.resolve()

    try {
      const response = await fetch('/families.json')
      if (!response.ok) throw new Error('Ошибка загрузки данных')

      const data = await response.json()
      const user = data.families.find(family => family.familyname === login)

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
        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Логин */}
          <Form.Item
            label="Название семьи"
            name="login"
            rules={[
              { required: true, message: 'Введите семью' },
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
            <Input name="login" onChange={onLoginChange} placeholder="ivanov_family" />
          </Form.Item>

          {/* Пароль */}
          <Form.Item
            label="Пароль"
            name="password"
            dependencies={['login']}
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
            <Input.Password name="password" onChange={onPasswordChange} placeholder="•••••••" />
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
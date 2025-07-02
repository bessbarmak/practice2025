// src/components/registration/user/RegistrationWindow.jsx
import React from 'react';
import { Form, Button } from 'antd';
import {
  FullScreenContainer,
  CenteredFormContainer
} from '../styles';
import {
  NameField,
  LastNameField,
  LoginField,
  EmailField,
  PasswordField,
  ConfirmPasswordField
} from '../FormFields';
import { useNavigate } from 'react-router-dom'


export const RegistrationWindow = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Форма успешно отправлена:', values);
    // Здесь можно отправить данные на сервер или показать сообщение

    // Сохраняем данные о зарегистрированном пользователе
    localStorage.setItem('pendingUser', JSON.stringify({
      login: values.login,
      email: values.email,
      isRegistered: true
    }))

    // Перенаправляем на страницу логина
    navigate('/login')
  };

  // Убирает русские буквы и пробелы при вводе
  const onLatinOnlyChange = (e) => {
    let value = e.target.value;
    const name = e.target.name || e.target.id;

    // Удаляем русские буквы и пробелы
    value = value.replace(/[\u0400-\u04FF\s]/g, '');

    form.setFieldsValue({ [name]: value });
  };

  return (
    <div className="registration-window">
      <FullScreenContainer>
        <CenteredFormContainer>
          <Form form={form} onFinish={onFinish} layout="vertical">

            <LoginField form={form} onChange={onLatinOnlyChange} />

            <EmailField />
            <PasswordField onChange={onLatinOnlyChange} />
            <ConfirmPasswordField />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                
              >
                Продолжить
              </Button>
            </Form.Item>
          </Form>
        </CenteredFormContainer>
      </FullScreenContainer>
    </div>
  );
};
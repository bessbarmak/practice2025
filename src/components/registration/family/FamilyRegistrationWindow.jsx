// src/components/registration/RegistrationWindow.jsx
import React from 'react';
import { Form, Button } from 'antd';
import {
  FullScreenContainer,
  CenteredFormContainer
} from '../styles';
import {
  PasswordField,
  ConfirmPasswordField,
  FamilyLoginField
} from '../FormFields';
import { useNavigate } from 'react-router-dom'
import { $user } from '../../main/userStore'
import { setFamily } from '../../main/familyStore';
import { useUnit } from 'effector-react'

export const FamilyRegistrationWindow = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const user = useUnit($user)

  const onFinish = (values) => {
    console.log('Форма успешно отправлена:', values);

    // setUser({
    //   username: values.login,
    //   isAuthenticated: true
    // })
    // Сохраняем семью в сторе
    // Убедимся, что мы добавляем правильного пользователя
    setFamily({
      name: values.familyName,
      members: [user.username],
      admin: user.username
    })
    

    // Перенаправляем на главную
    navigate('/')
    // Здесь можно отправить данные на сервер или показать сообщение
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
            

            <FamilyLoginField form={form} onChange={onLatinOnlyChange} />

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Продолжить
              </Button>
            </Form.Item>
          </Form>
        </CenteredFormContainer>
      </FullScreenContainer>
    </div>
  );
};
// src/components/registration/FormFields.jsx
import { Form, Input } from 'antd';
import React from 'react';
import { validatePassword, validateConfirmPassword, validateLogin, checkUniqueLogin, checkUniqueFamily } from './validation';

export const NameField = ({ onChange }) => (
  <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
    <Input name="firstName" onChange={onChange} />
  </Form.Item>
);

export const LastNameField = ({ onChange }) => (
  <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
    <Input name="lastName" onChange={onChange} />
  </Form.Item>
);

export const LoginField = ({ form, onChange }) => (
  <Form.Item
    label="Имя пользователя"
    name="login"
    rules={[
      { required: true, message: 'Введите логин' },
      { min: 4, message: 'Логин должен быть не менее 4 символов' },
      { validator: validateLogin },
      { validator: checkUniqueLogin }
    ]}
  >
    <Input name="login" onChange={onChange} />
  </Form.Item>
);

export const EmailField = () => (
  <Form.Item
    label="Email"
    name="email"
    rules={[
      { required: true, message: 'Введите email' },
      { type: 'email', message: 'Некорректный email' }
    ]}
  >
    <Input name="email" />
  </Form.Item>
);

export const PasswordField = ({ onChange }) => (
  <Form.Item
    label="Пароль"
    name="password"
    rules={[
      { required: true, message: 'Введите пароль' },
      { min: 7, message: 'Пароль должен содержать минимум 7 символов' },
      { validator: validatePassword }
    ]}
    hasFeedback
  >
    <Input.Password name="password" onChange={onChange} />
  </Form.Item>
);

export const ConfirmPasswordField = ({onChange}) => (
  <Form.Item
    label="Подтвердите пароль"
    name="confirmPassword"
    dependencies={['password']}
    hasFeedback
    rules={[
      { required: true, message: 'Подтвердите пароль' },
      { min: 7, message: 'Пароль должен содержать минимум 7 символов' },
      ({ getFieldValue }) => validateConfirmPassword(getFieldValue),
    ]}
  >
    <Input.Password name="confirmPassword"  onChange={onChange}/>
  </Form.Item>
);

export const FamilyLoginField = ({ form, onChange }) => (
  <Form.Item
    label="Название семьи"
    name="familyName"
    rules={[
      { required: true, message: 'Введите логин' },
      { min: 4, message: 'Логин должен быть не менее 4 символов' },
      { validator: validateLogin },
      { validator: checkUniqueFamily }
    ]}
  >
    <Input name="familyName" onChange={onChange} />
  </Form.Item>
);
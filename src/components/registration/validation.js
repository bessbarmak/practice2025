

export const validatePassword = (_, value) => {
  const passwordRegex = /^[\w!@#$%^&*()_+~`=\\|:";'<>?,.\/[\-]*$/;
  if (!value || passwordRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Пароль содержит недопустимые символы'));
};

export const validateConfirmPassword = (getFieldValue) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  },
});

export const validateLogin = (_, value) => {
  if (!value || /^[a-zA-Z0-9_\-!@#$%^&*]+$/.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Только латинские буквы, цифры и спецсимволы'));
};

// Асинхронная проверка на уникальность логина
// Асинхронная проверка логина через fetch к public/users.json
export const checkUniqueLogin = async (_, value) => {
  if (!value) return Promise.resolve();

  try {
    const response = await fetch('/users.json'); // ← путь к файлу в public

    if (!response.ok) {
      throw new Error('Не удалось загрузить список пользователей');
    }

    const mockUsers = await response.json(); // получаем JSON
    const exists = mockUsers.users.some(user => user.username === value);

    if (exists) {
      return Promise.reject(new Error('Этот логин уже занят'));
    }

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(new Error('Ошибка проверки логина'));
  }
};

export const checkUniqueFamily = async (_, value) => {
  if (!value) return Promise.resolve();

  try {
    const response = await fetch('/families.json'); // ← путь к файлу в public

    if (!response.ok) {
      throw new Error('Не удалось загрузить список пользователей');
    }

    const mockUsers = await response.json(); // получаем JSON
    const exists = mockUsers.families.some(family => family.familyname === value);

    if (exists) {
      return Promise.reject(new Error('Этот логин уже занят'));
    }

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(new Error('Ошибка проверки логина'));
  }
};
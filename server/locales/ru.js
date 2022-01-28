module.exports = {
  translation: {
    appName: 'Nidges Task Manager',
    flash: {
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно удалён',
          fail: 'Невозможно удалить пользователя',
        },
      },
      statuses: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        update: {
          success: 'Статус успешно изменён',
          error: 'Не удалось изменить статус',
        },
        delete: {
          success: 'Статус успешно удален',
          error: 'Не удалось удалить статус',
        },
      },
      tasks: {
        create: {
          success: 'Задача успешно создана',
          error: 'Не удалось создать задачу',
        },
        update: {
          success: 'Задача успешно изменена',
          error: 'Не удалось изменить задачу',
        },
        delete: {
          success: 'Задача успешно удалена',
          error: 'Не удалось удалить задачу',
          fail: 'Задачу может удалить только её автор',
        },
      },
      labels: {
        create: {
          success: 'Метка успешно создана',
          error: 'Не удалось создать метку',
        },
        update: {
          success: 'Метка успешно изменена',
          error: 'Не удалось изменить метку',
        },
        delete: {
          success: 'Метка успешно удалена',
          error: 'Не удалось удалить метку',
        },
      },
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        tasks: 'Задачи',
        labels: 'Метки',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        firstName: 'Имя',
        lastName: 'Фамилия',
        fullName: 'Полное имя',
        password: 'Пароль',
        createdAt: 'Дата создания',
        empty: 'Нет зарегистрированных пользователей',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        existing: {
          update: 'Изменить',
          delete: 'Удалить',
          updateTitle: 'Изменение пользователя',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        empty: 'Нет созданных статусов',
        new: {
          create: 'Создать статус',
          creation: 'Создание статуса',
          submit: 'Создать',
        },
        existing: {
          update: 'Изменить',
          delete: 'Удалить',
          updateTitle: 'Изменение статуса',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Наименование',
        status: 'Статус',
        creator: 'Автор',
        executor: 'Исполнитель',
        createdAt: 'Дата создания',
        empty: 'Нет созданных задач',
        new: {
          create: 'Создать задачу',
          creation: 'Создание задачи',
        },
        existing: {
          update: 'Изменить',
          delete: 'Удалить',
          updateTitle: 'Изменение задачи',
        },
      },
      labels: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        empty: 'Нет созданных меток',
        new: {
          create: 'Создать метку',
          creation: 'Создание метки',
          submit: 'Создать',
        },
        existing: {
          update: 'Изменить',
          delete: 'Удалить',
          updateTitle: 'Изменение метки',
        },
      },
    },
    labels: {
      email: 'Email',
      password: 'Пароль',
      firstName: 'Имя',
      lastName: 'Фамилия',
      name: 'Наименование',
      description: 'Описание',
      statusId: 'Статус',
      creatorId: 'Автор',
      executorId: 'Исполнитель',
      createdAt: 'Дата создания',
      labels: 'Метки',
    },
  },
};

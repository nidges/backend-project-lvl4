"use strict";

module.exports = {
  translation: {
    appName: 'Nidges Task Manager',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль'
        },
        delete: {
          success: 'Вы разлогинены'
        }
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован'
        },
        update: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно изменён'
        },
        delete: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно удалён',
          fail: 'Невозможно удалить пользователя'
        }
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.'
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход'
      }
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти'
        }
      },
      users: {
        id: 'ID',
        email: 'Email',
        firstName: 'Имя',
        lastName: 'Фамилия',
        fullName: 'Полное имя',
        password: 'Пароль',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация'
        },
        existing: {
          update: 'Изменить',
          delete: 'Удалить',
          updateTitle: 'Изменение пользователя'
        }
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше'
        }
      }
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9sb2NhbGVzL3J1LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ0cmFuc2xhdGlvbiIsImFwcE5hbWUiLCJmbGFzaCIsInNlc3Npb24iLCJjcmVhdGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJkZWxldGUiLCJ1c2VycyIsInVwZGF0ZSIsImZhaWwiLCJhdXRoRXJyb3IiLCJsYXlvdXRzIiwiYXBwbGljYXRpb24iLCJzaWduSW4iLCJzaWduVXAiLCJzaWduT3V0Iiwidmlld3MiLCJuZXciLCJzdWJtaXQiLCJpZCIsImVtYWlsIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJmdWxsTmFtZSIsInBhc3N3b3JkIiwiY3JlYXRlZEF0IiwiZXhpc3RpbmciLCJ1cGRhdGVUaXRsZSIsIndlbGNvbWUiLCJpbmRleCIsImhlbGxvIiwiZGVzY3JpcHRpb24iLCJtb3JlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsRUFBQUEsV0FBVyxFQUFFO0FBQ1hDLElBQUFBLE9BQU8sRUFBRSxxQkFERTtBQUVYQyxJQUFBQSxLQUFLLEVBQUU7QUFDTEMsTUFBQUEsT0FBTyxFQUFFO0FBQ1BDLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxPQUFPLEVBQUUsZUFESDtBQUVOQyxVQUFBQSxLQUFLLEVBQUU7QUFGRCxTQUREO0FBS1BDLFFBQUFBLE1BQU0sRUFBRTtBQUNORixVQUFBQSxPQUFPLEVBQUU7QUFESDtBQUxELE9BREo7QUFVTEcsTUFBQUEsS0FBSyxFQUFFO0FBQ0xKLFFBQUFBLE1BQU0sRUFBRTtBQUNORSxVQUFBQSxLQUFLLEVBQUUsNkJBREQ7QUFFTkQsVUFBQUEsT0FBTyxFQUFFO0FBRkgsU0FESDtBQUtMSSxRQUFBQSxNQUFNLEVBQUU7QUFDTkgsVUFBQUEsS0FBSyxFQUFFLDZEQUREO0FBRU5ELFVBQUFBLE9BQU8sRUFBRTtBQUZILFNBTEg7QUFTTEUsUUFBQUEsTUFBTSxFQUFFO0FBQ05ELFVBQUFBLEtBQUssRUFBRSw2REFERDtBQUVORCxVQUFBQSxPQUFPLEVBQUUsNkJBRkg7QUFHTkssVUFBQUEsSUFBSSxFQUFFO0FBSEE7QUFUSCxPQVZGO0FBeUJMQyxNQUFBQSxTQUFTLEVBQUU7QUF6Qk4sS0FGSTtBQTZCWEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1BDLE1BQUFBLFdBQVcsRUFBRTtBQUNYTCxRQUFBQSxLQUFLLEVBQUUsY0FESTtBQUVYTSxRQUFBQSxNQUFNLEVBQUUsTUFGRztBQUdYQyxRQUFBQSxNQUFNLEVBQUUsYUFIRztBQUlYQyxRQUFBQSxPQUFPLEVBQUU7QUFKRTtBQUROLEtBN0JFO0FBcUNYQyxJQUFBQSxLQUFLLEVBQUU7QUFDTGQsTUFBQUEsT0FBTyxFQUFFO0FBQ1BlLFFBQUFBLEdBQUcsRUFBRTtBQUNISixVQUFBQSxNQUFNLEVBQUUsTUFETDtBQUVISyxVQUFBQSxNQUFNLEVBQUU7QUFGTDtBQURFLE9BREo7QUFPTFgsTUFBQUEsS0FBSyxFQUFFO0FBQ0xZLFFBQUFBLEVBQUUsRUFBRSxJQURDO0FBRUxDLFFBQUFBLEtBQUssRUFBRSxPQUZGO0FBR0xDLFFBQUFBLFNBQVMsRUFBRSxLQUhOO0FBSUxDLFFBQUFBLFFBQVEsRUFBRSxTQUpMO0FBS0xDLFFBQUFBLFFBQVEsRUFBRSxZQUxMO0FBTUxDLFFBQUFBLFFBQVEsRUFBRSxRQU5MO0FBT0xDLFFBQUFBLFNBQVMsRUFBRSxlQVBOO0FBUUxSLFFBQUFBLEdBQUcsRUFBRTtBQUNIQyxVQUFBQSxNQUFNLEVBQUUsV0FETDtBQUVISixVQUFBQSxNQUFNLEVBQUU7QUFGTCxTQVJBO0FBWUxZLFFBQUFBLFFBQVEsRUFBRTtBQUNSbEIsVUFBQUEsTUFBTSxFQUFFLFVBREE7QUFFUkYsVUFBQUEsTUFBTSxFQUFFLFNBRkE7QUFHUnFCLFVBQUFBLFdBQVcsRUFBRTtBQUhMO0FBWkwsT0FQRjtBQXlCTEMsTUFBQUEsT0FBTyxFQUFFO0FBQ1BDLFFBQUFBLEtBQUssRUFBRTtBQUNMQyxVQUFBQSxLQUFLLEVBQUUscUJBREY7QUFFTEMsVUFBQUEsV0FBVyxFQUFFLHdDQUZSO0FBR0xDLFVBQUFBLElBQUksRUFBRTtBQUhEO0FBREE7QUF6Qko7QUFyQ0k7QUFERSxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmFuc2xhdGlvbjoge1xuICAgIGFwcE5hbWU6ICdOaWRnZXMgVGFzayBNYW5hZ2VyJyxcbiAgICBmbGFzaDoge1xuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBzdWNjZXNzOiAn0JLRiyDQt9Cw0LvQvtCz0LjQvdC10L3RiycsXG4gICAgICAgICAgZXJyb3I6ICfQndC10L/RgNCw0LLQuNC70YzQvdGL0Lkg0LXQvNC10LnQuyDQuNC70Lgg0L/QsNGA0L7Qu9GMJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiB7XG4gICAgICAgICAgc3VjY2VzczogJ9CS0Ysg0YDQsNC30LvQvtCz0LjQvdC10L3RiycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdXNlcnM6IHtcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZXJyb3I6ICfQndC1INGD0LTQsNC70L7RgdGMINC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGMJyxcbiAgICAgICAgICBzdWNjZXNzOiAn0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGD0YHQv9C10YjQvdC+INC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDQvScsXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIGVycm9yOiAn0JLRiyDQvdC1INC80L7QttC10YLQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCDQuNC70Lgg0YPQtNCw0LvRj9GC0Ywg0LTRgNGD0LPQvtCz0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPJyxcbiAgICAgICAgICBzdWNjZXNzOiAn0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGD0YHQv9C10YjQvdC+INC40LfQvNC10L3RkdC9JyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiB7XG4gICAgICAgICAgZXJyb3I6ICfQktGLINC90LUg0LzQvtC20LXRgtC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMINC40LvQuCDRg9C00LDQu9GP0YLRjCDQtNGA0YPQs9C+0LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8nLFxuICAgICAgICAgIHN1Y2Nlc3M6ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YPRgdC/0LXRiNC90L4g0YPQtNCw0LvRkdC9JyxcbiAgICAgICAgICBmYWlsOiAn0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhdXRoRXJyb3I6ICfQlNC+0YHRgtGD0L8g0LfQsNC/0YDQtdGJ0ZHQvSEg0J/QvtC20LDQu9GD0LnRgdGC0LAsINCw0LLRgtC+0YDQuNC30LjRgNGD0LnRgtC10YHRjC4nLFxuICAgIH0sXG4gICAgbGF5b3V0czoge1xuICAgICAgYXBwbGljYXRpb246IHtcbiAgICAgICAgdXNlcnM6ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70LgnLFxuICAgICAgICBzaWduSW46ICfQktGF0L7QtCcsXG4gICAgICAgIHNpZ25VcDogJ9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8nLFxuICAgICAgICBzaWduT3V0OiAn0JLRi9GF0L7QtCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdmlld3M6IHtcbiAgICAgIHNlc3Npb246IHtcbiAgICAgICAgbmV3OiB7XG4gICAgICAgICAgc2lnbkluOiAn0JLRhdC+0LQnLFxuICAgICAgICAgIHN1Ym1pdDogJ9CS0L7QudGC0LgnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHVzZXJzOiB7XG4gICAgICAgIGlkOiAnSUQnLFxuICAgICAgICBlbWFpbDogJ0VtYWlsJyxcbiAgICAgICAgZmlyc3ROYW1lOiAn0JjQvNGPJyxcbiAgICAgICAgbGFzdE5hbWU6ICfQpNCw0LzQuNC70LjRjycsXG4gICAgICAgIGZ1bGxOYW1lOiAn0J/QvtC70L3QvtC1INC40LzRjycsXG4gICAgICAgIHBhc3N3b3JkOiAn0J/QsNGA0L7Qu9GMJyxcbiAgICAgICAgY3JlYXRlZEF0OiAn0JTQsNGC0LAg0YHQvtC30LTQsNC90LjRjycsXG4gICAgICAgIG5ldzoge1xuICAgICAgICAgIHN1Ym1pdDogJ9Ch0L7RhdGA0LDQvdC40YLRjCcsXG4gICAgICAgICAgc2lnblVwOiAn0KDQtdCz0LjRgdGC0YDQsNGG0LjRjycsXG4gICAgICAgIH0sXG4gICAgICAgIGV4aXN0aW5nOiB7XG4gICAgICAgICAgdXBkYXRlOiAn0JjQt9C80LXQvdC40YLRjCcsXG4gICAgICAgICAgZGVsZXRlOiAn0KPQtNCw0LvQuNGC0YwnLFxuICAgICAgICAgIHVwZGF0ZVRpdGxlOiAn0JjQt9C80LXQvdC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgd2VsY29tZToge1xuICAgICAgICBpbmRleDoge1xuICAgICAgICAgIGhlbGxvOiAn0J/RgNC40LLQtdGCINC+0YIg0KXQtdC60YHQu9C10YLQsCEnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAn0J/RgNCw0LrRgtC40YfQtdGB0LrQuNC1INC60YPRgNGB0Ysg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LjRgNC+0LLQsNC90LjRjicsXG4gICAgICAgICAgbW9yZTogJ9Cj0LfQvdCw0YLRjCDQkdC+0LvRjNGI0LUnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==
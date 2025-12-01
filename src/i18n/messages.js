export const messages = {
  ru: {
    // Header
    appName: 'Steam Review Editor',
    madeBy: 'Сделано 5h4dow для',
    
    // Navigation
    nav: {
      myReviews: 'Мои обзоры',
      editor: 'Редактор',
      feedback: 'Обратная связь'
    },
    
    // Reviews page
    reviews: {
      title: 'Мои обзоры',
      newReview: 'Новый обзор',
      edit: 'Редактировать',
      copy: 'Копировать',
      delete: 'Удалить',
      empty: {
        title: 'Нет сохранённых обзоров',
        subtitle: 'Создайте свой первый обзор для Steam',
        create: 'Создать обзор'
      },
      deleteModal: {
        title: 'Удалить обзор?',
        confirm: 'Вы уверены, что хотите удалить',
        warning: 'Это действие нельзя отменить.',
        cancel: 'Отмена',
        delete: 'Удалить'
      },
      time: {
        now: 'только что',
        minutes: 'мин. назад',
        hours: 'ч. назад',
        days: 'дн. назад'
      },
      chars: 'символов'
    },
    
    // Editor
    editor: {
      preview: 'Предпросмотр',
      previewSubtitle: 'Как будет выглядеть в Steam',
      save: 'Сохранить',
      copy: 'Копировать',
      copied: 'Скопировано!',
      saveReview: 'Сохранить обзор',
      saveChanges: 'Сохранить изменения',
      reviewNamePlaceholder: 'Название обзора...',
      cancel: 'Отмена',
      history: {
        undo: 'Отменить',
        redo: 'Повторить'
      },
      ai: {
        analyze: 'Проверить',
        stylize: 'Стилизовать',
        analyzing: 'Анализ...',
        stylizing: 'Стилизация...',
        noErrors: 'Ошибок не найдено!',
        fix: 'Исправить',
        fixAll: 'Исправить все'
      },
      signature: {
        title: 'Подпись',
        hint: 'Эта подпись будет добавляться в конец при копировании',
        placeholder: 'Например:\n\n[hr]\n[i]Понравился обзор? Подпишись![/i]',
        toggle: 'Добавлять при копировании',
        clear: 'Очистить'
      },
      counter: {
        chars: 'символов'
      }
    },
    
    // Feedback
    feedback: {
      title: 'Обратная связь',
      subtitle: 'Сообщите о проблеме, предложите идею или оставьте отзыв',
      types: {
        bug: 'Баг',
        suggestion: 'Предложение',
        review: 'Отзыв'
      },
      form: {
        messageType: 'Тип сообщения',
        name: 'Ваше имя',
        nameOptional: '(необязательно)',
        namePlaceholder: 'Аноним',
        message: 'Сообщение',
        messageRequired: '*',
        messagePlaceholder: 'Опишите вашу проблему, идею или оставьте отзыв...',
        submit: 'Отправить',
        submitting: 'Отправка...'
      },
      success: {
        title: 'Спасибо за ваше сообщение!',
        subtitle: 'Мы обязательно его рассмотрим',
        another: 'Отправить ещё'
      }
    },
    
    // Admin
    admin: {
      login: {
        title: '🔐 Вход в админку',
        placeholder: 'Пароль...',
        button: 'Войти',
        checking: 'Проверка...',
        error: 'Неверный пароль',
        back: '← Назад'
      },
      panel: {
        title: 'Управление обратной связью',
        logout: 'Выйти',
        total: 'Всего',
        bugs: 'Баги',
        ideas: 'Идеи',
        reviews: 'Отзывы',
        empty: 'Пока нет сообщений',
        status: {
          new: '🆕 Новое',
          read: '👀 Прочитано',
          resolved: '✅ Решено'
        },
        deleteModal: {
          title: 'Удалить сообщение?',
          from: 'От:',
          cancel: 'Отмена',
          delete: 'Удалить'
        }
      }
    },
    
    // AI
    ai: {
      title: 'ИИ Помощник',
      subtitle: 'Экспериментальная функция',
      analyzeHint: 'Проверит орфографию, грамматику и пунктуацию',
      stylizeHint: 'Автоматически добавит заголовки, выделения и списки',
      error: 'Ошибка',
      done: 'Готово',
      great: 'Отлично!',
      foundErrors: 'Найдено ошибок',
      errorLabel: 'Ошибка',
      fixTo: 'Исправить на',
      fixed: 'Исправлено'
    },
    
    // Toolbar
    toolbar: {
      heading1: 'Заголовок 1',
      heading2: 'Заголовок 2',
      heading3: 'Заголовок 3',
      bold: 'Жирный',
      italic: 'Курсив',
      underline: 'Подчёркнутый',
      strike: 'Зачёркнутый',
      spoiler: 'Спойлер',
      quote: 'Цитата',
      code: 'Код',
      list: 'Список',
      olist: 'Нумерованный список',
      url: 'Ссылка',
      hr: 'Линия'
    }
  },
  
  en: {
    // Header
    appName: 'Steam Review Editor',
    madeBy: 'Made by 5h4dow for',
    
    // Navigation
    nav: {
      myReviews: 'My Reviews',
      editor: 'Editor',
      feedback: 'Feedback'
    },
    
    // Reviews page
    reviews: {
      title: 'My Reviews',
      newReview: 'New Review',
      edit: 'Edit',
      copy: 'Copy',
      delete: 'Delete',
      empty: {
        title: 'No saved reviews',
        subtitle: 'Create your first Steam review',
        create: 'Create Review'
      },
      deleteModal: {
        title: 'Delete review?',
        confirm: 'Are you sure you want to delete',
        warning: 'This action cannot be undone.',
        cancel: 'Cancel',
        delete: 'Delete'
      },
      time: {
        now: 'just now',
        minutes: 'min ago',
        hours: 'h ago',
        days: 'd ago'
      },
      chars: 'characters'
    },
    
    // Editor
    editor: {
      preview: 'Preview',
      previewSubtitle: 'How it will look on Steam',
      save: 'Save',
      copy: 'Copy',
      copied: 'Copied!',
      saveReview: 'Save Review',
      saveChanges: 'Save Changes',
      reviewNamePlaceholder: 'Review name...',
      cancel: 'Cancel',
      history: {
        undo: 'Undo',
        redo: 'Redo'
      },
      ai: {
        analyze: 'Check',
        stylize: 'Stylize',
        analyzing: 'Analyzing...',
        stylizing: 'Stylizing...',
        noErrors: 'No errors found!',
        fix: 'Fix',
        fixAll: 'Fix All'
      },
      signature: {
        title: 'Signature',
        hint: 'This signature will be added at the end when copying',
        placeholder: 'Example:\n\n[hr]\n[i]Liked the review? Follow me![/i]',
        toggle: 'Add when copying',
        clear: 'Clear'
      },
      counter: {
        chars: 'characters'
      }
    },
    
    // Feedback
    feedback: {
      title: 'Feedback',
      subtitle: 'Report a bug, suggest an idea, or leave a review',
      types: {
        bug: 'Bug',
        suggestion: 'Suggestion',
        review: 'Review'
      },
      form: {
        messageType: 'Message type',
        name: 'Your name',
        nameOptional: '(optional)',
        namePlaceholder: 'Anonymous',
        message: 'Message',
        messageRequired: '*',
        messagePlaceholder: 'Describe your issue, idea, or leave feedback...',
        submit: 'Submit',
        submitting: 'Submitting...'
      },
      success: {
        title: 'Thank you for your message!',
        subtitle: 'We will definitely review it',
        another: 'Send Another'
      }
    },
    
    // Admin
    admin: {
      login: {
        title: '🔐 Admin Login',
        placeholder: 'Password...',
        button: 'Login',
        checking: 'Checking...',
        error: 'Wrong password',
        back: '← Back'
      },
      panel: {
        title: 'Feedback Management',
        logout: 'Logout',
        total: 'Total',
        bugs: 'Bugs',
        ideas: 'Ideas',
        reviews: 'Reviews',
        empty: 'No messages yet',
        status: {
          new: '🆕 New',
          read: '👀 Read',
          resolved: '✅ Resolved'
        },
        deleteModal: {
          title: 'Delete message?',
          from: 'From:',
          cancel: 'Cancel',
          delete: 'Delete'
        }
      }
    },
    
    // AI
    ai: {
      title: 'AI Assistant',
      subtitle: 'Experimental feature',
      analyzeHint: 'Check spelling, grammar and punctuation',
      stylizeHint: 'Automatically add headings, highlights and lists',
      error: 'Error',
      done: 'Done',
      great: 'Great!',
      foundErrors: 'Found errors',
      errorLabel: 'Error',
      fixTo: 'Fix to',
      fixed: 'Fixed'
    },
    
    // Toolbar
    toolbar: {
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strike: 'Strikethrough',
      spoiler: 'Spoiler',
      quote: 'Quote',
      code: 'Code',
      list: 'List',
      olist: 'Numbered List',
      url: 'Link',
      hr: 'Line'
    }
  }
}

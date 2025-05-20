export const textes = {
  RU: {
    // Тексты для формы входа
    enterTitle: "Выберите вход",
    loginButton: "Войти",
    registerButton: "Зарегистрироваться",
    loginTitle: "Вход",
    emailPlaceholder: "Введите ваш email",

    // Тексты для формы аутентификации
    authTitle: "Аутентификация",
    companyName: "Имя компании",
    companyPlaceholder: "Введите название компании",
    commonEmail: "Общий email для входа",
    emailTooltip: "Этот email будет единым для всех сотрудников вашей компании",
    commonPassword: "Общий пароль",
    passwordTooltip:
      "Этот пароль будет единым для всех сотрудников вашей компании",
    passwordPlaceholder: "Введите пароль",
    roleText: (role) =>
      `Ваша роль: ${role}. Доступы будут различаться в зависимости от роли.`,
    role: "экспортер",

    backButton: "Назад",
    submitButton: "Завершить",
  },
  EN: {
    // Login form texts
    enterTitle: "Choose an entrance option",
    loginButton: "Login",
    registerButton: "Register",
    loginTitle: "Login",
    emailPlaceholder: "Enter your email",

    // Authentication form texts
    authTitle: "Authentication",
    companyName: "Company name",
    companyPlaceholder: "Enter company name",
    commonEmail: "Common login email",
    emailTooltip:
      "This email will be the same for all employees of your company",
    commonPassword: "Common password",
    passwordTooltip:
      "This password will be the same for all employees of your company",
    passwordPlaceholder: "Enter password",
    roleText: (role) =>
      `Your role: ${role}. Access will vary depending on the role.`,
    role: "importer",

    backButton: "Back",
    submitButton: "Complete",
  },
  CN: {
    // 登录表单文本
    enterTitle: "选择一个入口",
    loginButton: "登录",
    registerButton: "注册",
    loginTitle: "登录",
    emailPlaceholder: "输入您的电子邮件",

    // 认证表单文本
    authTitle: "认证",
    companyName: "公司名称",
    companyPlaceholder: "输入公司名称",
    commonEmail: "通用登录邮箱",
    emailTooltip: "此邮箱将适用于贵公司所有员工",
    commonPassword: "通用密码",
    passwordTooltip: "此密码将适用于贵公司所有员工",
    passwordPlaceholder: "输入密码",
    roleText: (role) => `您的角色: ${role}. 访问权限将根据角色而有所不同。`,
    role: "进口商",

    backButton: "返回",
    submitButton: "完成",
  },
};

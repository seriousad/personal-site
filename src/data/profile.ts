export const profile = {
  email: 'dolgopolov.kv@outlook.com',
  phone: '+79253179690',
  phoneDisplay: '+7 (925) 317-96-90',
  telegram: 'https://t.me/seriousad',
  telegramHandle: '@seriousad',
  linkedin: 'https://www.linkedin.com/in/konstantin-dolgopolov-b00a8b387',
  github: 'https://github.com/seriousad',
  role: 'AI & Backend Engineer',
};

export type Language = 'ru' | 'en';

export interface Project {
  number: string;
  category: string;
  title: string;
  company: string;
  role: string;
  contribution: string;
  description: string;
  tags: string[];
  variant: 'medical' | 'agents' | 'pipeline' | 'career';
  details: string[];
}

interface Experience {
  company: string;
  period: string;
  role: string;
  description: string;
  current?: boolean;
}

interface Content {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  skip: string;
  nav: { about: string; projects: string; experience: string; contact: string };
  theme: string;
  language: string;
  hero: {
    eyebrow: string;
    lead: string;
    text: string;
    facts: string[];
    cta: string;
    secondary: string;
    location: string;
    current: string;
    scroll: string;
    diagramCaption: string;
  };
  about: {
    label: string;
    title: string;
    text: string;
    note: string;
    capabilities: { title: string; text: string; stack: string }[];
  };
  projects: {
    label: string;
    title: string;
    intro: string;
    expand: string;
    contributionLabel: string;
    items: Project[];
  };
  experience: {
    label: string;
    title: string;
    intro: string;
    items: Experience[];
    educationLabel: string;
    education: { year: string; school: string; degree: string }[];
  };
  contact: {
    label: string;
    title: string;
    text: string;
    email: string;
    copy: string;
    copied: string;
    copyError: string;
    telegram: string;
    linkedin: string;
    github: string;
    phone: string;
  };
  footer: { note: string; top: string };
  notFound: { title: string; text: string; back: string };
}

export const content: Record<Language, Content> = {
  ru: {
    name: 'Константин Долгополов',
    firstName: 'Константин',
    lastName: 'Долгополов',
    title: 'Константин Долгополов — AI & Backend Engineer',
    description: 'AI- и backend-инженер. Разработка с 2021 года, 7 мультиагентных систем в продакшене. Архитектура и Python-сервисы. Опыт в ivi, Генотеке и Synapse Global.',
    skip: 'Перейти к содержимому',
    nav: { about: 'Обо мне', projects: 'Проекты', experience: 'Опыт', contact: 'Связаться' },
    theme: 'Переключить светлую и тёмную тему',
    language: 'Выбор языка',
    hero: {
      eyebrow: 'PYTHON · AI AGENTS · BACKEND',
      lead: 'Проектирую и вывожу в продакшен AI-системы и backend на Python.',
      text: 'Мультиагентные системы, RAG и инфраструктура агентов. От архитектуры и интеграций до развёртывания и поддержки.',
      facts: ['В разработке с 2021 года', '7 мультиагентных систем в продакшене'],
      cta: 'Написать в Telegram',
      secondary: 'Посмотреть проекты',
      location: 'Москва',
      current: 'Сейчас — AI Engineer в',
      scroll: 'Опыт и специализация',
      diagramCaption: 'Контекст, инструменты и выполнение задач',
    },
    about: {
      label: '01 / ОБО МНЕ',
      title: 'AI-инженерия с опытом backend-разработки.',
      text: 'С 2021 года разрабатываю сервисы на Python: API, системы обработки данных и внешние интеграции. В Генотеке разработал и вывел в продакшен семь мультиагентных систем. Сейчас в ivi внедряю AI-инструменты и развиваю инфраструктуру для их работы.',
      note: 'Веду задачи от проработки требований и архитектуры до запуска и сопровождения. Документирую решения, провожу code review и помогаю разработчикам в команде.',
      capabilities: [
        { title: 'Мультиагентные системы и RAG', text: 'Проектирую взаимодействие агентов, поиск по данным и интеграцию LLM в продукты. Настраиваю трассировку вызовов и управление выполнением.', stack: 'LangGraph / LangChain / RAG / Langfuse' },
        { title: 'Backend и интеграции', text: 'Разрабатываю API, модели данных и фоновые задачи. Оптимизирую запросы и кэширование, реализую обработку ошибок и сбоев интеграций.', stack: 'Python / FastAPI / Django / PostgreSQL' },
        { title: 'Harness engineering', text: 'Разрабатываю инфраструктуру выполнения AI-агентов: инструменты, управление контекстом, инструкции и оркестрацию задач.', stack: 'Tools / Context / Instructions / Orchestration' },
        { title: 'Архитектура и эксплуатация', text: 'Проектирую сервисы и их взаимодействие. Настраиваю сборку, развёртывание и CI/CD, документирую архитектурные решения.', stack: 'Docker / CI/CD / Redis / System Design' },
      ],
    },
    projects: {
      label: '02 / ИЗБРАННЫЕ ПРОЕКТЫ',
      title: 'AI-системы, интеграции и обработка данных.',
      intro: 'Избранные коммерческие и исследовательские проекты: задачи, технические решения и мой вклад в разработку.',
      expand: 'Подробнее об участии',
      contributionLabel: 'Мой вклад',
      items: [
        {
          number: '01', category: 'HEALTHTECH · AI', variant: 'medical',
          title: 'Обработка медицинских данных с AI',
          company: 'Генотек', role: 'AI / Backend',
          contribution: 'Спроектировал графы агентов и API, разработал RAG-пайплайн и интеграции по FHIR.',
          description: 'AI-ассистент и сервисы генерации медицинских заключений на основе лабораторных анализов, генетических рисков и электронных медицинских карт.',
          tags: ['LangGraph', 'FastAPI', 'FHIR', 'RAG'],
          details: ['Спроектировал графы агентов и backend API, реализовал интеграции медицинских данных по стандарту FHIR.', 'Разработал RAG-пайплайн и сервисы обработки анализов и результатов ДНК-тестов.', 'В Генотеке разработал и вывел в продакшен 7 мультиагентных систем на LangGraph и Langflow.'],
        },
        {
          number: '02', category: 'RESEARCH · MULTI-AGENT', variant: 'agents',
          title: 'Поиск генеалогических связей',
          company: 'Генотек', role: 'AI / Backend',
          contribution: 'Спроектировал взаимодействие агентов, разработал backend и курировал работу двух студентов.',
          description: 'Мультиагентная система для поиска и анализа генеалогической информации из архивов и неструктурированных источников.',
          tags: ['LangGraph', 'LangChain', 'ChromaDB'],
          details: ['Спроектировал граф взаимодействия и роли агентов, разработал парсер исторических данных.', 'Разработал API на FastAPI и модели данных на SQLAlchemy.', 'Настроил RAG-поиск, промпты и трассировку LLM-вызовов в Langfuse.', 'Курировал работу двух студентов над проектом в Генотеке.'],
        },
        {
          number: '03', category: 'BACKEND · DATA ENGINEERING', variant: 'pipeline',
          title: 'Миграция подписок YouTube → VK',
          company: 'Synapse Global', role: 'Backend',
          contribution: 'Спроектировал микросервисную архитектуру, разработал и оптимизировал backend, наставлял junior-разработчика.',
          description: 'Сервис переноса пользовательских подписок между платформами. Асинхронный пайплайн сбора, обработки и миграции данных с очередями и повторными попытками.',
          tags: ['Django', 'Celery', 'Redis', 'PostgreSQL'],
          details: ['Спроектировал микросервисную архитектуру и разработал серверную часть на Django. Описал взаимодействия в UML/BPMN.', 'Реализовал этапы обработки данных, очереди, повторные попытки и хранение промежуточных состояний.', 'Оптимизировал производительность backend-сервисов и пайплайна переноса подписок.', 'Настроил CI/CD на GitHub Actions.', 'Наставлял junior backend-разработчика: помогал с декомпозицией задач и проводил code review.'],
        },
        {
          number: '04', category: 'TALENTTECH · BACKEND', variant: 'career',
          title: 'Карьерный хаб',
          company: 'Synapse Global', role: 'Backend',
          contribution: 'Разработал backend и интеграцию с SuperJob, оптимизировал запросы и кэширование, наставлял junior-разработчика.',
          description: 'Платформа поиска работы внутри ВКонтакте: вакансии, резюме, отклики и уведомления. Обмен данными с SuperJob и фоновая обработка на Celery.',
          tags: ['Django', 'DRF', 'PostgreSQL', 'VK API'],
          details: ['Спроектировал и разработал серверную часть на Django и REST API для вакансий, резюме и откликов.', 'Реализовал интеграцию с SuperJob: обмен данными, сопоставление сущностей и обработку ошибок.', 'Разработал фильтры поиска и фоновые задачи на Celery. Оптимизировал ORM-запросы и кэширование в Redis.', 'Наставлял junior backend-разработчика и проводил code review.'],
        },
      ],
    },
    experience: {
      label: '03 / ОПЫТ', title: 'Опыт разработки и внедрения систем.',
      intro: 'Python-разработка с 2021 года. Backend-сервисы, платформы обработки данных и AI-инфраструктура.',
      items: [
        { company: 'ivi', period: 'Июнь 2026 — сейчас', role: 'AI Engineer', description: 'Исследую и внедряю AI-инструменты в компании. Разрабатываю и сопровождаю AI-инфраструктуру: инструменты агентов, управление контекстом, инструкции и оркестрацию выполнения задач.', current: true },
        { company: 'Генотек', period: 'Май 2025 — июнь 2026', role: 'AI / Backend Developer', description: 'Создал инфраструктуру разработки AI-инструментов и вывел в продакшен 7 мультиагентных систем на LangGraph и Langflow. Реализовал интеграции медицинских данных и настроил CI в Argo. Курировал работу двух студентов над системой поиска генеалогических связей.' },
        { company: 'Synapse Global', period: 'Май 2023 — май 2025', role: 'Backend Developer', description: 'Проектировал и разрабатывал Django-сервисы, внешние интеграции и пайплайны обработки данных. Разрабатывал AI-решения для продаж и поддержки на LangGraph, RAG и Qdrant. Наставлял junior-разработчика и проводил code review.' },
        { company: 'РЭУ им. Г. В. Плеханова', period: 'Ноябрь 2021 — декабрь 2023', role: 'Python Developer', description: 'Разрабатывал внутренние сервисы университета: систему заявок в техподдержку, Telegram-ботов и интеграции с 1С. Реализовал оплату обучения в личном кабинете.' },
      ],
      educationLabel: 'ОБРАЗОВАНИЕ',
      education: [
        { year: '2026', school: 'НИТУ МИСИС', degree: 'Магистр · Информационные системы и технологии' },
        { year: '2024', school: 'РЭУ им. Г. В. Плеханова', degree: 'Бакалавр · Прикладная информатика' },
      ],
    },
    contact: {
      label: '04 / КОНТАКТЫ', title: 'Обсудим вашу задачу.',
      text: 'Для обсуждения AI-систем, backend-разработки и профессионального сотрудничества — напишите в Telegram или на почту.',
      email: 'Написать на почту', copy: 'Скопировать email', copied: 'Email скопирован',
      copyError: 'Не удалось скопировать. Выделите адрес или нажмите на него, чтобы написать.',
      telegram: 'Прямая связь', linkedin: 'Профессиональный профиль', phone: 'Позвонить',
      github: 'Код и проекты',
    },
    footer: { note: 'AI-инженерия и backend-разработка.', top: 'Наверх' },
    notFound: { title: 'Страница не найдена.', text: 'Проверьте адрес или перейдите на главную страницу.', back: 'На главную' },
  },
  en: {
    name: 'Konstantin Dolgopolov', firstName: 'Konstantin', lastName: 'Dolgopolov',
    title: 'Konstantin Dolgopolov — AI & Backend Engineer',
    description: 'AI & Backend Engineer building production multi-agent systems and Python services. Software development since 2021. Experience at ivi, Genotek and Synapse Global.',
    skip: 'Skip to content',
    nav: { about: 'About', projects: 'Projects', experience: 'Experience', contact: 'Get in touch' },
    theme: 'Toggle light and dark theme', language: 'Select language',
    hero: {
      eyebrow: 'PYTHON · AI AGENTS · BACKEND', lead: 'I design and deliver production AI systems and Python backends.',
      text: 'Multi-agent systems, RAG and agent infrastructure. From architecture and integrations to deployment and maintenance.',
      facts: ['Building software since 2021', '7 multi-agent systems in production'],
      cta: 'Message me on Telegram', secondary: 'Explore my work', location: 'Moscow', current: 'Currently — AI Engineer at',
      scroll: 'Experience and expertise', diagramCaption: 'Context, tools and task execution',
    },
    about: {
      label: '01 / ABOUT', title: 'AI engineering grounded in backend development.',
      text: 'I’ve been building Python services since 2021: APIs, data processing systems and external integrations. At Genotek, I developed and deployed seven multi-agent systems. At ivi, I introduce AI tools and develop the infrastructure that supports them.',
      note: 'I take projects from requirements and architecture through to deployment and maintenance. I document technical decisions, review code and mentor developers.',
      capabilities: [
        { title: 'Multi-agent systems and RAG', text: 'I design agent interactions, data retrieval and LLM integrations for products, with call tracing and execution control.', stack: 'LangGraph / LangChain / RAG / Langfuse' },
        { title: 'Backend and integrations', text: 'I build APIs, data models and background jobs. I optimise queries and caching, and implement error handling for external integrations.', stack: 'Python / FastAPI / Django / PostgreSQL' },
        { title: 'Harness engineering', text: 'I build agent execution infrastructure: tools, context management, instructions and task orchestration.', stack: 'Tools / Context / Instructions / Orchestration' },
        { title: 'Architecture and operations', text: 'I design services and their interactions, set up builds, deployments and CI/CD, and document architectural decisions.', stack: 'Docker / CI/CD / Redis / System Design' },
      ],
    },
    projects: {
      label: '02 / SELECTED WORK', title: 'AI systems, integrations and data processing.',
      intro: 'Selected commercial and research projects: the problems, technical solutions and my contribution.', expand: 'More about my role',
      contributionLabel: 'My contribution',
      items: [
        {
          number: '01', category: 'HEALTHTECH · AI', variant: 'medical', title: 'AI-powered medical data processing',
          company: 'Genotek', role: 'AI / Backend',
          contribution: 'Designed agent graphs and APIs; built the RAG pipeline and FHIR integrations.',
          description: 'An AI assistant and medical report generation services using lab results, genetic risks and electronic health records.',
          tags: ['LangGraph', 'FastAPI', 'FHIR', 'RAG'],
          details: ['Designed agent graphs and backend APIs, integrating medical data using the FHIR standard.', 'Built RAG pipelines and services for processing lab results and DNA test data.', 'At Genotek, developed and shipped 7 multi-agent systems built with LangGraph and Langflow.'],
        },
        {
          number: '02', category: 'RESEARCH · MULTI-AGENT', variant: 'agents', title: 'Genealogical research system',
          company: 'Genotek', role: 'AI / Backend',
          contribution: 'Designed agent interactions, built the backend and mentored two students.',
          description: 'A multi-agent system for finding and analysing genealogical information in archives and unstructured sources.',
          tags: ['LangGraph', 'LangChain', 'ChromaDB'],
          details: ['Designed agent interactions and roles, and built a parser for historical data.', 'Developed the FastAPI application and SQLAlchemy data model.', 'Tuned RAG retrieval, prompts and LLM tracing with Langfuse.', 'Mentored two students working on the project at Genotek.'],
        },
        {
          number: '03', category: 'BACKEND · DATA ENGINEERING', variant: 'pipeline', title: 'YouTube → VK subscription migration',
          company: 'Synapse Global', role: 'Backend',
          contribution: 'Designed the microservice architecture, built and optimised the backend, and mentored a junior developer.',
          description: 'A service for transferring user subscriptions between platforms. An asynchronous pipeline for data collection, processing and migration, with queues and retries.',
          tags: ['Django', 'Celery', 'Redis', 'PostgreSQL'],
          details: ['Designed the microservice architecture, developed the Django backend and documented interactions with UML/BPMN.', 'Implemented data processing stages, queues, retries and intermediate state storage.', 'Optimised the performance of backend services and the subscription migration pipeline.', 'Set up GitHub Actions CI/CD.', 'Mentored a junior backend developer, helping break down tasks and conducting code reviews.'],
        },
        {
          number: '04', category: 'TALENTTECH · BACKEND', variant: 'career', title: 'Career Hub',
          company: 'Synapse Global', role: 'Backend',
          contribution: 'Built the backend and SuperJob integration, optimised queries and caching, and mentored a junior developer.',
          description: 'A job platform within VK: vacancies, résumés, applications and notifications. SuperJob data integration and background processing with Celery.',
          tags: ['Django', 'DRF', 'PostgreSQL', 'VK API'],
          details: ['Designed and developed the Django backend and REST APIs for vacancies, résumés and applications.', 'Integrated SuperJob, including data exchange, entity mapping and error handling.', 'Built search filters and Celery background jobs. Optimised performance through ORM query improvements and Redis caching.', 'Mentored a junior backend developer and conducted code reviews.'],
        },
      ],
    },
    experience: {
      label: '03 / EXPERIENCE', title: 'Experience building and deploying systems.',
      intro: 'Python development since 2021. Backend services, data processing platforms and AI infrastructure.',
      items: [
        { company: 'ivi', period: 'Jun 2026 — present', role: 'AI Engineer', description: 'Researching and introducing AI tools across the company. Developing and maintaining AI infrastructure: agent tools, context management, instructions and task orchestration.', current: true },
        { company: 'Genotek', period: 'May 2025 — Jun 2026', role: 'AI / Backend Developer', description: 'Built AI development infrastructure and deployed 7 multi-agent systems using LangGraph and Langflow. Implemented medical data integrations and Argo CI pipelines. Mentored two students on the genealogical research system.' },
        { company: 'Synapse Global', period: 'May 2023 — May 2025', role: 'Backend Developer', description: 'Designed and developed Django services, external integrations and data processing pipelines. Built AI solutions for sales and support using LangGraph, RAG and Qdrant. Mentored a junior developer and conducted code reviews.' },
        { company: 'Plekhanov University', period: 'Nov 2021 — Dec 2023', role: 'Python Developer', description: 'Developed internal university services: a helpdesk system, Telegram bots and 1C integrations. Implemented tuition payments through the student portal.' },
      ],
      educationLabel: 'EDUCATION',
      education: [
        { year: '2026', school: 'NUST MISIS', degree: 'Master’s · Information Systems and Technologies' },
        { year: '2024', school: 'Plekhanov University', degree: 'Bachelor’s · Applied Informatics' },
      ],
    },
    contact: {
      label: '04 / CONTACT', title: 'Let’s discuss your project.',
      text: 'For AI systems, backend development and professional collaboration, contact me on Telegram or by email.',
      email: 'Send an email', copy: 'Copy email', copied: 'Email copied',
      copyError: 'Could not copy. Select the address or click it to send an email.',
      telegram: 'Direct contact', linkedin: 'Professional profile', phone: 'Call me',
      github: 'Code and projects',
    },
    footer: { note: 'AI engineering and backend development.', top: 'Back to top' },
    notFound: { title: 'Page not found.', text: 'Check the address or return to the homepage.', back: 'Back to home' },
  },
};

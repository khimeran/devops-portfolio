// автогенерируется скриптом распила — правь секции в notes/*.html
const NOTES_MANIFEST = [
 {
  "id": "linux-fs",
  "title": "🐧 Linux",
  "short": "Linux",
  "subs": [
   {
    "id": "linux-fs-s0",
    "title": "Бинарники и ссылки"
   },
   {
    "id": "linux-fs-s1",
    "title": "Навигация по файловой системе"
   },
   {
    "id": "linux-fs-s2",
    "title": "Права в Linux"
   },
   {
    "id": "linux-fs-s3",
    "title": "Диски, файловые системы, RAID"
   },
   {
    "id": "linux-fs-s4",
    "title": "Процессы и systemd"
   },
   {
    "id": "linux-fs-s5",
    "title": "Юзеры и sudo"
   },
   {
    "id": "linux-fs-s6",
    "title": "Пакеты (dnf) и ротация логов"
   },
   {
    "id": "linux-fs-s7",
    "title": "Bash — скрипты и автоматизация"
   },
   {
    "id": "linux-fs-s8",
    "title": "Bash — логика: условия, циклы, case, функции"
   }
  ]
 },
 {
  "id": "network",
  "title": "🌐 Сеть и SSH",
  "short": "Сеть и SSH",
  "subs": [
   {
    "id": "network-s0",
    "title": "Интерфейсы, IP, маршруты"
   },
   {
    "id": "network-s1",
    "title": "Порты и соединения (ss)"
   },
   {
    "id": "network-s2",
    "title": "Firewall (firewalld)"
   },
   {
    "id": "network-s3",
    "title": "DNS — имена в IP"
   },
   {
    "id": "network-s4",
    "title": "SSH — удалённое управление"
   }
  ]
 },
 {
  "id": "nginx",
  "title": "🟢 nginx — веб-сервер и reverse proxy",
  "short": "nginx",
  "subs": [
   {
    "id": "nginx-s0",
    "title": "Модель процессов"
   },
   {
    "id": "nginx-s1",
    "title": "Структура файлов"
   },
   {
    "id": "nginx-s2",
    "title": "Структура конфига"
   },
   {
    "id": "nginx-s3",
    "title": "Welcome-страница — откуда"
   },
   {
    "id": "nginx-s4",
    "title": "Как nginx выбирает server и location"
   },
   {
    "id": "nginx-s5",
    "title": "Reverse proxy через proxy_pass"
   },
   {
    "id": "nginx-s6",
    "title": "SELinux-ловушка на Fedora"
   },
   {
    "id": "nginx-s7",
    "title": "Балансировка нагрузки через upstream"
   },
   {
    "id": "nginx-s8",
    "title": "SSL/TLS — HTTPS на nginx"
   },
   {
    "id": "nginx-s9",
    "title": "Логи и debug"
   },
   {
    "id": "nginx-s10",
    "title": "Базовые команды управления"
   }
  ]
 },
 {
  "id": "git",
  "title": "Git — система контроля версий",
  "short": "Git",
  "subs": [
   {
    "id": "git-s0",
    "title": "Основные команды"
   },
   {
    "id": "git-s1",
    "title": "Типичные ошибки"
   },
   {
    "id": "git-s2",
    "title": "Git Advanced — merge, rebase, конфликты, reflog"
   }
  ]
 },
 {
  "id": "docker",
  "title": "Docker — контейнеризация",
  "short": "Docker",
  "subs": [
   {
    "id": "docker-s0",
    "title": "Dockerfile — инструкция сборки"
   },
   {
    "id": "docker-s1",
    "title": "Основные команды"
   },
   {
    "id": "docker-s2",
    "title": "Типичные ошибки"
   }
  ]
 },
 {
  "id": "docker-compose",
  "title": "Docker Compose — управление стеком",
  "short": "Docker Compose",
  "subs": [
   {
    "id": "docker-compose-s0",
    "title": "Структура файла"
   },
   {
    "id": "docker-compose-s1",
    "title": "Основные команды"
   },
   {
    "id": "docker-compose-s2",
    "title": "YAML — синтаксис"
   }
  ]
 },
 {
  "id": "python",
  "title": "🐍 Python — язык и его законы",
  "short": "Python",
  "subs": [
   {
    "id": "python-s0",
    "title": "5 фундаментальных законов"
   },
   {
    "id": "python-s1",
    "title": "Три фонарика: type / dir / help"
   },
   {
    "id": "python-s2",
    "title": "Методы строк: встроенный инструментарий"
   },
   {
    "id": "python-s3",
    "title": "Цепочки методов = пайпы"
   },
   {
    "id": "python-s4",
    "title": "Аргументы: обязательные и со значением по умолчанию"
   },
   {
    "id": "python-s5",
    "title": "Обработка ошибок: try / except"
   }
  ]
 },
 {
  "id": "fastapi",
  "title": "FastAPI — бэкенд на Python",
  "short": "FastAPI",
  "subs": [
   {
    "id": "fastapi-s0",
    "title": "Структура приложения"
   },
   {
    "id": "fastapi-s1",
    "title": "Эндпоинты"
   },
   {
    "id": "fastapi-s2",
    "title": "HTTP методы"
   }
  ]
 },
 {
  "id": "sql",
  "title": "SQL и PostgreSQL",
  "short": "SQL и PostgreSQL",
  "subs": [
   {
    "id": "sql-s0",
    "title": "Миграция — создание таблицы"
   },
   {
    "id": "sql-s1",
    "title": "Основные SQL команды"
   },
   {
    "id": "sql-s2",
    "title": "EXPLAIN ANALYZE — анализ запросов"
   },
   {
    "id": "sql-s3",
    "title": "Индексы — ускорение поиска"
   },
   {
    "id": "sql-s4",
    "title": "JOIN — объединение таблиц"
   },
   {
    "id": "sql-s5",
    "title": "GROUP BY и HAVING — группировка"
   },
   {
    "id": "sql-s6",
    "title": "NULL — ловушки"
   },
   {
    "id": "sql-s7",
    "title": "ALTER TABLE — изменение структуры"
   },
   {
    "id": "sql-s8",
    "title": "DELETE vs TRUNCATE"
   }
  ]
 },
 {
  "id": "html-css",
  "title": "HTML и CSS",
  "short": "HTML и CSS",
  "subs": [
   {
    "id": "html-css-s0",
    "title": "Структура HTML файла"
   },
   {
    "id": "html-css-s1",
    "title": "Основные CSS свойства"
   },
   {
    "id": "html-css-s2",
    "title": "Типы блоков"
   },
   {
    "id": "html-css-s3",
    "title": "IntersectionObserver — отслеживание видимости"
   }
  ]
 },
 {
  "id": "github-actions",
  "title": "GitHub Actions — автоматизация",
  "short": "GitHub Actions",
  "subs": [
   {
    "id": "github-actions-s0",
    "title": "Структура workflow файла"
   },
   {
    "id": "github-actions-s1",
    "title": "Что происходит после git push"
   },
   {
    "id": "github-actions-s2",
    "title": "CI/CD pipeline — три джоба"
   },
   {
    "id": "github-actions-s3",
    "title": "needs: — зависимость между джобами"
   },
   {
    "id": "github-actions-s4",
    "title": "pytest — тесты для FastAPI"
   },
   {
    "id": "github-actions-s5",
    "title": "concurrency — защита от конфликтов"
   }
  ]
 },
 {
  "id": "airflow",
  "title": "🌬 Apache Airflow — оркестратор задач",
  "short": "Apache Airflow",
  "subs": [
   {
    "id": "airflow-s0",
    "title": "DAG — главное слово Airflow"
   },
   {
    "id": "airflow-s1",
    "title": "Архитектура: кто что делает"
   }
  ]
 },
 {
  "id": "prometheus-grafana",
  "title": "Prometheus + Grafana — мониторинг",
  "short": "Prometheus + Grafana",
  "subs": [
   {
    "id": "prometheus-grafana-s0",
    "title": "Как работает scraping"
   },
   {
    "id": "prometheus-grafana-s1",
    "title": "prometheus.yml — конфигурация"
   },
   {
    "id": "prometheus-grafana-s2",
    "title": "Метрики в FastAPI — prometheus-client"
   },
   {
    "id": "prometheus-grafana-s3",
    "title": "PromQL — язык запросов Prometheus"
   },
   {
    "id": "prometheus-grafana-s4",
    "title": "Grafana — настройка дашборда"
   }
  ]
 },
 {
  "id": "iac",
  "title": "🏗 IaC — Terraform / Ansible / Puppet",
  "short": "IaC (Terraform/Ansible/Puppet)",
  "subs": [
   {
    "id": "iac-s0",
    "title": "Три инструмента: кто за что отвечает"
   },
   {
    "id": "iac-s1",
    "title": "Terraform — жизненный цикл"
   },
   {
    "id": "iac-s2",
    "title": "Terraform — HCL: ресурсы и ссылки"
   },
   {
    "id": "iac-s3",
    "title": "Terraform — state"
   },
   {
    "id": "iac-s4",
    "title": "Terraform — variables, tfvars, outputs"
   },
   {
    "id": "iac-s5",
    "title": "Terraform — модули и структура репозитория"
   },
   {
    "id": "iac-s6",
    "title": "Terraform — backend, workspaces, окружения"
   },
   {
    "id": "iac-s7",
    "title": "Terraform — count, for_each, data, lifecycle"
   },
   {
    "id": "iac-s8",
    "title": "Terraform → Ansible/Puppet: передача эстафеты"
   },
   {
    "id": "iac-s9",
    "title": "Ansible — место в IaC и структура репозитория"
   },
   {
    "id": "iac-s10",
    "title": "Ansible — роли, переменные, шаблоны Jinja2"
   },
   {
    "id": "iac-s11",
    "title": "Ansible + Puppet: не «или», а «и»"
   },
   {
    "id": "iac-s12",
    "title": "Puppet — архитектура и цикл агента"
   },
   {
    "id": "iac-s13",
    "title": "Puppet — установка сервера, агента, сертификаты"
   },
   {
    "id": "iac-s14",
    "title": "Puppet — что где лежит на боевом сервере"
   },
   {
    "id": "iac-s15",
    "title": "Puppet — control-repo: структура прод-проекта"
   },
   {
    "id": "iac-s16",
    "title": "Puppet — язык: ресурсы и зависимости"
   },
   {
    "id": "iac-s17",
    "title": "Puppet — классы: параметры и include"
   },
   {
    "id": "iac-s18",
    "title": "Puppet — модуль, автозагрузка, расширения файлов"
   },
   {
    "id": "iac-s19",
    "title": "Puppet — шаблоны .epp и .erb"
   },
   {
    "id": "iac-s20",
    "title": "Puppet — Roles & Profiles: как заполнять"
   },
   {
    "id": "iac-s21",
    "title": "Puppet — site.pp и классификация нод"
   },
   {
    "id": "iac-s22",
    "title": "Puppet — Hiera: иерархия и lookup"
   },
   {
    "id": "iac-s23",
    "title": "Puppet — правила для одной ноды и глобально"
   },
   {
    "id": "iac-s24",
    "title": "Puppet — секреты: hiera-eyaml"
   },
   {
    "id": "iac-s25",
    "title": "Puppet — пример: пользователи, sudo, ключи"
   },
   {
    "id": "iac-s26",
    "title": "Puppet — пример: приветственная страница"
   },
   {
    "id": "iac-s27",
    "title": "Puppet — пример: мониторинг и алертинг"
   },
   {
    "id": "iac-s28",
    "title": "Puppet — пример: деплой приложения"
   },
   {
    "id": "iac-s29",
    "title": "Puppet — как разобраться в чужом проде"
   },
   {
    "id": "iac-s30",
    "title": "Puppet — отладка и типовые ошибки"
   },
   {
    "id": "iac-s31",
    "title": "Puppet — cheatsheet и best practices"
   }
  ]
 },
 {
  "id": "ansible",
  "title": "Ansible — автоматизация конфигурации",
  "short": "Ansible",
  "subs": [
   {
    "id": "ansible-s0",
    "title": "Ключевые концепции"
   },
   {
    "id": "ansible-s1",
    "title": "Inventory — список серверов"
   },
   {
    "id": "ansible-s2",
    "title": "Playbook — главный файл инструкций"
   },
   {
    "id": "ansible-s3",
    "title": "Запуск Ansible"
   },
   {
    "id": "ansible-s4",
    "title": "Идемпотентность — главный принцип"
   },
   {
    "id": "ansible-s5",
    "title": "Установка агента на сервер — правильно"
   },
   {
    "id": "ansible-s6",
    "title": "Puppet — тот же конфиг-менеджмент, но с агентами"
   }
  ]
 },
 {
  "id": "jenkins",
  "title": "Jenkins — CI/CD сервер",
  "short": "Jenkins",
  "subs": [
   {
    "id": "jenkins-s0",
    "title": "Установка через Docker"
   },
   {
    "id": "jenkins-s1",
    "title": "Jenkinsfile — описание pipeline"
   },
   {
    "id": "jenkins-s2",
    "title": "Ключевые понятия Jenkins"
   }
  ]
 },
 {
  "id": "ha-clusters",
  "title": "Отказоустойчивые кластеры",
  "short": "Отказоустойчивые кластеры",
  "subs": [
   {
    "id": "ha-clusters-s0",
    "title": "Ключевые понятия"
   },
   {
    "id": "ha-clusters-s1",
    "title": "Инструменты для HA"
   },
   {
    "id": "ha-clusters-s2",
    "title": "HAProxy — пример конфигурации"
   },
   {
    "id": "ha-clusters-s3",
    "title": "HA PostgreSQL с Patroni"
   },
   {
    "id": "ha-clusters-s4",
    "title": "Администрирование HA кластера"
   }
  ]
 },
 {
  "id": "kubernetes",
  "title": "☸️ Kubernetes — оркестратор контейнеров",
  "short": "Kubernetes",
  "subs": [
   {
    "id": "kubernetes-s0",
    "title": "Зачем нужен — боль, которую решает"
   },
   {
    "id": "kubernetes-s1",
    "title": "Архитектура: Control Plane и Nodes"
   },
   {
    "id": "kubernetes-s2",
    "title": "Pod — атом Kubernetes"
   },
   {
    "id": "kubernetes-s3",
    "title": "Deployment — следит, чтобы поды жили"
   },
   {
    "id": "kubernetes-s4",
    "title": "Service — стабильный адрес для подов"
   },
   {
    "id": "kubernetes-s5",
    "title": "Namespace, ConfigMap, Secret"
   },
   {
    "id": "kubernetes-s6",
    "title": "kubectl — главные команды"
   },
   {
    "id": "kubernetes-s7",
    "title": "Связь с тем, что ты уже знаешь"
   }
  ]
 },
 {
  "id": "jira-confluence",
  "title": "Jira и Confluence",
  "short": "Jira и Confluence",
  "subs": [
   {
    "id": "jira-confluence-s0",
    "title": "Jira — управление задачами"
   },
   {
    "id": "jira-confluence-s1",
    "title": "Confluence — база знаний команды"
   },
   {
    "id": "jira-confluence-s2",
    "title": "Runbook — главный документ DevOps"
   },
   {
    "id": "jira-confluence-s3",
    "title": "Интеграция Jira и Confluence"
   }
  ]
 },
 {
  "id": "devops-tips",
  "title": "⚡ Важно для DevOps",
  "short": "Важно для DevOps",
  "subs": [
   {
    "id": "devops-tips-s0",
    "title": "Операционные системы"
   },
   {
    "id": "devops-tips-s1",
    "title": "Текстовые редакторы в терминале"
   },
   {
    "id": "devops-tips-s2",
    "title": "VS Code — всё в одном"
   },
   {
    "id": "devops-tips-s3",
    "title": "curl — проверка HTTP запросов"
   },
   {
    "id": "devops-tips-s4",
    "title": "sed — замена текста в файлах"
   },
   {
    "id": "devops-tips-s5",
    "title": "Bash скрипты"
   },
   {
    "id": "devops-tips-s6",
    "title": "Cron — планировщик задач"
   },
   {
    "id": "devops-tips-s7",
    "title": "systemd на проде — главные приёмы"
   },
   {
    "id": "devops-tips-s8",
    "title": "SELinux — безопасность на Fedora/RHEL"
   },
   {
    "id": "devops-tips-s9",
    "title": "Диагностика — универсальный порядок"
   },
   {
    "id": "devops-tips-s10",
    "title": "Диски и RAID — боевые приёмы"
   },
   {
    "id": "devops-tips-s11",
    "title": "Стандартные порты — знать наизусть"
   },
   {
    "id": "devops-tips-s12",
    "title": "Секреты и переменные окружения"
   },
   {
    "id": "devops-tips-s13",
    "title": "HashiCorp Vault — сейф для секретов"
   },
   {
    "id": "devops-tips-s14",
    "title": "Лайфхаки и полезные сокращения"
   },
   {
    "id": "devops-tips-s15",
    "title": "PostgreSQL — администрирование"
   },
   {
    "id": "devops-tips-s16",
    "title": "NULL — заражает всё"
   },
   {
    "id": "devops-tips-s17",
    "title": "Боевые приёмы — закрепляем разобранное"
   }
  ]
 }
];

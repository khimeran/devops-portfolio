CREATE TABLE IF NOT EXISTS topics (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(100) NOT NULL,
      progress  INTEGER DEFAULT 0 CHECK (progress >= 0 AND
  progress <= 100),
      notes     TEXT,
      updated_at TIMESTAMP DEFAULT NOW()
  );

  INSERT INTO topics (name, progress, notes) VALUES
      ('Docker',      80, 'Образы, контейнеры, 
  docker-compose'),
      ('Git',         70, 'add, commit, push, ветки'),
      ('FastAPI',     30, 'Базовые эндпоинты, запуск'),
      ('PostgreSQL',  20, 'Подключение, базовые запросы'),
      ('Redis',       10, 'Установка, базовое 
  использование'),
      ('Prometheus',  15, 'Запуск, базовые метрики'),
      ('Grafana',     15, 'Запуск, первый дашборд'),
      ('Kubernetes',   0, ''),
      ('Zabbix',       0, ''),
      ('GitHub Actions', 40, 'Первый workflow, GitHub 
  Pages');
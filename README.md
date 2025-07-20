# NestJS Tasks API

Небольшой учебный проект на NestJS. Реализует базовые возможности REST API: создание пользователей и задач, фильтрация, сортировка и обновление данных. Все данные хранятся в памяти (без базы данных).
Используемая версия NestJS - 11.0.7

## Стек

- [NestJS](https://nestjs.com/)
- TypeScript
- In-Memory Storage
- DTO, Pipes, Exception Handling
- Class-Validator, Class-Transformer
- Уникальный идентификатор - Date.now()

## Запуск

```bash
npm install
npm run start
```

## Пример запроса

### Используется глобальный префикс: api

```json
POST /users
Content-Type: application/json

{
  "username": "Bob",
  "email": "bob@example.com"
}

POST /tasks
Content-Type: application/json

{
  "title": "Выучить NestJS",
  "desc": "Пройти основы и сделать мини-проект",
  "userId": 1753014775263
}
```

## Доступные методы

### Users

```
  POST /users — создать пользователя

  GET /users/:id — получить одного

  PATCH /users/:id — обновить пользователя
```

### Tasks

```
  POST /tasks — создать задачу (нужен userId)

  GET /tasks — получить список всех задач

      ?search=текст — поиск по названию или описанию

      ?limit=5 — ограничить количество

      ?sort=asc|desc|createAt — сортировка

      GET /tasks/:id — одна задача

      PATCH /tasks/:id — обновить задачу

      DELETE /tasks/:id — удалить
```

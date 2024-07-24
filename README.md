# Reply Master Web Application

WIP web application for a project to reply to instagram comments using AI. Built as a Next.js full stack application using:

- MySQL database
- Prisma ORM
- tRPC API
- TypeScript
- Next.js
- Tailwind

## How to run?

You will need an environment file ;)

`npm install && npm run dev`

## Code guidelines

- Keep components simple, break down to simple reusable code
- Group complex backend functionality in `server/services`
- You should run migrations once changing the prisma file using `npx prisma migrate [environment]`

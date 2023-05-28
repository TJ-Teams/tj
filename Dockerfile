##### DEPS

FROM node:18-alpine3.17 as deps
WORKDIR /app 

COPY package*.json ./

RUN npm install

##### BUILDER

FROM node:18-alpine3.17 as builder
WORKDIR /app

COPY . ./
COPY --from=deps /app ./

ENV NODE_ENV production

RUN npm run build

##### RUNNER

FROM node:18-alpine3.17 as runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=deps /app ./
COPY --from=builder /app/dist ./dist

EXPOSE 4173

CMD ["npm", "run", "preview"]
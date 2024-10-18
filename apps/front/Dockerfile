ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

FROM alpine as base
RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=webchat-front --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --no-frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN npx turbo build --filter=webchat-front

FROM nginx:alpine AS runner

COPY --from=builder /app/apps/front/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:22 AS build

WORKDIR /app

# Copy files
COPY package.json pnpm-lock.yaml ./

# Install pnpm & node modules
RUN npm install -g pnpm && pnpm install --frozen-lockfile --ignore-scripts

COPY . ./

ENV NODE_ENV=production

# Build app
RUN npm i -g dotenv-cli && dotenv -e .env -- pnpm build

FROM nginx:stable-alpine AS run

# Setup Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]

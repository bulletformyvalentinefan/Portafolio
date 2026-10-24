# Etapa 1: Compilación del sitio web
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Configurar pnpm para que no bloquee los scripts de compilación como esbuild
RUN pnpm config set ignore-scripts false
RUN pnpm install --frozen-lockfile --unsafe-perm

# Copiar el código fuente y compilar
COPY . .
RUN pnpm build

# Etapa 2: Servidor NGINX ultraliviano para producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Etapa 1: Compilación del sitio web
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar pnpm (ya que usas pnpm-lock.yaml)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el código fuente y compilar
COPY . .
RUN pnpm build

# Etapa 2: Servidor NGINX ultraliviano para producción
FROM nginx:alpine
# Copia el resultado compilado de la etapa 1 al directorio de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

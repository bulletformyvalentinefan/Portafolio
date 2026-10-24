# Etapa 1: Compilación del sitio web
FROM node:22-alpine AS builder
WORKDIR /app

# pnpm fijado para builds reproducibles (pnpm 11+ requiere Node >= 22)
RUN corepack enable && corepack prepare pnpm@12.15.0 --activate

# Copiar archivos de dependencias.
# pnpm-workspace.yaml es obligatorio: ahi vive allowBuilds (esbuild),
# sin el pnpm instal con strictDepBuilds y falla con ERR_PNPM_IGNORED_BUILDS.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

# Copiar el código fuente y compilar
COPY . .
RUN pnpm build

# Etapa 2: Servidor NGINX ultraliviano para producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

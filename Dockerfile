FROM node:lts-alpine3.18 AS builder
WORKDIR /app
COPY . .
RUN npm install
ENV VITE_BASE_URL=http://radio.local
RUN npm run build
FROM nginx:mainline-alpine3.18
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

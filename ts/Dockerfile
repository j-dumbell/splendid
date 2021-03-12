FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST $REACT_APP_API_HOST
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD nginx -g "daemon off;"

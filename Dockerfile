############################
# ---- Build stage ----
############################
FROM node:16.17.1-buster AS build

WORKDIR /app

ARG BUILDPLATFORM
RUN if [ "$BUILDPLATFORM" = "linux/amd64" ]; then \
      echo "nameserver 8.8.8.8" > /etc/resolv.conf ; \
    fi

ENV YARN_NETWORK_TIMEOUT=600000 \
    YARN_NETWORK_CONCURRENCY=1 \
    YARN_RETRY_MAX=5

ENV HUSKY=0 \
    YARN_ENABLE_PROGRESS_BARS=0

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn ember build --environment=production \
 && echo "Build output contents:" && ls -al dist

############################
# ---- Runtime stage ----
############################
FROM nginx:alpine 

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
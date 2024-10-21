FROM node:23-alpine AS client-builder
RUN apk add --no-cache python3 py3-pip make gcc g++ python3-dev
WORKDIR /app
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ .
RUN npm run build

FROM node:23-alpine
RUN apk add --no-cache python3 py3-pip make gcc g++ python3-dev
WORKDIR /app
COPY ./backend/ .
RUN chown -R node:node /app
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN npm run build
COPY --from=client-builder --chown=node:node /app/build /app/public
USER node
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "/app/dist/server.js" ]
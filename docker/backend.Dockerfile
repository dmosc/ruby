FROM node:12

ENV PORT=4000

COPY server/ server/
COPY package.json .
COPY yarn.lock .
COPY .babelrc .
RUN yarn global add nodemon
RUN yarn install --production

CMD ["yarn", "start:server"]
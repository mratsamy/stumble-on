FROM node:12.14.0-alpine3.11

ENV NODE_ENV production
ENV PORT 3000

# create app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependancies
COPY package*.json /usr/src/app
RUN npm install --production

# copy the app
COPY . /usr/src/app

RUN npm run build

CMD ["npm", "start"]
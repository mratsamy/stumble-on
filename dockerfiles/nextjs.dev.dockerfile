FROM node:12.14.0-alpine3.11

ENV NODE_ENV development
ENV PORT 3000

# create app dir
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# install dependancies
COPY package*.json /usr/src/app/
RUN npm install

# copy the app
COPY . /usr/src/app/

CMD ["npm", "run", "dev"]
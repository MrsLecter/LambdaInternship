FROM node

ENV NODE_PATH=./build

RUN npm run build

WORKDIR /dist

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "app.js"]
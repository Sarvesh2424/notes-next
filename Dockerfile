FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
RUN npm run build
USER node
CMD ["npm", "run", "start"]

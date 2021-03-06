FROM buildkite/puppeteer

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD node index.mjs
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# 建置專案（產生 dist）
RUN npm run build

# 使用輕量靜態伺服器提供 dist
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]

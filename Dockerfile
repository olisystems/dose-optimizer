FROM node:10-slim
WORKDIR D:\02_OLI\dose\opti-algo\dist\docker
COPY package*.json D:\02_OLI\dose\opti-algo\dist\docker
RUN npm install
# RUN npm ci --only=production
COPY ./dist/build D:\02_OLI\dose\opti-algo\dist\docker
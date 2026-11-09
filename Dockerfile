#Stage 1 build the angular app
FROM node:26-alpine3.23 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Stage 2 Serve the angular app
FROM nginx:alpine
COPY --from=build /app/dist/food-delivery-app/browser /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g","daemon off;" ]
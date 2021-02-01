### STAGE 1: Build ###
FROM node:11.10.0-alpine AS build

#Set Proxy For alphine
# ENV https_proxy=http://10.240.0.69:8080
# ENV http_proxy=http://10.240.0.69:8080

WORKDIR /app
COPY package*.json /app/
# SET proxy NPM
# RUN npm config set proxy http://10.240.0.69:8080 && \
# npm config set https-proxy http://10.240.0.69:8080

# RUN apk --no-cache --virtual build-dependencies add\
# git\
# && npm install\
# && apk del build-dependencies

RUN apk add git\
&& npm install

COPY ./ /app/
#RUN CI=true npm test                                   
# ^^ untuk menjalankan unit testing

RUN npm run build                
# ^^ untuk build

### STAGE 2: Production Environment ###
FROM nginx:1.16.0-alpine
COPY --from=build /app/build/ /usr/share/nginx/html

# command running
# 1. docker build --tag firdiansyah26/web-pokemon:1.0 .     >> buat build image
# 2. docker run -p 3000:80 -d firdiansyah26/web-pokemon:1.0 >> buat build container //[port custom:port nginx(default 80)], lalu jalankan localhost:3000
# 3. docker push firdiansyah26/web-pokemon:1.0              >> buat push ke repo docker [firdiansyah26/repobuildauto2000:1.0] menyesuaikan nama repo di docker hub
# docker container prune                                    >> untuk menghapus semua container yang tidak dipakai
# docker image rm [image id] [image id] --force             >> untuk menghapus image tanda [] dihapus 
# docker pull firdiansyah26/repobuildauto2000:1.0           >> untuk clone repo dari docker
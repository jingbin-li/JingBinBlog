FROM node:14.16.0

LABEL maintainer = "jingbin <binupup@163.com>"

RUN mkdir -p /home/jingbinBlog

COPY . /home/jingbinBlog

WORKDIR /home/jingbinBlog

RUN export NODE_ENV="production"

RUN export NG_CLI_ANALYTICS=false
RUN npm install -g @angular/cli@10.1.7
RUN cd /home/jingbinBlog/client && npm ci && npm run build

RUN npm install -g typescript
RUN npm install -g ts-node
RUN cd /home/jingbinBlog/ && npm ci && tsc -b

RUN cd /home/jingbinBlog/client-blog && npm ci && npm run build

EXPOSE 5000
CMD [ "node", "dist/src/server.js" ]
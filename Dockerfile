FROM node:14.16.0

LABEL maintainer = "jingbin <binupup@163.com>"

RUN mkdir -p /home/jingbinBlog

COPY . /home/jingbinBlog

WORKDIR /home/jingbinBlog

RUN npm install -g typescript

RUN npm install -g ts-node

RUN cd /home/jingbinBlog/ && npm install && tsc -b

# RUN cd /home/jingbinBlog/client/ && npm install && npm run build

RUN cd /home/jingbinBlog/client-blog && npm install && npm run build

EXPOSE 5000
CMD [ "node", "dist/src/server.js" ]
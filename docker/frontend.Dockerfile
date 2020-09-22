# Step 0 - Build
FROM node:12 AS build

# If REACT_APP_BACKEND_ENDPOINT variable is not passed as argument during image build,
# it defaults to "http://localhost:4000"
# i.e. docker build --build-arg REACT_APP_BACKEND_ENDPOINT=${ANY REACT_APP_BACKEND_ENDPOINT} ...
ARG REACT_APP_BACKEND_ENDPOINT="http://host.docker.internal:4000"
ENV REACT_APP_BACKEND_ENDPOINT=$REACT_APP_BACKEND_ENDPOINT

COPY public/ public/
COPY src/ src/
COPY package.json .
COPY yarn.lock .
COPY jsconfig.json .
RUN yarn global add serve
RUN yarn install --production
RUN yarn build

EXPOSE 8080
CMD ["serve", "-s", "-l", "tcp://0.0.0.0:8080", "build"]
FROM node:22.12.0

# Metadata
LABEL maintainer="Kevin Child <Kchild89@gmail.com>"
LABEL description="A simple Express.js API server that includes authentication and card routes."
LABEL cohort="Cohort-19" 
LABEL animal="Falcon"

WORKDIR /app

COPY . .

EXPOSE 8080/tcp

RUN npm install

CMD ["npm", "run", "dev"]

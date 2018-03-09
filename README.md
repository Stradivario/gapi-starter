## This is basic example project related with [GAPI](https://github.com/Stradivario/gapi) graphQL api with typescript Decorators

#### To start developing clone repository

```bash
git clone https://github.com/Stradivario/gapi-starter
```

#### Better use command line utility(gapi-cli) to install it type following command:

```bash
npm i -g gapi-cli
```



#### Type the following command to create new project from scratch via CLI

```bash
gapi-cli new my-project
```



#### To start project for "development" type:

```bash
npm start
```

#### To start project for "production" type:
This will run pm2-docker process.yml --only APP (check process.yml inside root repository)
```bash
npm run start:prod
```

### Docker

#### To build project with Docker type:
```bash
npm run build:docker
```

#### To start project with Docker type:
```bash
npm run start:docker
```

###### You can check docker-compose file to configurate environment variables
```yml
version: '2'
services:

  nginx:
    image: sameersbn/nginx:1.10.1-5
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/config:/etc/nginx
      - ./nginx/html:/usr/share/nginx/html/
      - ./nginx/certs:/usr/share/certs
    restart: always
    networks:
      default:
        ipv4_address: 182.10.0.2

  api:
    image: gapi/api/prod:latest
    ports:
      - "9000:9000"
    environment:
      - NODE_ENV=production
      - API_PORT=9000
      - GRAPHIQL_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhNGVuc3RvcmVAZ21haWwuY29tIiwic2NvcGUiOlsiQURNSU4iXSwiaWQiOjIsImlhdCI6MTUxMTk3NDkzNX0.M9PnW2IrVp4XGRvbzFrl0tx6vqs6oXItFK-wF5roneI
      - AMQP_HOST=172.10.0.4
      - AMQP_PORT=5672
      - CERT_PATH=

      # Local db config
      - DB_HOST=172.10.0.10
      - DB_PORT=5432
      - DB_NAME=antitheft
      - DB_USERNAME=dbuser
      - DB_PASSWORD=dbuserpass
      
      # Production db config
      - DB_HOST_PROD=yourPostgressAWSaddress.ckffxbb4tx38.us-east-2.rds.amazonaws.com
      - DB_PORT_PROD=5432
      - DB_NAME_PROD=postgres
      - DB_USERNAME_PROD=dbuser
      - DB_PASSWORD_PROD=dbuserpass

    restart: always
    mem_limit: 1000000000
    cpu_shares: 73
    container_name: gapi-api-prod
    depends_on:
      - nginx
    networks:
      default:
        ipv4_address: 182.10.0.3

networks:
  default:
    driver: bridge
    ipam:
     config:
       - subnet: 182.10.0.0/16
         gateway: 182.10.0.1

```

###### This script will start NGINX as a proxy container
###### Then we map our builded and started APP for queries and subscriptions
###### Builded container will be gapi/api/prod with name gapi-api-prod

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    access_log api-yourdomain.access.log;
    location / {
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       client_max_body_size 50M;
       proxy_set_header Host $http_host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header X-Frame-Options SAMEORIGIN;
       proxy_buffers 256 16k;
	     proxy_buffering off;
       proxy_buffer_size 16k;
       proxy_read_timeout 600s;
       proxy_pass http://182.10.0.3:9000;
    }

    location /subscriptions {
        
        # prevents 502 bad gateway error
        proxy_buffers 8 32k;
        proxy_buffer_size 64k;

        # redirect all HTTP traffic to localhost:9000;
        proxy_pass http://182.10.0.3:9000/subscriptions;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header X-NginX-Proxy true;

        # enables WS support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
	      proxy_buffering off;
        proxy_read_timeout 999999999;

    }
    # redirect all HTTP to HTTPS
    if ($scheme = http) {
       return 301 https://$server_name$request_uri;
    }

    listen 443;
    ssl on;
    ssl_certificate         /usr/share/certs/cert.pem;
    ssl_certificate_key     /usr/share/certs/cert.key;

}

```




##### After successfully started project you can open your browser to localhost:80 or 182.10.0.3:9000 the api will be served there


TODO: Better documentation...

Enjoy ! :)

# Steps to install project

User can buy and sell their project online

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`APP_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_NAME`

`DB_HOST`

`DB_PORT`

`JWT_SECRET_KEY`

`JWT_EXPIRES_IN`

`ADMIN_EMAIL`

`ADMIN_PASSWORD`

## Installation

Install my-project with npm

```bash
  npm run install
  npm run migrate
  npm run seed:all
```

# PostgreSQL integration in EC2:

### Allow firewall:

```bash
  sudo ufw status
  sudo ufw allow 5432/tcp
```

### Installation:

```bash
sudo apt install postgresql postgresql-contrib -y
```

### Start the PostgreSQL

```bash
sudo systemctl start postgresql
sudo systemctl enable PostgreSQL
sudo -i -u postgres
psql
```

### Create Database:

```bash
CREATE DATABASE mydatabase;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO imran;
\q
```

### Configure PostgreSQL:

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
uncomment : listen_addresses = '*'
sudo nano /etc/postgresql/14/main/pg_hba.conf
host    all             all             0.0.0.0/0               md5
```

### Restart PostgreSQL :

```bash
sudo systemctl restart PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-<version>-main.log
```

Replace <version> with the one using.

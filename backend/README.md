# Lieblingsclub

## Create Local Development DB (MySQL)

based on [this tutorial](https://matomo.org/faq/how-to-install/faq_23484/)

1. connect to mysql as `root` user: `mysql -u root -p`
2. create user: `CREATE USER 'lieblingsclub'@'localhost';`
3. create development DB: `CREATE DATABASE lieblingsclub;`
4. grant user access to DB: `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON lieblingsclub.* TO 'lieblingsclub'@'localhost';`
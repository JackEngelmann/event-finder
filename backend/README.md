# Lieblingsclub

## TODO

next:
- description
- selectd day over calendar, switch month

someday:
- administrative-view

postgres: https://wixelhq.com/blog/how-to-install-postgresql-on-ubuntu-remote-access

1. check if postgres server is running:  ps ax | grep postgresql
2. add linux user account for db: sudo adduser lieblingsclubdb (password: lieblingsclubdb)
3. update postgres root user password:
    - sudo su - postgres
    - psql
    - \password (type password: postgres)
    - \q
4. create role
    - createuser --interactive (name: lieblingsclubdb)
5. create database
    - createdb lieblingsclubdb;
6. change ownership of database
    - psql
    - ALTER DATABASE lieblingsclubdb OWNER TO lieblingsclubdb;
7. alter password of user lieblingsclubdb
    - ALTER USER lieblingsclubdb WITH PASSWORD 'lieblingsclubdb'
8. change pg_hba.conf: local postgres md5


mongod --dbpath=data --bind_ip 127.0.0.1

LINUX:
sudo systemctl status mongodb
sudo systemctl stop mongodb
sudo systemctl start mongodb
sudo systemctl restart mongodb
https://itsfoss.com/install-mongodb-ubuntu/

## Getting date/time in Mongoose

https://mongoosejs.com/docs/schematypes.html#dates

Converting time to JS style -> http://timestamp.online/

Handling time zones -> https://medium.com/@toastui/handling-time-zone-in-javascript-547e67aa842d

## Components in a post request for message

        {
    "message": "This is a different text",
    "whenToSendMsg": "December 18, 2019 06:30:00"

        }

## User Accounts to test

**usernames/passwords**
user1 / user1
user2 / user2
user3 / user3
admin / admin

##success tokens
user1 =

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGYxNDUxNDUzNmFmNjFiZTAyYTA3NjIiLCJpYXQiOjE1NzYxODU3NjQsImV4cCI6MTU3NjE4OTM2NH0.-N5H2eRGZJuDDeMZQNYYcU0GbFJmthq-sv09wobtdqQ
```

user2 =

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGYxNDUxZjUzNmFmNjFiZTAyYTA3NjMiLCJpYXQiOjE1NzYxODA3NTQsImV4cCI6MTU3NjE4NDM1NH0.rekBPO2P6RCA5lpD0sag0XCISMiZHcKjC87tjIvj5Aw
```

user3 =

````
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGYxNDUwYjUzNmFmNjFiZTAyYTA3NjEiLCJpYXQiOjE1NzYxODA3ODUsImV4cCI6MTU3NjE4NDM4NX0.sIy95biaZERJYjUwD4bE_42X9u5byQdCUzIgqMeYNbg
```

admin =

```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGYxNDUzMzUzNmFmNjFiZTAyYTA3NjQiLCJpYXQiOjE1NzYxODU2NzIsImV4cCI6MTU3NjE4OTI3Mn0.ewx4eJ1KaQV0BQnB1AyG16HGZry7mwNz_GIoPCG_MXM

```
````

{
"username": "admin",
"password": "admin"
}

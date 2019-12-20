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

## Things to do

[] - add authentication

## Questions for Adam

1. The nodejs route for make is locked. It says unauthorized.
   BUT -- if i visit make.html, it's available. Is it because it's in /public?

2. The

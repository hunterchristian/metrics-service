Server runs on localhost:3000
run 'npm start' from the terminal to start the service

I followed the MongoDB tutorial found here: http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

To start mongodb, open the terminal and do the following:
1. Navigate to this directory: C:\Program Files\MongoDB\Server\3.4\bin
2. Run this command: mongod --dbpath C:\Users\hhodnett\Documents\projects\personal\metrics-service\data
3. This will start the Mongo server. You will need to leave this terminal instance open and perform all other commands
in another terminal instance.

If you want to run commands against the MongoDB database (e.g. to delete a collection, insert records manually, etc),
then open the terminal and do the following:
1. Navigate to this directory: C:\Program Files\MongoDB\Server\3.4\bin
2. Run this command: mongo
3. You now have a repl in which to run commands against the database.

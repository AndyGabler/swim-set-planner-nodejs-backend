# swim-set-planner-nodejs-backend
Node ExpressJS backend for my swim set planner.

## Setup

Before running the app, a Session secret will need to be generated and stored at `./session-secret`.
Key generated by generating a 128 byte hex String [with this link](https://www.random.org/bytes/).
The hex string is then converted to text using [this link](https://www.duplichecker.com/hex-to-text.php).

This was initially setup using 
```
npm install express --save
```

To run the app
```
node app.js
```

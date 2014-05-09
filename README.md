crate-connect
=======

A simple node.js driver to connect to a Crate.io Data Storage, this was originally part of the [CrateJS](https://github.com/herenow/cratejs) driver, now [CrateJS](https://github.com/herenow/cratejs) is an extension of crate-connect.


Installation
----------
```
npm install crate-connect
```


Sample usage
----------

```javascript
var Crate = require('crate-connect');

// You can have as many db instance as you please :)
// You should probably add this part to another module and export it!
var db = new Crate({
  host: 'localhost', //Defaults to localhost
  port: 4200, //Defaults to 4200
  // You can also send in a cluster of nodes
  cluster: [
      {
        host: 'localhost',
        port:4200
      },
  ]
});

// Now lets build some queries, using placeholders, you can either use ? or $1, $2, $3...
var q = {
  getSomeTweets: db.Query('SELECT text FROM tweets LIMIT ?'),
  getReTweeted:  db.Query('SELECT text FROM tweets WHERE retweeted = $1 LIMIT $2'),
};

// Get some tweets
q.getSomeTweets.execute([10], onResponse);

// Get only tweets with retweets
q.getReTweeted.execute([true, 10], onResponse);

function onResponse(err, res) {
    if(err) {
      //Do something
      return;
    }

    console.log('Returned %d rows', res.rowcount);
    console.log('Columns returned:\n', res.cols);
    console.log(res.rows);
}
```


Methods
----------

**db.Query(string)**
* This constructs a query and returns an .execute() method.

**db.execute(query, statements, callback)**
* This executes a query directly
* Statements is an optional parameter, you can replace it with the callback
```javascript
db.execute('SELECT * FROM tweets LIMIT ?', [1], function(err, res) {})
```

**db.blob().put(table, hash, buffer, callback)**
* All arguments are mandatory
```javascript
db.execute('imagesTable', 'e0d123e5f316bef78bfdf5a008837577', buffer, function(err) {
    if(err) {
        //err.statusCode
    }
})
```

**db.blob().get(table, hash, callback)**
* All arguments are mandatory
```javascript
db.execute('imagesTable', 'e0d123e5f316bef78bfdf5a008837577', function(err, buffer) {
    if(err) {
        //err.statusCode
    }
})
```

**db.blob().check(table, hash, callback)**
* All arguments are mandatory
```javascript
db.execute('imagesTable', 'e0d123e5f316bef78bfdf5a008837577', function(err) {
    if(err) {
        //err.statusCode
    }
})
```


TODO
---------
* Test db.blob()
* Refactor some pieces of this code, its messy :(
* Finish writing tests


Authors
---------
This was created for the Crate.io Data Storage.
- [herenow](https://github.com/herenow)


Thanks to
----------
Nobody yet :(

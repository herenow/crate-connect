/**
 * Responsible for sending query requests
 */
var Http = require('http');
var Query = {};
var maxRetries = 3;


/**
 * Send a query POST
 */
Query.send = function Send(query, statements, callback, retry) {
    var node = this.node();
    var options = {
        method: 'POST',
        path:   '/_sql',
        host:   node.host || 'localhost',
        port:   node.port || 4200,
        //No need to specify Keep-Alive, node will use the default global agent
    }

    if(!retry) retry = 0;

    var request = Http.request(options);

    //I really hope this query is sanatized!
    var data = {
        stmt: query
    }

    if(statements.length > 0) {
        data.args = statements;
    }

    request.write( JSON.stringify(data) );
    request.end();

    if(typeof callback === 'function') {
        request.on('response', function(res) {
            var buf = '';

            res.on('data', function(data) {
                buf += data;
            });

            res.on('end', function() {
                var result = JSON.parse(buf);

                if(result.error) {
                    callback(result.error, null);
                }
                else {
                    callback(null, result);
                }
            });
        });

        request.on('error', function(e) {
            if(retry<maxRetries){
                // Try again
                Query.send(query,statements,callback,retry+1);
            }else{
                callback(e, null);
            }
            request.abort();
        });
    }

    return this;
}


/**
 * Exports
 */
module.exports = Query;

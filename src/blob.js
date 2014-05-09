/**
 * This is a helper for managing blobs
 * For now, this will simply expose a public method for managing blob's throught the connect.blob.js
 * In future versions i will extend this
 */
function Blob() {
    return {
        put: this._connection.blobPut,
        get: this._connection.blobGet,
        check: this._connection.blobCheck,
    };
}


/**
 * Exports
 */
module.exports = Blob;

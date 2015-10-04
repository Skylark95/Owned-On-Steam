var PromiseTester = {
    resolve: function(value) {
        return new Promise(function(resolve, reject) {
            resolve(value);
        });
    },
    reject: function(value) {
        return new Promise(function(resolve, reject) {
            reject(value);
        });
    }
};

const { Transform } = require('stream');

function AppendInitVect(initVect, opts) {
    Transform.call(this, opts)
    this.initVect = initVect
    this.appended = false
}

AppendInitVect.prototype = Object.create(Transform.prototype)

AppendInitVect.prototype._transform = function (chunk, encoding, cb) {
    if (!this.appended) {
        this.push(this.initVect);
        this.appended = true;
    }
    this.push(chunk);
    cb();
}

/*
class AppendInitVect extends Transform {
    constructor(initVect, opts) {
        super(opts);
        this.initVect = initVect;
        this.appended = false;
    }

    _transform(chunk, encoding, cb) {
        if (!this.appended) {
            this.push(this.initVect);
            this.appended = true;
        }
        this.push(chunk);
        cb();
    }
}
*/

module.exports = AppendInitVect;
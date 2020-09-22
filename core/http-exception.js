class HTTPException extends Error {
    constructor(msg="HTTPException 错误", errorCode=10000, code=500) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

class Success extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || "ok"
        this.errorCode = errorCode || 0
    }
}

class ParameterException extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || "请求参数错误"
        this.errorCode = errorCode || 10400
    }
}

class NotFound extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || "没有找到资源"
        this.errorCode = errorCode || 10404
    }
}

module.exports = {
    HTTPException, 
    Success,
    ParameterException,
    NotFound
}
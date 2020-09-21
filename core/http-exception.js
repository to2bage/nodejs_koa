class HTTPException extends Error {
    constructor(msg="HTTPException 错误", errorCode=10000, code=500) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
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

module.exports = {
    HTTPException, 
    ParameterException
}
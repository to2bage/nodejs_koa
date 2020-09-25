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

class AuthFailed extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || "授权失败"
        this.errorCode = errorCode || 10401
    }
}

class Forbidden extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.msg = msg || "禁止fangwen"
        this.errorCode = errorCode || 10403
    }
}

class LikeError extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || "你已经点过赞了",
        this.errorCode = errorCode || 10410
    }
}

class DislikeError extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || "你已经取消点赞了",
        this.errorCode = errorCode || 10420
    }
}

module.exports = {
    HTTPException, 
    Success,
    ParameterException,
    NotFound,
    AuthFailed,
    Forbidden, 
    LikeError,
    DislikeError
}
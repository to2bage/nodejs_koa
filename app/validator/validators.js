const {LinValidator, Rule} = require("../../core/lin-validator-v2")

// 验证id是否是正整数
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt", "查询字符串id必须是正整数", {min:1})
        ] 
    }
}

module.exports = {
    PositiveIntegerValidator                // 验证id是否是正整数
}
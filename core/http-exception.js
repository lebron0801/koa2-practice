/**
 * 基本错误
 */
class HttpException extends Error {
	constructor(msg = '服务器异常', code = 400) {
		super();
		this.code = code;
		this.msg = msg;
	}
}

/**
 * 系统错误类
 */
class SystemException extends HttpException {
	constructor(msg) {
		super();
		this.code = 100;
		this.msg = msg || '系统错误';
	}
}

/**
 * 认证授权错误
 */
class AuthFailed extends HttpException {
	constructor(msg) {
		super();
		this.code = 300;
		this.msg = msg || '认证授权失败';
	}
}

/**
 * 参数错误类
 */
class ParameterException extends HttpException {
	constructor(msg) {
		super();
		this.code = 400;
		this.msg = msg || '参数错误';
	}
}

/**
 * 内部错误类
 */
class InternalException extends HttpException {
	constructor(msg) {
		super();
		this.code = 500;
		this.msg = msg || '内部错误';
	}
}

/**
 * 并发错误类
 */
class ConcurrencyException extends HttpException {
	constructor(msg) {
		super();
		this.code = 600;
		this.msg = msg || '并发错误';
	}
}

module.exports = {
	HttpException,
	SystemException,
	AuthFailed,
	ParameterException,
	InternalException,
	ConcurrencyException
};

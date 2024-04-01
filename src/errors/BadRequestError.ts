import { CustomError } from "./CustomError";

export default class BadRequestError extends CustomError {
    private static readonly DEFAULT_STATUS_CODE = 400;
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };
    private readonly _errors: any[];

    constructor(
        params: {
            code?: number;
            message?: string;
            logging?: boolean;
            context?: { [key: string]: any };
            errors?: any[];
        } = {}
    ) {
        const {
            code = BadRequestError.DEFAULT_STATUS_CODE,
            message: customMessage = "Bad request",
            logging = false,
            context = {},
            errors = [],
        } = params;

        const message = errors.length > 0 ? errors[0].msg : customMessage;

        super(message);
        this._statusCode = code;
        this._logging = logging;
        this._context = context;
        this._errors = errors;

        // Ensure correct prototype chain
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return this._errors;
    }

    get statusCode() {
        return this._statusCode;
    }

    get logging() {
        return this._logging;
    }
}

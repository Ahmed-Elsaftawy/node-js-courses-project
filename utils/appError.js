class AppError extends Error {
    constructor() {
        super()
    }
    create(message, statusCode, statuseMessage) {
        this.message = message;
        this.statusCode = statusCode;
        this.statuseMessage = statuseMessage;
        return this;
    }
}

const AppErrorHandler = new AppError();
export { AppErrorHandler };
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message || 'Server Error'
    });
};
exports.errorHandler = errorHandler;

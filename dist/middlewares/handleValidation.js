"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator'); // Importação com require
const validate = (req, res, next) => {
    // Obtém os erros da validação
    const errors = validationResult(req);
    // Verifica se não há erros
    if (errors.isEmpty()) {
        return next();
    }
    // Se houver erros, extrai-os
    const extractedErrors = errors.array().map((err) => err.msg); // Use um tipo simples aqui
    // Retorna os erros com status 422
    res.status(422).json({ errors: extractedErrors });
};
exports.default = validate;

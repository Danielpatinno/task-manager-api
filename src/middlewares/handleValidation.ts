import { Request, Response, NextFunction } from 'express';
const { validationResult } = require('express-validator'); // Importação com require

const validate = (req: Request, res: Response, next: NextFunction): void => {
  // Obtém os erros da validação
  const errors = validationResult(req);

  // Verifica se não há erros
  if (errors.isEmpty()) {
    return next();
  }

  // Se houver erros, extrai-os
  const extractedErrors: string[] = errors.array().map((err: { msg: string }) => err.msg); // Use um tipo simples aqui

  // Retorna os erros com status 422
  res.status(422).json({ errors: extractedErrors });
};

export default validate;

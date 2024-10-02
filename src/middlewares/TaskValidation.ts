// import { body } from "express-validator"
const { body } = require("express-validator")
 
const taskCreateValidation = () => {
  return [
    body('title')
      .isString()
      .withMessage('Escreve um título.'),

    body('priority')
      .isString()
      .withMessage('Defina a prioridade da tarefa')
      .isIn(['BAIXA', 'MEDIA', 'ALTA']) // Supondo que `priority` deve ser um valor específico
      .withMessage('A prioridade deve ser baixa, média ou alta. '),

      body('dateConclusion')
      .optional() // Faz com que o campo seja opcional
      .isISO8601() // Verifica se é uma data válida no formato ISO 8601
      .withMessage('A data deve ser válida.')
      .custom((value: string) => {
        const currentDate = new Date();
        const conclusionDate = new Date(value);

        if (conclusionDate <= currentDate) {
          throw new Error('Defina uma data válida.');
        }
        return true;
      }),
  ];
};

export default taskCreateValidation;

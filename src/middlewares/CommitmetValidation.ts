const { body } = require("express-validator")
 
const CommitmentCreateValidation = () => {
  return [
    body('title')
      .isString()
      .withMessage('Escreve um título.'),

      body('dateConclusion')
      .optional() 
      .isISO8601() 
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

export default CommitmentCreateValidation;
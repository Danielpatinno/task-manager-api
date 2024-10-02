import { Request, Response } from 'express';
import Commitment from '../models/Commitment';

interface CommitmentBody {
  title: string;
  dateConclusion: string;
}

const createNewCommitment = async (req: Request<{}, {}, CommitmentBody>, res: Response) => {
  const { title, dateConclusion } = req.body;

  try {
    const newCommitment = await Commitment.create({
    title,
    dateConclusion,
    });

    // Verificação de criação bem-sucedida
    if (!newCommitment) {
    return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde.'] });
    }

    res.status(201).json(newCommitment);
  } catch (error) {
    console.error('Erro ao criar compromisso:', error);
    res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
  }
};

const getCommitments = async (req: Request, res: Response) => {
  try {
    // Busca todas as tarefas
    const commitments = await Commitment.find();

    // Verifica se foram encontradas tarefas
    if (!commitments) {
    return res.status(404).json({ errors: ['Nenhum compromisso encontrado.'] });
    }

    res.status(200).json({ 
      totalTasks:commitments.length,
      tasks:commitments
    }
    );
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
  }
};

const deleteCommitment = async(req: Request<{id: string}>, res: Response) => {
    const { id } = req.params
  
    try {
      const commitment = await Commitment.findByIdAndDelete(id);
  
      if(!commitment) {
        return res.status(404).json({ errors: ['Compromisso não encontrado.']})
      }
  
      res.status(200).json({ message: 'Compromisso excluido.'})
  
    } catch (error) {
      console.log("Erro ao deletar compromisso:", error)
      res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.']})
    }
}
 
export { createNewCommitment, getCommitments, deleteCommitment}
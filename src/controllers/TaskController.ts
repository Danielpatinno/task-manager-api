import { Request, Response } from 'express';
import Task from '../models/Task';

interface TaskBody {
  title: string;
  priority: string;
  status: string;
  dateConclusion: Date;
  activitys: string[];
}

const createNewTask = async (req: Request<{}, {}, TaskBody>, res: Response) => {
  const { title, priority, status = "Não iniciado", dateConclusion, activitys } = req.body;

  try {
    const newTask = await Task.create({
      title,
      priority,
      status,
      dateConclusion,
      activitys
    });

    // Verificação de criação bem-sucedida
    if (!newTask) {
      return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde.'] });
    }

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    // Busca todas as tarefas
    const tasks = await Task.find();

    // Verifica se foram encontradas tarefas
    if (!tasks) {
      return res.status(404).json({ errors: ['Nenhuma tarefa encontrada.'] });
    }

    res.status(200).json({ 
      totalTasks:tasks.length,
      tasks:tasks
    });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
  }
};

const deleteTask = async(req: Request<{id: string}>, res: Response) => {
  const { id } = req.params

  try {
    const task = await Task.findByIdAndDelete(id);

    if(!task) {
      return res.status(404).json({ errors: ['Tarefa não encontrada.']})
    }

    res.status(200).json({ message: 'Tarefa deletada com sucesso.'})

  } catch (error) {
    console.log("Erro ao deletar tarefa:", error)
    res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.']})
  }
}

const updateTask = async (req: Request<{ id: string }, {}, Partial<{ priority: string, dateConclusion: Date, status: string, activitys: string[], activityIndex: number, newActivity: string }>>, res: Response) => {
  const { id } = req.params;
  const { priority, dateConclusion, status, activityIndex, newActivity } = req.body;

  try {
    // Buscar a tarefa pelo ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ errors: ['Tarefa não encontrada.'] });
    }

    // Operações sobre o array de atividades
    if (task.activitys) {
      if (typeof activityIndex === 'number') {
        if (newActivity) {
          // Editar a atividade no índice especificado
          if (activityIndex >= 0 && activityIndex < task.activitys.length) {
            task.activitys[activityIndex] = newActivity; // Atualizar a atividade no índice
          } else {
            return res.status(400).json({ errors: ['Índice da atividade inválido.'] });
          }
        } else {
          // Remover a atividade no índice especificado
          if (activityIndex >= 0 && activityIndex < task.activitys.length) {
            task.activitys.splice(activityIndex, 1); // Remover a atividade
          } else {
            return res.status(400).json({ errors: ['Índice da atividade inválido para remoção.'] });
          }
        }
      } else if (newActivity) {
        // Adicionar nova atividade ao final do array
        task.activitys.push(newActivity);
      }
    }

    // Atualizar outras propriedades se existirem
    if (priority) task.priority = priority;
    if (dateConclusion) task.dateConclusion = dateConclusion;
    if (status) task.status = status;

    // Salvar a tarefa atualizada no banco de dados
    const updatedTask = await task.save();

    // Verifique se o array foi atualizado corretamente
    if (!updatedTask) {
      return res.status(500).json({ errors: ['Falha ao atualizar a tarefa.'] });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
  }
};



// const updateTask = async (req: Request<{ id: string }, {}, Partial<{ priority: string, dateConclusion: string, status: string, activitys: string[] }>>, res: Response) => {
//   const { id } = req.params;
//   const { priority, dateConclusion, status, activitys } = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       {
//         ...(dateConclusion && { dateConclusion }),
//         ...(priority && {priority}),
//         ...(status && { status }),
//         ...(activitys && { activitys }) 
//       },
//       { new: true, runValidators: true } 
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ errors: ['Tarefa não encontrada.'] });
//     }

//     res.status(200).json(updatedTask);
//   } catch (error) {
//     console.error('Erro ao atualizar tarefa:', error);
//     res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
//   }
// };

export { createNewTask, getTasks, deleteTask, updateTask };
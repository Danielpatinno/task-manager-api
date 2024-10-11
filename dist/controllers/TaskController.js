"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getTasks = exports.createNewTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, priority, status = "Não iniciado", dateConclusion, activitys } = req.body;
    try {
        const newTask = yield Task_1.default.create({
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
    }
    catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.createNewTask = createNewTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todas as tarefas
        const tasks = yield Task_1.default.find();
        // Verifica se foram encontradas tarefas
        if (!tasks) {
            return res.status(404).json({ errors: ['Nenhuma tarefa encontrada.'] });
        }
        res.status(200).json({
            totalTasks: tasks.length,
            tasks: tasks
        });
    }
    catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.getTasks = getTasks;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.default.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ errors: ['Tarefa não encontrada.'] });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
    }
    catch (error) {
        console.log("Erro ao deletar tarefa:", error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { priority, dateConclusion, status, activityIndex, newActivity } = req.body;
    try {
        // Buscar a tarefa pelo ID
        const task = yield Task_1.default.findById(id);
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
                    }
                    else {
                        return res.status(400).json({ errors: ['Índice da atividade inválido.'] });
                    }
                }
                else {
                    // Remover a atividade no índice especificado
                    if (activityIndex >= 0 && activityIndex < task.activitys.length) {
                        task.activitys.splice(activityIndex, 1); // Remover a atividade
                    }
                    else {
                        return res.status(400).json({ errors: ['Índice da atividade inválido para remoção.'] });
                    }
                }
            }
            else if (newActivity) {
                // Adicionar nova atividade ao final do array
                task.activitys.push(newActivity);
            }
        }
        // Atualizar outras propriedades se existirem
        if (priority)
            task.priority = priority;
        if (dateConclusion)
            task.dateConclusion = dateConclusion;
        if (status)
            task.status = status;
        // Salvar a tarefa atualizada no banco de dados
        const updatedTask = yield task.save();
        // Verifique se o array foi atualizado corretamente
        if (!updatedTask) {
            return res.status(500).json({ errors: ['Falha ao atualizar a tarefa.'] });
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.updateTask = updateTask;

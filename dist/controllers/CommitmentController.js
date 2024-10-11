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
exports.deleteCommitment = exports.getCommitments = exports.createNewCommitment = void 0;
const Commitment_1 = __importDefault(require("../models/Commitment"));
const createNewCommitment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, dateConclusion } = req.body;
    try {
        const newCommitment = yield Commitment_1.default.create({
            title,
            dateConclusion,
        });
        // Verificação de criação bem-sucedida
        if (!newCommitment) {
            return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde.'] });
        }
        res.status(201).json(newCommitment);
    }
    catch (error) {
        console.error('Erro ao criar compromisso:', error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.createNewCommitment = createNewCommitment;
const getCommitments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todas as tarefas
        const commitments = yield Commitment_1.default.find();
        // Verifica se foram encontradas tarefas
        if (!commitments) {
            return res.status(404).json({ errors: ['Nenhum compromisso encontrado.'] });
        }
        res.status(200).json({
            totalTasks: commitments.length,
            tasks: commitments
        });
    }
    catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.getCommitments = getCommitments;
const deleteCommitment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const commitment = yield Commitment_1.default.findByIdAndDelete(id);
        if (!commitment) {
            return res.status(404).json({ errors: ['Compromisso não encontrado.'] });
        }
        res.status(200).json({ message: 'Compromisso excluido.' });
    }
    catch (error) {
        console.log("Erro ao deletar compromisso:", error);
        res.status(500).json({ errors: ['Houve um erro interno, por favor tente mais tarde.'] });
    }
});
exports.deleteCommitment = deleteCommitment;

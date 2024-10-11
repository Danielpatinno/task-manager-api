"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// config JSON and form data response
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// config cors
app.use((0, cors_1.default)({
    credentials: true, // 'credentials' em vez de 'Credential'
    origin: 'http://localhost:5173' // Verifique se essa origem está correta
}));
// rotas
app.use(router_1.default);
(0, db_1.default)();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

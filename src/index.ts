import express from "express";
import cors from "cors";
import router from './routes/router'; 
import conn from "./config/db";

const app = express();
const port = process.env.PORT || 3000;

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// config cors
app.use(cors({
  credentials: true, // 'credentials' em vez de 'Credential'
  origin: 'http://localhost:5173' // Verifique se essa origem está correta
}));

// rotas
app.use(router);

conn()

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

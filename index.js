import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

const users = [];

app.get("/", (req, res) => {
  return res.json("hello world");
});

app.get("/users", (req, res) => {
  return res.json(users);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: Math.random().toString(36),
    name,
    email,
  };

  users.push(newUser);
  return res.json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return res.status(404).json({ error });
  }

  users.splice(index, 1);
  return res.status(204).json();
});

// Rota para lidar com as solicitações de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Verifica se o usuário existe no array de usuários
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Se o usuário existir e as credenciais estiverem corretas, retorna sucesso
  return res.json({ message: "Login successful", user });
});

app.listen(port, () => console.log(`listening on ${port}`));

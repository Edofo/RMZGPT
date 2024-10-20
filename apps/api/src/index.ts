import { createApp } from "./infrastructure/http/ExpressApp";

const app = createApp();

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

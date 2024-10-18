import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello from RMZGPT!");
});

app.listen(8080, () => {
	console.log("Server is running on http://localhost:3000");
});

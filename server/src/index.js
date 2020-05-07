const express = require("express");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multiPartMiddleware = multipart({ uploadDir: "./uploads" });
app.post("/upload", multiPartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.get("/downloadExcel", (req, res) => {
  res.download("./uploads/report.xlsx");
});
app.get("/downloadPDF", (req, res) => {
  res.download("./uploads/report.pdf");
});
app.use((err, req, res, next) => res.json({ error: err.message }));
app.listen(8000, () => {
  console.log("Servidor Iniciado");
});

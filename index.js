import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const filePath = fileURLToPath(new URL("./index.html", import.meta.url));

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3030;
let data = "Initial data";

app.use(bodyParser.json());
let waitingClients = [];
router.get("/", (req, res) => {
  res.sendFile(filePath);
});

router.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClients.push(res);
  }
});

router.get("/updateData", (req, res) => {
  data = req.query.lastData;
  while (waitingClients.length > 0) {
    const clinet = waitingClients.pop();
    clinet.json({
      data,
    });
  }
  res.send({ success: "data updated succfuly" });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

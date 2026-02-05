import express from "express";
import cors from "cors";
import { biomarkers } from "./db";
import patientRouter from "./routes/patients";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patients", patientRouter);

setInterval(() => {
  const count = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * biomarkers.length);
    const biomarker = biomarkers[randomIndex];

    const change = (Math.random() - 0.5) * 5;
    biomarker.value = parseFloat((biomarker.value + change).toFixed(2));

    if (biomarker.value > biomarker.referenceRange.max)
      biomarker.status = "high";
    else if (biomarker.value < biomarker.referenceRange.min)
      biomarker.status = "low";
    else biomarker.status = "normal";
  }
}, 3000);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});

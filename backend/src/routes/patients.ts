import { Router } from "express";
import { patients, biomarkers } from "../db";
import type { Biomarker } from "../../../shared/types";

const router = Router();

router.get("/", (_, res) => {
  res.json(patients);
});

router.get("/:id/biomarkers", (req, res) => {
  const { id } = req.params;
  const { category } = req.query as { category?: Biomarker["category"] };

  let data = biomarkers.filter((biomarker) => biomarker.patientId === id);
  if (category) {
    data = data.filter((biomarker) => biomarker.category === category);
  }
  res.json(data);
});

router.post("/:id/ai-insights", async (req, res) => {
  const { id } = req.params;
  const { biomarkers } = req.body as { biomarkers: Biomarker[] };

  try {
    const highRisks = biomarkers.filter(
      (biomarker) => biomarker.status !== "normal"
    );

    if (!highRisks.length) {
      return res.json({ insights: "No abnormal markers detected." });
    }

    const analysis = `Clinical Analysis for Patient ${id}: 
    Detected ${highRisks.length} abnormal markers. 
    Primary concern: ${highRisks.map((highRisk) => highRisk.name).join(", ")}. 
    Recommendation: Correlate ${
      highRisks[0].name
    } with recent lifestyle changes.`;

    setTimeout(() => {
      res.json({ insights: analysis });
    }, 1500);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate AI insights" });
  }
});

export default router;

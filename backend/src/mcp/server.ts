import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Health-Dashboard-AI",
  version: "1.0.0",
});

server.registerTool(
  "analyze-biomarkers",
  {
    description: "Identify concerning values and potential health risks",
    inputSchema: z.object({
      patientId: z.string(),
      biomarkers: z.array(
        z.object({
          name: z.string(),
          value: z.number(),
          status: z.enum(["normal", "high", "low"]),
          category: z.string(),
        })
      ),
    }),
    outputSchema: z.object({
      content: z.array(z.object({ type: z.string(), text: z.string() })),
    }),
    annotations: {
      title: "Analyze biomarkers",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  },
  async ({ patientId, biomarkers }) => {
    const concerns = biomarkers.filter(
      (biomarker) => biomarker.status !== "normal"
    );

    return {
      content: [
        {
          type: "text",
          text: `Analysis for Patient ${patientId}: Found ${
            concerns.length
          } concerning markers. ${concerns
            .map((concern) => `${concern.name} is ${concern.status}`)
            .join(", ")}`,
        },
      ],
    };
  }
);

server.registerTool(
  "suggest-monitoring",
  {
    title: "Suggest monitoring",
    description: "Recommend which biomarkers need closer attention",
    inputSchema: z.object({
      patientId: z.string(),
    }),
    outputSchema: z.object({
      content: z.array(z.object({ type: z.string(), text: z.string() })),
    }),
    annotations: {
      title: "Suggest monitoring",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  },
  async ({ patientId }) => {
    return {
      content: [
        {
          type: "text",
          text: `Priority for ${patientId}: Monthly glucose tracking and quarterly lipid panels.`,
        },
      ],
    };
  }
);

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch(console.error);

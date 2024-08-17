import { Hono } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z, ZodError } from "zod";

const app = new Hono();
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.get("/", (ctx) => {
  return ctx.text("Hello World");
});

app.post("/api/detect", async (ctx) => {
  try {
    const data = await ctx.req.json();

    const validator = z.object({
      text: z
        .string({ required_error: "Text is required" })
        .trim()
        .min(1, { message: "Text is required" }),
    });

    const { text } = await validator.parseAsync(data);

    const res = await model.generateContent(
      `You are a profanity detection model. You have to give the following text a score from 0 to 1 where 1 means that you are absolutely sure that the text is profane and 0 means that you are absolutely sure that the text is not profane. Only give the score as response and nothing else. The text is : ${text}`
    );

    const score = res.response.text();

    return ctx.json({ score });
  } catch (error) {
    if (error instanceof ZodError) {
      return ctx.json({ error: error.errors[0].message });
    } else {
      return ctx.json({ error: "Some error occured. Please try again later!" });
    }
  }
});

export default app;

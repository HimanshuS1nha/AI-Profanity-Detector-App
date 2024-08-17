import { Hono } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = new Hono();
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.get("/", (ctx) => {
  return ctx.text("Hello World");
});

app.post("/api/detect", async (ctx) => {
  const { prompt } = await ctx.req.json();

  const res = await model.generateContent(
    `You are a profanity detection model. You have to give the following text a score from 0 to 1 where 1 means that you are absolutely sure that the text is profane and 0 means that you are absolutely sure that the text is not profane. Only give the score as response and nothing else. The text is : ${prompt}`
  );

  const score = res.response.text();

  return ctx.json({ score });
});

export default app;

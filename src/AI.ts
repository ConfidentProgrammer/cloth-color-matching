import Groq from "groq-sdk";
const apiKey = import.meta.env.VITE_GROQ_API;
const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export async function getAiAnswer(query: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${query}\n`,
      },
    ],
    model: "llama3-groq-70b-8192-tool-use-preview",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 0.65,
    stream: false,
    stop: null,
  });

  return chatCompletion.choices[0].message.content;
}

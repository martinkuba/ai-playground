import 'dotenv/config';
import fs from 'fs';
import axios from 'axios';

export async function askGPTVisualClick(screenshotPath, userInstruction) {
  const imageBuffer = fs.readFileSync(screenshotPath);
  const base64Image = imageBuffer.toString('base64');

  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text:
`You are a visual web agent.
You will receive a screenshot of a webpage and a natural language instruction.

Your task is to identify the element to interact with **visually** and return the exact (x, y) screen coordinates (in pixels) where the mouse should click.
The screenshot is taken from a browser window that is 1280x720 pixels. Return click coordinates relative to that size.

Respond only in JSON format like this, without any extra text including markdown backticks:

If the instruction involves clicking, return:
{
  "action": "click",
  "target": { "x": 400, "y": 285 }
}

If the instruction involves typing, return:
{
  "action": "type",
  "target": { "x": 400, "y": 285 },
  "text": "hello world"
}

Do not include any other text.

Now perform this instruction:
"${userInstruction}"`
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/png;base64,${base64Image}`,
          }
        }
      ]
    }
  ];

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-4o",
      messages,
      max_tokens: 100,
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('response:', response.data.choices[0].message.content);

  try {
    const text = response.data.choices[0].message.content;

    const cleaned = text
      .replace(/```(?:json)?/g, '')  // Remove ``` or ```json
      .replace(/```/g, '')           // Just in case there's a lone ```
      .trim();  

    const coords = JSON.parse(cleaned);
    return coords; // { x: number, y: number }
  } catch (e) {
    throw new Error("Could not parse GPT response: " + e.message);
  }
}

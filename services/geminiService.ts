import { GoogleGenAI, Chat } from "@google/genai";
import { ContentState } from "../types";

export const createChatSession = (content: ContentState): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an intelligent portfolio assistant for ${content.personalInfo.name}.
    Your goal is to answer questions about ${content.personalInfo.name}'s work, skills, and experience based strictly on the data provided below.
    
    Tone: Professional, friendly, and concise.
    
    Portfolio Data:
    Name: ${content.personalInfo.name}
    Role: ${content.personalInfo.role}
    Tagline: ${content.personalInfo.tagline}
    About: ${content.personalInfo.about}
    
    Skills: ${content.skills.map(s => `${s.name} (${s.level}%)`).join(', ')}
    
    Experience:
    ${content.resume.map(r => `- ${r.role} at ${r.company} (${r.year}): ${r.description}`).join('\n')}
    
    Projects:
    ${content.projects.map(p => `- ${p.title} (${p.category}, ${p.year}): ${p.description}. Challenge: ${p.challenge || 'N/A'}. Solution: ${p.solution || 'N/A'}`).join('\n')}
    
    Contact: ${content.personalInfo.email}
    
    Instructions:
    - If asked about something not in this data, politely say you don't have that information but can help with questions about their professional work.
    - Keep answers relatively short (under 100 words) unless asked for details.
    - Use the project details to answer specific questions about what they have built.
  `;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction.trim(),
    },
  });
};

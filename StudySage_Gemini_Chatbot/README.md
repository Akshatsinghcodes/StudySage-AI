# StudySage AI Lab 🤖📚

StudySage AI Lab is an AI-powered educational web application designed to provide multiple study and productivity tools in one place.

The project uses the **Google Gemini API** and provides 10 AI-powered tasks including resume generation, notes generation, quizzes, flashcards, study planning, doubt solving, presentation generation, mind maps, Google Sheets analysis, and notes from photos.

---

## 🚀 Features

StudySage AI Lab currently supports the following 10 AI tasks:

### 1. AI Resume Builder
Generate a professional resume based on:
- Personal information
- Education
- Skills
- Experience
- Projects
- Job role

---

### 2. AI Notes Generator
Generate structured study notes from a topic.

The AI can generate:
- Definitions
- Important concepts
- Key points
- Examples
- Summary

---

### 3. AI Presentation Generator
Generate presentation content from a topic.

The generated presentation can include:
- Slide titles
- Slide content
- Key points
- Examples
- Conclusion

---

### 4. AI Mind Map Generator
Generate a structured mind map for a topic.

Useful for:
- Revision
- Understanding relationships between concepts
- Exam preparation
- Topic summarization

---

### 5. Google Sheets + AI
Connect a Google Apps Script web application and analyze spreadsheet data using Gemini AI.

Possible use cases:
- Data analysis
- Summary generation
- Identifying patterns
- Generating insights

---

### 6. AI Quiz / MCQ Generator
Generate multiple-choice questions from a topic.

The generated quiz can include:
- Questions
- Multiple options
- Correct answers
- Explanations

---

### 7. AI Doubt-Solving Chatbot
Ask questions and get AI-generated explanations.

Useful for:
- Programming doubts
- Academic questions
- Concept explanations
- General study assistance

---

### 8. AI Flashcard Generator
Generate flashcards for quick revision.

Each flashcard contains:
- Question / term
- Answer / explanation

---

### 9. AI Study Planner
Generate a personalized study plan based on:
- Subject
- Available study time
- Exam date
- Topics
- Daily schedule

---

### 10. AI Notes from Photos
Upload a photo of handwritten or printed notes.

The AI analyzes the image and generates:
- Text summary
- Important points
- Structured notes
- Key concepts

---

# 🧠 Gemini AI Model Support

StudySage allows the user to select the Gemini model from a dropdown.

Available models include:

- `gemini-3.8-flash`
- `gemini-3.7-flash`
- `gemini-3.6-flash`
- `gemini-3.5-flash`
- `gemini-3.5-flash-lite`
- `gemini-3.1-flash-lite`
- `gemini-2.5-flash`

The application does **not** hard-code a shared API key.

Each user can enter their own Gemini API key.

---

## 🔄 Automatic Model Fallback

StudySage includes an **Automatic Model Fallback** option.

If the selected Gemini model fails and automatic fallback is enabled, the application attempts other configured Gemini models.

For example:

```text
Gemini 3.8 Flash
       ↓
Gemini 3.7 Flash
       ↓
Gemini 3.6 Flash
       ↓
Gemini 3.5 Flash
       ↓
Gemini 3.5 Flash-Lite
       ↓
Gemini 3.1 Flash-Lite
       ↓
Gemini 2.5 Flash
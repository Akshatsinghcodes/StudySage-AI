/* =========================================================
   STUDYSAGE AI LAB
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GEMINI MODELS
========================================================= */

const GEMINI_MODELS = [

    {
        id: "gemini-3.8-flash",
        name: "Gemini 3.8 Flash"
    },

    {
        id: "gemini-3.7-flash",
        name: "Gemini 3.7 Flash"
    },

    {
        id: "gemini-3.6-flash",
        name: "Gemini 3.6 Flash"
    },

    {
        id: "gemini-3.5-flash",
        name: "Gemini 3.5 Flash"
    },

    {
        id: "gemini-3.5-flash-lite",
        name: "Gemini 3.5 Flash-Lite"
    },

    {
        id: "gemini-3.1-flash-lite",
        name: "Gemini 3.1 Flash-Lite"
    },

    {
        id: "gemini-2.5-flash",
        name: "Gemini 2.5 Flash"
    }

];


/*
    Default model
*/

let selectedModel =
    localStorage.getItem("studysage_model")
    || "gemini-3.8-flash";


/*
    API key is stored only for this browser session.
*/

let geminiApiKey =
    sessionStorage.getItem("studysage_gemini_key")
    || "";


/*
    Gemini API endpoint
*/

const GEMINI_API_BASE =
    "https://generativelanguage.googleapis.com/v1beta/models";


/* =========================================================
   TASKS
========================================================= */

const tasks = [

    {
        id: 1,
        icon: "📄",
        title: "AI Resume Builder",
        description:
            "Create a professional resume using your education, skills and experience."
    },

    {
        id: 2,
        icon: "📝",
        title: "AI Notes Generator",
        description:
            "Convert any topic into structured and easy-to-study notes."
    },

    {
        id: 3,
        icon: "📊",
        title: "AI Presentation Generator",
        description:
            "Generate presentation slides automatically from a topic."
    },

    {
        id: 4,
        icon: "🧠",
        title: "AI Mind Map Generator",
        description:
            "Create structured mind-map content for any subject."
    },

    {
        id: 5,
        icon: "📑",
        title: "Google Sheets + AI",
        description:
            "Analyze Google Sheets data and generate useful insights."
    },

    {
        id: 6,
        icon: "❓",
        title: "AI Quiz / MCQ Generator",
        description:
            "Generate multiple-choice questions for exam preparation."
    },

    {
        id: 7,
        icon: "💬",
        title: "AI Doubt-Solving Chatbot",
        description:
            "Ask questions and receive AI-powered explanations."
    },

    {
        id: 8,
        icon: "🎴",
        title: "AI Flashcard Generator",
        description:
            "Generate question-and-answer flashcards for revision."
    },

    {
        id: 9,
        icon: "📅",
        title: "AI Study Planner",
        description:
            "Create a personalized study schedule."
    },

    {
        id: 10,
        icon: "📷",
        title: "AI Notes from Photos",
        description:
            "Upload a photo of handwritten or printed notes and summarize it."
    }

];


/* =========================================================
   DOM
========================================================= */

const content =
    document.getElementById("content");

const pageTitle =
    document.getElementById("pageTitle");

const taskNavigation =
    document.getElementById("taskNavigation");

const apiKeyInput =
    document.getElementById("apiKeyInput");

const saveKeyBtn =
    document.getElementById("saveKeyBtn");

const clearKeyBtn =
    document.getElementById("clearKeyBtn");

const keyStatus =
    document.getElementById("keyStatus");

const modelSelect =
    document.getElementById("modelSelect");

const modelStatus =
    document.getElementById("modelStatus");

const testModelBtn =
    document.getElementById("testModelBtn");

const fallbackToggle =
    document.getElementById("fallbackToggle");

const homeBtn =
    document.getElementById("homeBtn");


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupModel();

    setupAPIKey();

    createTaskNavigation();

    showHome();

});


/* =========================================================
   MODEL SETUP
========================================================= */

function setupModel() {

    modelSelect.value = selectedModel;

    updateModelStatus();


    modelSelect.addEventListener("change", () => {

        selectedModel =
            modelSelect.value;

        localStorage.setItem(
            "studysage_model",
            selectedModel
        );

        updateModelStatus();

        showToast(
            "Gemini model changed."
        );

    });


    testModelBtn.addEventListener(
        "click",
        testSelectedModel
    );
}


/* =========================================================
   MODEL STATUS
========================================================= */

function updateModelStatus() {

    const model =
        getModelName(selectedModel);

    modelStatus.innerHTML =
        `Selected model: <strong>${model}</strong>`;
}


function getModelName(modelId) {

    const model =
        GEMINI_MODELS.find(
            m => m.id === modelId
        );

    return model
        ? model.name
        : modelId;
}


/* =========================================================
   API KEY
========================================================= */

function setupAPIKey() {

    if (geminiApiKey) {

        apiKeyInput.value =
            geminiApiKey;

        keyStatus.textContent =
            "API key configured for this session.";

    }


    saveKeyBtn.addEventListener(
        "click",
        () => {

            const key =
                apiKeyInput.value.trim();


            if (!key) {

                showToast(
                    "Please enter your Gemini API key.",
                    true
                );

                return;
            }


            geminiApiKey = key;


            sessionStorage.setItem(
                "studysage_gemini_key",
                key
            );


            keyStatus.textContent =
                "API key configured for this session.";


            showToast(
                "Gemini API key saved."
            );

        }
    );


    clearKeyBtn.addEventListener(
        "click",
        () => {

            geminiApiKey = "";

            sessionStorage.removeItem(
                "studysage_gemini_key"
            );

            apiKeyInput.value = "";

            keyStatus.textContent =
                "No API key configured.";

            showToast(
                "API key cleared."
            );

        }
    );
}


/* =========================================================
   TASK NAVIGATION
========================================================= */

function createTaskNavigation() {

    taskNavigation.innerHTML = "";


    tasks.forEach(task => {

        const button =
            document.createElement("button");


        button.className =
            "task-nav-item";


        button.innerHTML = `
            <span class="task-number">
                ${String(task.id).padStart(2, "0")}
            </span>
            ${task.title}
        `;


        button.addEventListener(
            "click",
            () => openTask(task.id)
        );


        taskNavigation.appendChild(
            button
        );

    });

}


/* =========================================================
   HOME
========================================================= */

function showHome() {

    pageTitle.textContent =
        "StudySage AI Lab";


    content.innerHTML = `

        <div class="hero">

            <h2>
                Learn smarter with AI.
            </h2>

            <p>
                StudySage brings together 10 AI-powered
                learning tools in one simple workspace.
                Choose any task below to get started.
            </p>

        </div>


        <div class="task-grid">

            ${tasks.map(task => `

                <div
                    class="task-card"
                    onclick="openTask(${task.id})"
                >

                    <div class="task-icon">
                        ${task.icon}
                    </div>

                    <h3>
                        ${task.title}
                    </h3>

                    <p>
                        ${task.description}
                    </p>

                    <div class="task-card-footer">
                        Open Task →
                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


homeBtn.addEventListener(
    "click",
    showHome
);


/* =========================================================
   OPEN TASK
========================================================= */

function openTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );


    if (!task) return;


    pageTitle.textContent =
        task.title;


    content.innerHTML =
        createWorkspace(id, task);


    attachTaskEvents(id);

}


/* =========================================================
   WORKSPACE
========================================================= */

function createWorkspace(id, task) {

    return `

        <div class="workspace-header">

            <button
                class="back-btn"
                onclick="showHome()"
            >
                ← Back
            </button>

            <div>

                <h2>
                    ${task.icon}
                    ${task.title}
                </h2>

            </div>

        </div>


        <div class="workspace">

            <div class="panel">

                ${createForm(id)}

            </div>


            <div class="panel">

                <h3>
                    AI Result
                </h3>

                <div
                    id="result"
                    class="result"
                >

                    <div class="placeholder">
                        Your AI-generated result
                        will appear here.
                    </div>

                </div>

            </div>

        </div>

    `;
}


/* =========================================================
   TASK FORMS
========================================================= */

function createForm(id) {


    if (id === 1) {

        return `

            <h3>Resume Information</h3>

            ${input("name", "Full Name", "Enter your name")}

            ${input("contact", "Contact", "Email / phone / LinkedIn")}

            ${textarea("education", "Education", "Enter your education")}

            ${textarea("skills", "Skills", "Java, Selenium, Playwright...")}

            ${textarea("experience", "Experience", "Enter your work experience")}

            ${textarea("objective", "Career Objective", "Optional objective")}

            ${generateButton("Generate Resume")}

        `;
    }


    if (id === 2) {

        return `

            <h3>Notes Generator</h3>

            ${input("topic", "Topic", "Enter topic")}

            ${textarea("notesLevel", "Learning Level", "School / College / Interview")}

            ${textarea("notesExtra", "Additional Instructions", "Optional")}

            ${generateButton("Generate Notes")}

        `;
    }


    if (id === 3) {

        return `

            <h3>Presentation Generator</h3>

            ${input("presentationTopic", "Topic", "Enter presentation topic")}

            ${input("slideCount", "Number of Slides", "Example: 8")}

            ${textarea("presentationAudience", "Audience", "Students / Teachers / Business")}

            ${generateButton("Generate Presentation")}

        `;
    }


    if (id === 4) {

        return `

            <h3>Mind Map Generator</h3>

            ${input("mindTopic", "Main Topic", "Example: Artificial Intelligence")}

            ${textarea("mindDetails", "Additional Details", "Optional")}

            ${generateButton("Generate Mind Map")}

        `;
    }


    if (id === 5) {

        return `

            <h3>Google Sheets + AI</h3>

            ${input("sheetUrl", "Google Apps Script URL", "Paste deployed Apps Script Web App URL")}

            ${textarea("sheetQuestion", "Question", "What should AI analyze?")}

            ${generateButton("Analyze Sheet")}

        `;
    }


    if (id === 6) {

        return `

            <h3>Quiz Generator</h3>

            ${input("quizTopic", "Topic", "Example: Java Selenium")}

            ${input("quizCount", "Number of Questions", "Example: 10")}

            ${input("quizLevel", "Difficulty", "Easy / Medium / Hard")}

            ${generateButton("Generate Quiz")}

        `;
    }


    if (id === 7) {

        return `

            <h3>Ask Your Doubt</h3>

            <div
                id="chatBox"
                class="chat-box"
            >

                <div class="message ai-message">
                    Hello! Ask me any study-related question.
                </div>

            </div>


            <div class="chat-row">

                <input
                    id="chatInput"
                    type="text"
                    placeholder="Ask your question..."
                >

                <button id="chatSend">
                    Send
                </button>

            </div>

        `;
    }


    if (id === 8) {

        return `

            <h3>Flashcard Generator</h3>

            ${input("flashTopic", "Topic", "Enter topic")}

            ${input("flashCount", "Number of Flashcards", "Example: 10")}

            ${textarea("flashLevel", "Difficulty", "Beginner / Intermediate / Advanced")}

            ${generateButton("Generate Flashcards")}

        `;
    }


    if (id === 9) {

        return `

            <h3>Study Planner</h3>

            ${input("planSubject", "Subject", "Example: Java Automation")}

            ${input("planDays", "Number of Days", "Example: 14")}

            ${input("planHours", "Hours Per Day", "Example: 3")}

            ${textarea("planTopics", "Topics", "Enter topics you need to study")}

            ${generateButton("Create Study Plan")}

        `;
    }


    if (id === 10) {

        return `

            <h3>Notes from Photo</h3>

            <input
                id="photoInput"
                class="file-input"
                type="file"
                accept="image/*"
            >


            ${textarea("photoInstruction", "Instruction", "Summarize these notes and highlight important points.")}

            ${generateButton("Analyze Photo")}

        `;
    }


    return "";
}


/* =========================================================
   FORM HELPERS
========================================================= */

function input(id, label, placeholder) {

    return `

        <div class="form-group">

            <label>
                ${label}
            </label>

            <input
                id="${id}"
                class="form-control"
                type="text"
                placeholder="${placeholder}"
            >

        </div>

    `;
}


function textarea(id, label, placeholder) {

    return `

        <div class="form-group">

            <label>
                ${label}
            </label>

            <textarea
                id="${id}"
                class="form-control"
                placeholder="${placeholder}"
            ></textarea>

        </div>

    `;
}


function generateButton(text) {

    return `

        <button
            id="generateBtn"
            class="generate-btn"
        >
            ${text}
        </button>

    `;
}


/* =========================================================
   ATTACH TASK EVENTS
========================================================= */

function attachTaskEvents(id) {


    if (id === 7) {

        const send =
            document.getElementById("chatSend");

        const inputBox =
            document.getElementById("chatInput");


        send.addEventListener(
            "click",
            sendChatMessage
        );


        inputBox.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    sendChatMessage();

                }

            }
        );


        return;
    }


    const button =
        document.getElementById("generateBtn");


    if (!button) return;


    button.addEventListener(
        "click",
        () => runTask(id)
    );

}


/* =========================================================
   RUN TASK
========================================================= */

async function runTask(id) {

    if (!geminiApiKey) {

        showToast(
            "Please enter your Gemini API key first.",
            true
        );

        return;
    }


    const result =
        document.getElementById("result");


    result.innerHTML = loading();


    try {

        let response;


        if (id === 1) {

            response =
                await generateResume();

        }

        else if (id === 2) {

            response =
                await generateNotes();

        }

        else if (id === 3) {

            response =
                await generatePresentation();

        }

        else if (id === 4) {

            response =
                await generateMindMap();

        }

        else if (id === 5) {

            response =
                await generateSheetAnalysis();

        }

        else if (id === 6) {

            response =
                await generateQuiz();

        }

        else if (id === 8) {

            response =
                await generateFlashcards();

        }

        else if (id === 9) {

            response =
                await generateStudyPlan();

        }

        else if (id === 10) {

            response =
                await generatePhotoNotes();

        }


        result.innerHTML =
            `<div class="result-box">${formatText(response)}</div>`;

    }

    catch (error) {

        result.innerHTML =
            `<div class="result-box">
                <strong>AI Error</strong><br><br>
                ${escapeHtml(error.message)}
            </div>`;

    }

}


/* =========================================================
   GEMINI API
========================================================= */

/*
    This function supports:

    1. Selected model
    2. Automatic fallback
    3. Different Gemini models
*/


async function askGemini(
    prompt,
    additionalParts = []
) {

    if (!geminiApiKey) {

        throw new Error(
            "Gemini API key is missing."
        );

    }


    /*
        Create model list.

        Selected model goes first.
        Remaining models become fallback models.
    */

    let modelsToTry = [
        selectedModel
    ];


    if (fallbackToggle.checked) {

        const fallbackModels =
            GEMINI_MODELS
                .map(model => model.id)
                .filter(
                    id => id !== selectedModel
                );


        modelsToTry =
            modelsToTry.concat(
                fallbackModels
            );

    }


    let lastError = null;


    for (const model of modelsToTry) {

        try {

            updateModelStatus(
                `Trying: ${getModelName(model)}`
            );


            const url =
                `${GEMINI_API_BASE}/${model}:generateContent`;


            const body = {

                contents: [

                    {

                        role: "user",

                        parts: [

                            {
                                text: prompt
                            },

                            ...additionalParts

                        ]

                    }

                ]

            };


            const response =
                await fetch(
                    url,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "x-goog-api-key":
                                geminiApiKey

                        },

                        body:
                            JSON.stringify(body)

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                const errorMessage =
                    data?.error?.message
                    ||
                    `HTTP ${response.status}`;


                throw new Error(
                    errorMessage
                );

            }


            const text =
                data?.candidates?.[0]
                    ?.content
                    ?.parts
                    ?.map(
                        part => part.text || ""
                    )
                    .join("")
                    .trim();


            if (!text) {

                throw new Error(
                    "Gemini returned an empty response."
                );

            }


            /*
                Save the working model.
            */

            selectedModel = model;

            modelSelect.value =
                model;

            localStorage.setItem(
                "studysage_model",
                model
            );


            modelStatus.innerHTML =
                `Working model: <strong>${getModelName(model)}</strong>`;


            return text;

        }

        catch (error) {

            lastError = error;


            console.warn(
                `Model ${model} failed:`,
                error.message
            );


            /*
                If fallback is disabled,
                stop immediately.
            */

            if (!fallbackToggle.checked) {

                break;

            }

        }

    }


    throw new Error(
        "All selected/fallback Gemini models failed.\n\n" +
        (lastError?.message || "Unknown Gemini API error.")
    );
}


/* =========================================================
   TEST MODEL
========================================================= */

async function testSelectedModel() {

    if (!geminiApiKey) {

        showToast(
            "Enter your Gemini API key first.",
            true
        );

        return;
    }


    testModelBtn.disabled = true;

    testModelBtn.textContent =
        "Testing...";


    try {

        const response =
            await askGemini(
                "Reply with exactly: StudySage model test successful."
            );


        showToast(
            "Model is working successfully."
        );


        modelStatus.innerHTML =
            `✓ Working: <strong>${getModelName(selectedModel)}</strong>`;

        console.log(
            "Gemini test response:",
            response
        );

    }

    catch (error) {

        showToast(
            "Model test failed. Check the API key or fallback models.",
            true
        );


        modelStatus.innerHTML =
            `✗ Model failed: ${escapeHtml(error.message)}`;

    }

    finally {

        testModelBtn.disabled = false;

        testModelBtn.textContent =
            "Test Selected Model";

    }

}


/* =========================================================
   TASK 1
   RESUME
========================================================= */

async function generateResume() {

    const name =
        value("name");

    const contact =
        value("contact");

    const education =
        value("education");

    const skills =
        value("skills");

    const experience =
        value("experience");

    const objective =
        value("objective");


    const prompt = `

Create a professional ATS-friendly resume.

Name:
${name}

Contact:
${contact}

Education:
${education}

Skills:
${skills}

Experience:
${experience}

Career Objective:
${objective}

Rules:

- Use professional formatting.
- Use strong bullet points.
- Do not invent information.
- Keep it suitable for an MNC job application.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 2
   NOTES
========================================================= */

async function generateNotes() {

    const topic =
        value("topic");

    const level =
        value("notesLevel");

    const extra =
        value("notesExtra");


    const prompt = `

Create detailed study notes.

Topic:
${topic}

Learning Level:
${level}

Additional Instructions:
${extra}

Include:

1. Definition
2. Important concepts
3. Key points
4. Examples
5. Practical explanation
6. Quick revision section

Make the notes easy to understand.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 3
   PRESENTATION
========================================================= */

async function generatePresentation() {

    const topic =
        value("presentationTopic");

    const count =
        value("slideCount");

    const audience =
        value("presentationAudience");


    const prompt = `

Create a presentation about:

${topic}

Number of slides:
${count}

Audience:
${audience}

For every slide provide:

Slide title
3 to 5 bullet points
Speaker notes

Return clean structured content.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 4
   MIND MAP
========================================================= */

async function generateMindMap() {

    const topic =
        value("mindTopic");

    const details =
        value("mindDetails");


    const prompt = `

Create a detailed text-based mind map.

Main Topic:
${topic}

Additional information:
${details}

Use this structure:

MAIN TOPIC
|
|-- Main Branch
|   |-- Sub Branch
|   |-- Sub Branch
|
|-- Main Branch
|   |-- Sub Branch

Include important concepts only.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 5
   GOOGLE SHEETS
========================================================= */

async function generateSheetAnalysis() {

    const url =
        value("sheetUrl");

    const question =
        value("sheetQuestion");


    if (!url) {

        throw new Error(
            "Please enter your Google Apps Script Web App URL."
        );

    }


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Unable to read Google Sheets data."
        );

    }


    const data =
        await response.json();


    const prompt = `

Analyze the following Google Sheets data.

Data:
${JSON.stringify(data, null, 2)}

User question:
${question}

Provide:

- Important observations
- Trends
- Possible issues
- Useful recommendations

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 6
   QUIZ
========================================================= */

async function generateQuiz() {

    const topic =
        value("quizTopic");

    const count =
        value("quizCount");

    const level =
        value("quizLevel");


    const prompt = `

Create ${count} multiple choice questions.

Topic:
${topic}

Difficulty:
${level}

For each question provide:

Question
A
B
C
D
Correct answer
Explanation

Do not use markdown tables.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 8
   FLASHCARDS
========================================================= */

async function generateFlashcards() {

    const topic =
        value("flashTopic");

    const count =
        value("flashCount");

    const level =
        value("flashLevel");


    const prompt = `

Create ${count} study flashcards.

Topic:
${topic}

Difficulty:
${level}

Format:

CARD 1
QUESTION:
...
ANSWER:
...

CARD 2
QUESTION:
...
ANSWER:
...

Keep answers concise.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 9
   STUDY PLAN
========================================================= */

async function generateStudyPlan() {

    const subject =
        value("planSubject");

    const days =
        value("planDays");

    const hours =
        value("planHours");

    const topics =
        value("planTopics");


    const prompt = `

Create a study plan.

Subject:
${subject}

Number of days:
${days}

Hours per day:
${hours}

Topics:
${topics}

For each day provide:

Day
Topics
Study activities
Practice
Revision

Make the schedule realistic.

`;


    return await askGemini(prompt);
}


/* =========================================================
   TASK 10
   PHOTO NOTES
========================================================= */

async function generatePhotoNotes() {

    const file =
        document.getElementById(
            "photoInput"
        ).files[0];


    if (!file) {

        throw new Error(
            "Please select a photo first."
        );

    }


    const instruction =
        value("photoInstruction");


    const base64 =
        await fileToBase64(file);


    const mimeType =
        file.type;


    const parts = [

        {

            text: `

Analyze this study-notes image.

Instruction:
${instruction}

Provide:

1. Clean notes
2. Important concepts
3. Key points
4. Short summary
5. Exam-important points

Do not invent information that is not visible.

`

        },

        {

            inline_data: {

                mime_type:
                    mimeType,

                data:
                    base64.split(",")[1]

            }

        }

    ];


    return await askGemini(
        "Analyze the uploaded study image.",
        parts
    );
}


/* =========================================================
   CHATBOT
========================================================= */

let chatHistory = [];


async function sendChatMessage() {

    if (!geminiApiKey) {

        showToast(
            "Please enter your Gemini API key first.",
            true
        );

        return;
    }


    const input =
        document.getElementById(
            "chatInput"
        );


    const chatBox =
        document.getElementById(
            "chatBox"
        );


    const question =
        input.value.trim();


    if (!question) return;


    addChatMessage(
        question,
        "user"
    );


    input.value = "";


    try {

        const prompt = `

You are StudySage, a helpful educational assistant.

Previous conversation:
${chatHistory.join("\n")}

Student question:
${question}

Explain the answer clearly.

If useful, provide examples.

`;


        chatHistory.push(
            `Student: ${question}`
        );


        const answer =
            await askGemini(prompt);


        chatHistory.push(
            `StudySage: ${answer}`
        );


        addChatMessage(
            answer,
            "ai"
        );

    }

    catch (error) {

        addChatMessage(
            "Error: " + error.message,
            "ai"
        );

    }

}


function addChatMessage(
    message,
    type
) {

    const chatBox =
        document.getElementById(
            "chatBox"
        );


    const div =
        document.createElement("div");


    div.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";


    div.textContent =
        message;


    chatBox.appendChild(div);


    chatBox.scrollTop =
        chatBox.scrollHeight;
}


/* =========================================================
   HELPERS
========================================================= */

function value(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

}


function loading() {

    return `

        <div class="loading">

            <div class="spinner"></div>

            AI is generating your result...

        </div>

    `;

}


function formatText(text) {

    return escapeHtml(text)
        .replace(/\n/g, "<br>");

}


function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => resolve(reader.result);


            reader.onerror =
                reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    error = false
) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.className =
        error
            ? "toast show error"
            : "toast show";


    setTimeout(
        () => {

            toast.className =
                "toast";

        },
        3500
    );

}
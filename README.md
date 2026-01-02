🧠 Smart Form Assistant
Chrome Extension for Faster, Reliable Form Filling

Smart Form Assistant is a Chrome Extension that helps users fill online forms faster by detecting form fields on click and instantly surfacing saved personal data for quick insert or copy-paste.

Instead of fragile “auto-fill everything” hacks, this extension focuses on speed, usability, and compatibility, including graceful handling of restricted platforms like Google Forms.

🚀 Motivation

Filling the same information repeatedly—name, email, phone, education, links—is inefficient and frustrating.

Most form fillers:

Break on dynamic websites

Fail on Google Forms

Use unreliable DOM manipulation

Force automation where it is restricted

Smart Form Assistant takes a different approach:
It assists the user instead of fighting the platform.

✨ Features

🔍 Form Field Detection

Detects user interaction with input, textarea, and select elements

Extracts metadata such as label text, placeholder, name, and type

🧩 Rule-Based Field Classification

Identifies common fields like:

Email

Phone number

Name

Address

Education

Simple, deterministic logic (no AI guesswork)

📋 Instant Data Access

Displays relevant saved values in a popup

One-click Copy to Clipboard

Optional Insert into Field when allowed

🛡️ Google Forms Safe Mode

Automatically switches to copy-only assist mode

Does not attempt to bypass platform protections

Always reliable

👤 Multiple Profiles

Job / College / Personal profiles

Default profile selection

🧠 Design Philosophy

Assist, don’t override

Reliability over aggressive automation

Manual fallback is always available

Simple heuristics before complex AI

Clean architecture and readable code

🏗️ Architecture Overview
Chrome Extension
│
├── Content Script
│   └── Detects form field interactions
│
├── Popup UI
│   └── Displays matched saved data
│
├── Background Script
│   └── Manages state and messaging
│
└── chrome.storage.local
    └── Stores user profiles and preferences

⚙️ Tech Stack

JavaScript (Vanilla)

Chrome Extension API (Manifest v3)

HTML & CSS

chrome.storage.local

No backend

No external APIs

No frameworks

🧪 How It Works

User clicks on a form field

Content script captures the event

Field metadata is extracted

Field type is classified using rule-based logic

Popup shows relevant saved data

User chooses:

📋 Copy to clipboard

✏ Insert into field (if permitted)

🚫 Non-Goals (Intentional)

This extension does not:

Fully auto-fill entire forms

Bypass Google Forms or website protections

Use AI/LLMs to guess answers

Simulate aggressive typing

Require login or cloud services

These constraints are by design.

📦 Installation (Developer Mode)

Clone the repository:

git clone https://github.com/<your-username>/smart-form-assistant.git


Open Chrome and go to:

chrome://extensions


Enable Developer mode

Click Load unpacked

Select the project folder

Extension is ready to use

📌 Use Cases

Job applications

Internship forms

College admission forms

Repetitive internal forms

Any data-entry-heavy workflow

🛣️ Future Enhancements

Improved matching heuristics

User-defined custom fields

Keyboard shortcuts

Optional ML-based classification

Profile export/import

👨‍💻 Author

Moinuddin Shaikh
CSE Graduate | Python & Automation
Focused on building practical, real-world tools with long-term value.

📜 License

MIT License — free to use, modify, and distribute.

✅ Final Note

This project is intentionally practical, honest, and robust.
It prioritizes real usability over flashy but fragile automation—exactly how production tools should be built.

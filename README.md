**Smart Form Assistant**

A Chrome Extension that helps users fill online forms faster by detecting form fields on click and showing saved personal data for quick copy or insert.

This project focuses on reliability and usability, not fragile full-autofill hacks.

What This Does

Detects form fields when the user clicks on them

Identifies what the field expects (email, phone, name, etc.)

Displays matching saved data in a popup

Allows one-click copy or insert (when allowed)

Key Features

Form Field Detection (input, textarea, select)

Rule-Based Field Classification (no AI guessing)

Copy to Clipboard

Safe Google Forms Handling (Copy-Only Mode)

Multiple Profiles (Job / College / Personal)

No backend, no external APIs

Google Forms Handling

Google Forms restrict direct autofill.

This extension:

Detects Google Forms

Disables direct insertion

Enables copy-only assist mode

This behavior is intentional and ensures reliability.

How It Works

User clicks on a form field

Field metadata is extracted (label, placeholder, name)

Field type is classified using rule-based logic

Popup displays relevant saved values

User copies or inserts the value

Tech Stack

JavaScript (Vanilla)

Chrome Extension API (Manifest v3)

HTML & CSS

chrome.storage.local

Installation (Developer Mode)
git clone https://github.com/<your-username>/smart-form-assistant.git


Open Chrome and go to:

chrome://extensions


Enable Developer Mode

Click Load unpacked

Select the project folder

Non-Goals

This project does not:

Fully auto-fill entire forms

Bypass website restrictions

Use AI/LLMs

Require a backend or login

These are deliberate design decisions.

Use Cases

Job applications

Internship forms

College admission forms

Repetitive data entry tasks

Author

Moinuddin Shaikh
CSE Graduate | Automation & Backend Development

License

MIT License

Final Note

This project prioritizes practical usability, clean design, and real-world constraints—the way production tools should be built.

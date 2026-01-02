# Smart Form Assistant

A Chrome Extension that detects form input fields on click and shows matching saved data for fast copy or insert.

This project focuses on reliability and usability instead of fragile full autofill hacks.

---

## Overview

Smart Form Assistant helps reduce repetitive typing when filling online forms.

It detects form fields when the user interacts with them and provides relevant saved data instantly through a popup.

---

## Features

- Detects form fields (`input`, `textarea`, `select`) on click  
- Rule-based field classification (email, phone, name, etc.)  
- Popup with saved user data  
- One-click copy to clipboard  
- Optional insert into field when allowed  
- Safe handling for restricted sites like Google Forms  
- Multiple user profiles (Job / College / Personal)  
- No backend, no external APIs  

---

## Google Forms Handling

Google Forms restrict direct autofill.

This extension:
- Detects Google Forms automatically  
- Disables direct insertion  
- Enables copy-only assist mode  

This behavior is intentional to ensure reliability.

---

## How It Works

1. User clicks on a form field  
2. Field metadata is extracted (label, placeholder, name)  
3. Field type is classified using rule-based logic  
4. Popup displays relevant saved values  
5. User copies or inserts the value  

---

## Tech Stack

- JavaScript (Vanilla)  
- Chrome Extension API (Manifest v3)  
- HTML  
- CSS  
- `chrome.storage.local`  

---

## Installation (Developer Mode)

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/smart-form-assistant.git
bash```
2. Open Chrome and go to:

```bash
chrome://extensions

3. Enable Developer mode

4. Click Load unpacked

5. Select the project folder

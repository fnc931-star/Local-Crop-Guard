# Local Crop Guard 🌾 Leaf-Based Plant Pathology App

🌐 **Live Demo:** [https://local-crop-guard-web-58jf.bolt.host/](https://local-crop-guard-web-58jf.bolt.host/)

**Local Crop Guard** is a lightweight web tool built to help farmers, agriculture students, and home gardeners detect plant diseases early using leaf imagery. Instead of waiting days for lab consultations, users can snap a photo, upload it, and receive instant diagnostic feedback alongside actionable organic and chemical treatment plans.

Built as an AI application, this project leverages Google's Gemini multimodal capabilities via direct endpoint integration to analyze fine visual symptoms on leaves.

---

## 📸 Screenshots & Visual Preview

| Dashboard & Image Upload | AI Pathology Diagnosis | Symptom Tracker History |
| :---: | :---: | :---: |
| ![Dashboard Screenshot](https://raw.githubusercontent.com/fnc931-star/Local-Crop-Guard/main/docs/screenshots/dashboard.png) | ![Diagnosis Screenshot](https://raw.githubusercontent.com/fnc931-star/Local-Crop-Guard/main/docs/screenshots/diagnosis.png) | ![Tracker Screenshot](https://raw.githubusercontent.com/fnc931-star/Local-Crop-Guard/main/docs/screenshots/tracker.png) |

---

## ✨ Features & Functionality

* **Visual Disease Diagnosis:** Upload or drag-and-drop any affected crop leaf image to receive instantaneous disease identification.
* **Severity Breakdown:** Get a realistic risk indicator (Low, Medium, High) based on visual symptom patterns.
* **Dual Treatment Plans:** Clear remediation advice split into organic options (eco-friendly/budget) and chemical/fertilizer interventions.
* **Soil & Irrigation Guidance:** Specific watering and soil care adjustments tailored to help the plant recover.
* **Symptom Tracker:** Save past diagnosis results to keep track of plant health progress over time.

---

## 🤖 AI Feature & System Prompt

The application utilizes Google Gemini (`v1beta`) to evaluate leaf health and generate actionable agricultural advice. The model operates under the following structured instructions:

> **System Prompt / Instructions:**
> *"Analyze the provided image of the plant leaf carefully. Identify any visible plant diseases, fungal infections, pest damage, or nutrient deficiencies. Provide a structured diagnosis containing: 1. Disease Name & Severity Rating (Low/Medium/High), 2. Immediate Actionable Organic Remedies, 3. Chemical/Fertilizer Interventions, and 4. Specific Soil & Irrigation Adjustments to ensure crop recovery."*

---

## 🐍 Tech Stack & Architecture

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide Icons
* **AI Integration:** Google Gemini API (`v1beta` dynamic model resolution)
* **Build Tooling:** Vite, ESBuild

---

## 🚀 Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites
Make sure you have Node.js (v18.x or later) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fnc931-star/Local-Crop-Guard.git
   cd Local-Crop-Guard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Launch the application:**
   ```bash
   npm run dev
   ```

---

## 📍 How to Use

1. Click on the **Diagnosis** tab.
2. Drag and drop a clear photo of a crop leaf showing visible spots, discoloration, or lesions.
3. Click **Diagnose Disease**.
4. Review the disease diagnosis, severity rating, and suggested remediation steps.
5. Save the report to your **Symptom Tracker** for future reference.

---

## 🔮 Future Work & Roadmap

We are actively working on expanding **Local Crop Guard**'s capabilities:

* **Multi-Language Support (Urdu & Regional Languages):** Integrating localized audio and text translations to make remediation advice accessible to local farming communities.
* **Offline-First On-Device Inference:** Optimizing lightweight models to allow field diagnosis in remote areas without active internet connectivity.
* **Geo-Location & Weather Risk Alerts:** Combining real-time weather data and location-based humidity trends to predict potential disease outbreaks before symptoms appear.
* **PDF Diagnostic Report Export:** Enabling one-click downloadable PDF summaries to share with agricultural extension officers or vendors.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

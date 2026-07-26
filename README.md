# Local Crop Guard 🌾 Leaf-Based Plant Pathology App

**Local Crop Guard** is a lightweight web tool built to help farmers, agriculture students, and home gardeners detect plant diseases early using leaf imagery. Instead of waiting days for lab consultations, users can snap a photo, upload it, and receive instant diagnostic feedback alongside actionable organic and chemical treatment plans.

Built as an AI application, this project leverages Google's Gemini multimodal capabilities via direct endpoint integration to analyze fine visual symptoms on leaves.

---

## ✨ Features & Functionality

* **Visual Disease Diagnosis:** Upload or drag-and-drop any affected crop leaf image to receive instantaneous disease identification.
* **Severity Breakdown:** Get a realistic risk indicator (Low, Medium, High) based on visual symptom patterns.
* **Dual Treatment Plans:** Clear remediation advice split into organic options (eco-friendly/budget) and chemical/fertilizer interventions.
* **Soil & Irrigation Guidance:** Specific watering and soil care adjustments tailored to help the plant recover.
* **Symptom Tracker:** Save past diagnosis results to keep track of plant health progress over time.

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

**Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/local-crop-guard.git

   
## 🔮 Future Work & Roadmap

We are actively working on expanding **Local Crop Guard**'s capabilities:

* **Multi-Language Support (Urdu & Regional Languages):** Integrating localized audio and text translations to make remediation advice accessible to local farming communities.
* **Offline-First On-Device Inference:** Optimizing lightweight models to allow field diagnosis in remote areas without active internet connectivity.
* **Geo-Location & Weather Risk Alerts:** Combining real-time weather data and location-based humidity trends to predict potential disease outbreaks before symptoms appear.
* **PDF Diagnostic Report Export:** Enabling one-click downloadable PDF summaries to share with agricultural extension officers or vendors.

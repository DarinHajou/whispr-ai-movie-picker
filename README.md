# Whispr – AI-Powered Mood-Based Movie Picker

**Whispr** is a mood-based movie recommendation app powered by a conversational AI engine. It helps users find films that resonate with how they feel — not just what's trending. Built with **React**, **Tailwind CSS**, and the **OpenAI API**, Whispr is part of the **SolaceAI** project and guided by an emotionally intelligent companion named **Sol**.

---

## 🎯 Features

* 🎭 Mood-based movie suggestions
* 🧠 AI-powered emotional reasoning
* ✨ Step-by-step mood, intent, and energy selector
* 🗣 Refine suggestions through follow-up conversations
* 🎬 Dynamic poster fetching (via TMDb)
* 📊 Rate-limited retries for cost-consciousness
* 📱 Responsive design, mobile-first friendly

---

## 🔧 Tech Stack

* **Frontend:** React, Tailwind CSS
* **AI Integration:** OpenAI (GPT-4 API)
* **Media Fetching:** TMDb API
* **State Management:** React useState/useEffect

---

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/whispr-ai-movie-picker.git
cd whispr-ai-movie-picker
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**
   Create a `.env` file in the root:

```env
VITE_OPENAI_API_KEY=your_openai_key
VITE_TMDB_ACCESS_TOKEN=your_tmdb_token
```

4. **Start the dev server**

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── components/         # UI components (selectors, result cards)
├── lib/                # Utility logic (prompt builder, API calls)
├── App.jsx             # Main application logic and flow
├── index.html / main.jsx
```

---

## 🧠 About Sol

Whispr is powered by **Sol** — a warm, emotionally intelligent AI presence designed to guide you through emotional storytelling. Sol helps translate mood and mental energy into thoughtful film recommendations.

---

## 🧾 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## ✨ Credits

* Movie data & posters provided by [The Movie Database (TMDb)](https://www.themoviedb.org/)
* AI integration via [OpenAI](https://openai.com/)

> **Whispr** is part of the SolaceAI initiative — building emotionally intelligent interfaces for a more human digital experience.

---

## 📬 Contact

Questions, feedback, or ideas?
Feel free to reach out or fork the repo to contribute.

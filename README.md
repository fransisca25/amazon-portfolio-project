# 🛒 Amazon Clone with AI Chatbot

A simple e-commerce website inspired by Amazon, with an integrated AI-powered chatbot assistant. Built using the starter template from [supersimple.dev](https://supersimple.dev), this project simulates a basic shopping experience, with added user login and conversational support.

---

## 🚀 Features

- 🛍️ Product browsing and cart simulation
- 🔐 User login system using MongoDB
- 🤖 AI chatbot assistant powered by TinyLlama
- 🎨 Responsive UI with clean layout (HTML/CSS/JS)

---

## 🤖 Chatbot Use

The AI chatbot acting as a simple customer service assistant.

> ⚠️ This chatbot is powered by TinyLlama running locally! You will get better performance if you are using GPUs. Also, this is a tiny model so it works best with simple, clear input.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JS 
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas (for user login only)
- **AI Model**: TinyLlama (local)

---

## 📦 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/fransisca25/amazon-portfolio-project.git
   cd amazon-portfolio-project

2. **Install dependencies**

   ```bash
    npm install

3. **Set up environment variables**
    Create a .env file in the server folder.

   ```bash
    MONGODB_URI=your_mongodb_connection_string

4. **Start the app**

   ```bash
    npm start
    node app.js

5. **Sign up **
   Enter your name, email, and password for first login attempt! (First login only).

   ```bash
    curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d "{\"name\":\"ENTER YOUR NAME\",\"email\":\"ENTER YOUR EMAIL\",\"password\":\"ENTER YOUR PASSWORD\"}"

6. **Run chatbot on streamlit**

   ```bash
    streamlit run chatbot_app.py

---

## 📸 Preview Video

YouTube video: 
[amazon-portfolio-project preview video](https://youtu.be/cPB5YyRuAwA?si=Jc4OREn1LhfsUfIa)

---

## Future Work
- Improve search functionality (currently only works with the keyword "socks").
- Add JavaScript to orders.html and tracking.html to make them interactive.
- Possibly fine-tune the TinyLlama model for better responses and deploy it on the cloud instead of running it locally.

---

## Credits
Starter code: [supersimple.dev](https://github.com/SuperSimpleDev) <br>
AI model: [TinyLlama](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0)



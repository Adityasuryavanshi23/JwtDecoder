📘 JWT Decoder – React App

A simple JWT decoder web app built with React that lets you paste any JWT token and instantly decode its Header, Payload, and Signature. It also shows token expiration status (valid or expired) using the exp claim.

🔧 Features

✅ Decode JWT Header, Payload, and Signature

⏰ Auto-check if token is expired using exp claim

📋 Copy each section with one click

📅 Auto-save last token and decoding result using localStorage

🌗 Light/Dark mode support

🧠 Auto-decode toggle

📁 Folder Structure

src/
├── components/
│   ├── JwtInput.jsx
│   └── DisplayDecodedToken.jsx
├── App.jsx
├── main.jsx
└── index.css

🚀 Live Demo

If deployed, add link here https://your-jwt-decoder-app.netlify.app/

💻 Tech Stack

React.js

Tailwind CSS

jwt-decode (npm install jwt-decode)

react-hot-toast for notifications

🛠️ Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/jwt-decoder.git
cd jwt-decoder

2. Install Dependencies

npm install

3. Start Development Server

npm run dev

App will be running at:📍 http://localhost:5173

📦 Production Build

npm run build

To preview the production build:

npm run preview

🔑 Sample JWT Token

Paste this to test:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRpdHlhIiwiZXhwIjoxODAwMDAwMDAwfQ.6g_Rh2oT0iYFEC-zrHG3IvwKcO2QKmuU7LFqzZ2kPeI

📌 Notes

The app does not verify the signature. It only decodes the JWT.

Expiration status is shown based on exp value in seconds since epoch.

Make sure JWT is well-formed (3 parts separated by .).

🧑‍💻 Author

Your Name

Portfolio: your-portfolio-link.com

📜 License

MIT License © [Your Name]
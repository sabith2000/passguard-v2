# 🛡️ PassGuard v2 - A Modern Password Generator

<p align="center">
  <img src="https://img.shields.io/badge/version-v0.2.4-blueviolet" alt="Version">
  <img src="https://img.shields.io/badge/framework-React-blue" alt="Framework">
  <img src="https://img.shields.io/badge/styling-TailwindCSS-cyan" alt="Styling">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

A secure, intuitive, and feature-rich password generator built with a modern technology stack. This application is designed to provide a seamless user experience while offering extensive customization for generating strong, unique passwords.

---

### ✨ Features

- **Secure Generation:** Utilizes a robust engine that guarantees the inclusion of selected character types (uppercase, lowercase, numbers, symbols).
- **Extensive Customization:** Control password length (4-128), add custom characters, define prefixes/suffixes, and exclude ambiguous characters.
- **Instant Strength Meter:** A visual strength bar and text label provide immediate feedback on your password's complexity.
- **Modern Dashboard UI:** A clean, professional interface built with React, featuring a persistent sidebar for easy navigation.
- **Reusable Components:** The application is architected with modular React components for maintainability and scalability.
- **Future-Ready:** Built with placeholders and a clear structure to easily accommodate future features like user authentication and a secure password vault.

### 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Versioning:** [Git](https://git-scm.com/) & [GitHub](https://github.com)

---

### 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later is recommended)
- `npm` or `yarn` package manager

#### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sabith2000/passguard-v2.git](https://github.com/sabith2000/passguard-v2.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd passguard-v2
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will now be running on `http://localhost:5173`.

### 📂 Project Structure

The project follows a component-based architecture to ensure code is modular and easy to maintain.


passguard-v2/
├── public/
├── src/
│   ├── components/       # Reusable React components (Sidebar, Footer, etc.)
│   ├── lib/              # Core application logic (e.g., password.js)
│   ├── pages/            # Page-level components (Generator, Settings)
│   ├── App.jsx           # Main application shell
│   ├── index.css         # Global styles and Tailwind directives
│   └── main.jsx          # React application entry point
├── .gitignore
├── index.html
├── package.json
└── tailwind.config.js


---

### 🗺️ Roadmap

This project is under active development. The next major version (`v0.3.0`) will focus on transforming the tool into a full-fledged password manager.

- **[ ] User Authentication:** Secure sign-up and login (email/password, Google).
- **[ ] Secure Cloud Vault:** Integration with Firestore to save and sync passwords.
- **[ ] Zero-Knowledge Encryption:** Implementation of client-side encryption using a Master Password.
- **[ ] Password Vault UI:** A new dashboard to view, edit, and manage saved passwords.

### 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<p align="center">
  Built with ❤️ by LMS
</p>

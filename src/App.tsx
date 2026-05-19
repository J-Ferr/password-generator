import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [inlcudeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  const generatePassword = () => {
    let characters = "";

    if (includeUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (inlcudeLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (includeNumbers) {
      characters += "0123456789";
    }

    if (includeSymbols) {
      characters += "!@#$%^&*()_+";
    }

    let generatedPassword ="";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);

      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }

  return (
    <main className="app">
      <section className="card">
        <h1>Password Generator</h1>
        <p>Create a strong random password.</p>

        <div className="password-box">
          <span>{password || "Your password will appear here"}</span>
          <button>copy</button>
        </div>

        <label>
          password Length
          <input 
          type="number" 
          min="4" 
          max="32" 
          value={length}
          onChange={(e) => setLength(Number(e.target.value))} 
          />
        </label>

        <div className="options">
          <label>
            <input 
            type="checkbox" 
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Include Uppercase
          </label>

          <label>
            <input 
            type="checkbox" 
            checked={inlcudeLowercase}
            onChange={() => setIncludeLowercase(!inlcudeLowercase)} 
            />
            Inlcude Lowercase
          </label>

          <label>
            <input 
            type="checkbox" 
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)} 
            />
            Include Numbers
          </label>

          <label>
            <input 
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)} 
            />
            Include Symbols
          </label>
        </div>

        <button 
        className="generate-btn"
        onClick={generatePassword}
        >
          Generate Password
          
          </button>
      </section>
    </main>
  );
}

export default App;

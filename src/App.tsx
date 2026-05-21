import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+";

  let characters = "";
  let generatedPassword = "";

  const getRandomChar = (chars: string): string => {
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  };

  if (includeUppercase) {
    characters += uppercaseChars;
    generatedPassword += getRandomChar(uppercaseChars);
  }

  if (includeLowercase) {
    characters += lowercaseChars;
    generatedPassword += getRandomChar(lowercaseChars);
  }

  if (includeNumbers) {
    characters += numberChars;
    generatedPassword += getRandomChar(numberChars);
  }

  if (includeSymbols) {
    characters += symbolChars;
    generatedPassword += getRandomChar(symbolChars);
  }

  if (characters === "") {
    alert("Please select at least one option.");
    return;
  }

  for (let i = generatedPassword.length; i < length; i++) {
    generatedPassword += getRandomChar(characters);
  }

  const shuffledPassword = generatedPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  setPassword(shuffledPassword);
};

  const getPasswordStrength = () => {
    if (!password) {
      return "";
    }

    if (password.length < 8) {
      return "Weak";
    }

    if (password.length < 12) {
      return "Medium";
    }

    return "Strong";
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="app">
      <section className="card">
        <h1>Password Generator</h1>
        <p>Create a strong random password.</p>

        <div className="password-box">
          <span className={!password ? "placeholder" : ""}>
            {password || "Your password will appear here"}
            </span>
          <button 
          disabled={!password}
          onClick={copyPassword}
            >
            copy
            </button>
        </div>

        {password && (
          <p className={`strength ${getPasswordStrength().toLowerCase()}`}>
            Strength: {getPasswordStrength()}
          </p>
        )}

        {copied && <div className="toast">Copied!</div>}

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
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)} 
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

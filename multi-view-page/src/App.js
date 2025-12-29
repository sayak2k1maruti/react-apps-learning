import "./App.css";
import { useState } from "react";

export default function App() {
  return (
    <>
      <Steps
        messages={[
          "Hello World",
          "Bonjour le monde",
          "Hola Mundo",
          "Hallo Welt",
          "Ciao Mondo",
        ]}
      />
      <Steps
        messages={[
          "Apple",
          "Banana",
          "Cherry",
          "Date",
          "Elderberry",
          "Fig",
          "Grape",
        ]}
      />
    </>
  );
}

function Steps({ messages }) {
  // const step = 1;
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);

  function nextStep() {
    if (step < messages.length) {
      // setStep(step + 1);
      setStep((s) => s + 1); //Better approach as it uses the previous state value
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function toogleOpen() {
    setOpen((open) => !open);
  }

  return (
    <>
      <button className="btn toggle-btn" onClick={toogleOpen}>
        {open ? "Close" : "Open"}
      </button>
      {open && (
        <div className="steps">
          <ul className="navs">
            {Array.from({ length: messages.length }).map((_, index) => (
              <li
                className={index + 1 <= step ? "selected" : ""}
                key={index}
                onClick={() => setStep(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
          <p>
            Step {step} : {messages[step - 1]}{" "}
          </p>
          <div className="btns">
            <button onClick={prevStep} className="btn" disabled={step === 1}>
              Previous
            </button>
            <button
              onClick={nextStep}
              className="btn"
              disabled={step === messages.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

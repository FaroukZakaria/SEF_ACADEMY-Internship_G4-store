import { useRef } from "react";

const OTPInput = ({ value, onChange, onComplete }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const input = e.target.value;
    if (!/^\d*$/.test(input)) return;
    const newOtp = [...value];
    newOtp[index] = input.slice(-1);
    onChange(newOtp);
    if (input && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (index === 5 && newOtp.every((digit) => digit !== "")) {
      setTimeout(() => {
        onComplete(newOtp.join(""));
      }, 150);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key !== "Backspace") return;
    const newOtp = [...value];
    if (newOtp[index]) {
      newOtp[index] = "";
      onChange(newOtp);
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newOtp = ["", "", "", "", "", ""];
    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });
    onChange(newOtp);
    if (pasted.length === 6) {
      setTimeout(() => {
        onComplete(newOtp.join(""));
      }, 150);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-8 h-8 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-amazon-border bg-transparent text-center text-xl md:text-2xl font-semibold outline-none focus:border-amazon-orange transition-all"
        />
      ))}
    </div>
  );
};

export default OTPInput;

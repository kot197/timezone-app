import { ChangeEvent, useRef } from "react";

const VerificationCodeInput = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    

    function handleInputChange(event: ChangeEvent<HTMLInputElement>, index: number): void {
        const value = event.target.value.toUpperCase(); // Convert the input to uppercase
        event.target.value = value; // Update the input value with the uppercase value

        if (value.length === 1 && index < inputRefs.current.length - 1) {
        // Move to the next input box
        inputRefs.current[index + 1]?.focus();
        }
    }

  return (
    <div className='flex justify-center space-x-4 text-black'>
        {[...Array(6)].map((_, index) => (
            <input
            key={index}
            name={`codeChar`+(index+1)}
            type="text"
            maxLength={1}
            autoFocus={index === 0}
            className="text-center text-2xl w-11 h-14 rounded-xl"
            ref={(el) => {inputRefs.current[index] = el}}
            onChange={(event) => handleInputChange(event, index)}/>
        ))
        }
    </div>
  );
};

export default VerificationCodeInput;
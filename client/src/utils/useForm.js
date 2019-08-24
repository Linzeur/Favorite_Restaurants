import React from "react";

function useForm() {
  const [inputValue, setInputValue] = React.useState("");

  return {
    value: inputValue,
    onChange: React.useCallback(event => {
      setInputValue(event.target.value);
    }, [])
  };
}

export default useForm;

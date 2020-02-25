import { useState } from "react";

export default function useForm(initialState, onSubmit) {
  const [inputs, setInputs] = useState(initialState);

  const subscribe = field => value => {
    setInputs({ ...inputs, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(inputs);
  };
  return { subscribe, handleSubmit, inputs };
}

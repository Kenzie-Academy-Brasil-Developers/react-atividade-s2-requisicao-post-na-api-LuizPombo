import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState([]);
  const [catcher, setCatcher] = useState(false);

  const formSchema = yup.object().shape({
    username: yup.string().required("Nome de usuário necessário"),
    password: yup.string().required("Senha necessária"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => setFormData(data);
  console.log(formData);

  axios
    .post("https://kenzieshop.herokuapp.com/sessions/", formData)
    .then((response) => (response ? setCatcher(true) : setCatcher(false)))
    .catch((err) => (err ? setCatcher(false) : setCatcher(true)));

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Username" {...register("username")} />
        {errors.username?.message}
        <input placeholder="password" {...register("password")} />
        {errors.password?.message}
        <button type="submit">login</button>
      </form>
      {catcher ? (
        <p className="lib">acesso liberado</p>
      ) : (
        <p className="neg">acesso negado</p>
      )}
    </div>
  );
}

export default App;

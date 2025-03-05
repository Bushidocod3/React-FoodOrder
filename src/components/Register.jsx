import { useContext } from "react";
import { useActionState } from "react";
import UserProgressContext from "../store/UserProgressContext";
import AuthContext from "../store/AuthContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Error from "./UI/Error";

export default function Register() {
  const userProgressCtx = useContext(UserProgressContext);
  const authCtx = useContext(AuthContext);

  function handleClose() {
    userProgressCtx.hideRegister();
  }

  async function registerAction(_, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    await authCtx.register(name, email, password); 
    handleClose(); 
  }

  const [formState, formAction, isSending, error] = useActionState(registerAction, null);

  let modalActions = (
    <>
      <Button textOnly onClick={handleClose}>Zamknij</Button>
      <Button type="submit">Zarejestruj</Button>
    </>
  );
  if (isSending) {
    modalActions = <p>Trwa rejestracja...</p>;
  }

  return (
    <Modal open={userProgressCtx.progress === "register"} onClose={handleClose}>
      <form onAction={formAction}>
        <h2>Rejestracja</h2>
        <Input label="Imię" type="text" id="name" required />
        <Input label="E-Mail" type="email" id="email" required />
        <Input label="Hasło" type="password" id="password" required />

        {error && <Error title="Błąd rejestracji" message={error} />}
        <p className="modal-actions">{modalActions}</p>
      </form>
    </Modal>
  );
}

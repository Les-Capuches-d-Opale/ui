import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="formLayout">
      <h1 style={{ width: "400px" }}>
        Connectez-vous pour accèder à votre espace administrateur
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;

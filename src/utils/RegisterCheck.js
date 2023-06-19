export const handleRegisterCheck = () => {
    if (registerPassword.length < 6) {
      alert("Пароль должен содержать больше 6 символов !");
      return false;
    } else {
      return true;
    }
  };

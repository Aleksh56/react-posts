export const handleRegisterCheck = (pass) => {
    if (pass.length < 6) {
      alert("Пароль должен содержать больше 6 символов !");
      return false;
    } else {
      return true;
    }
  };



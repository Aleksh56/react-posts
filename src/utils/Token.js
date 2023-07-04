export const handleGetToken = () => {
    const headers = {
      'Content-Type': "application/json",
      authorization: JSON.parse(localStorage.getItem("token"))
    };
    return { headers };
  };
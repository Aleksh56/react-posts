export const handleLogin = () => {
    const headers = {
      'Content-Type': "application/json",
      authorization: localStorage.getItem("react_posts_token")
    };
    return { headers };
  };
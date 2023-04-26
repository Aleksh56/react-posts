
class Api{
    handleLoginSubmit = (event) => {
        event.preventDefault()
        fetch("https://api.react-learning.ru/signin", {
            method: "POST",
            body: JSON.stringify({
              email: loginEmail,
              password: loginPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then(alert("1111"))
            .then((json) => console.log(json))
    }
    handleRegisterSubmit = (event) => {
        event.preventDefault()
    
        fetch("https://api.react-learning.ru/signup", {
          method: "POST",
          body: JSON.stringify({
            email: registerEmail,
            group: "ep",
            password: registerPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json))
      }
}

export default Api
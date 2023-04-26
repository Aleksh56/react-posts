
// токен
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ5NWNkMDhmYmM0NzNmYTg5ZTQwMDciLCJncm91cCI6ImVwIiwiaWF0IjoxNjgyNTMzMDE5LCJleHAiOjE3MTQwNjkwMTl9.Qa6u4j8xEUS63vaBMcY0aT5v6THU1a5emwdfZiRtUfY"

// url ссылки
const urlGroup = "https://api.react-learning.ru/v2/ep"


const config = {
  baseUrl: urlGroup,
  headers: {
      "Content-Type": "application/json",
      authorization: token,
  }
}

class Api{
    constructor(data){
      this.baseUrl = data.baseUrl;
      this.headers = data.headers;
    }
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
            group: group,
            password: registerPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json))
    }

    // Добавил несколько api запросов 
    getUserInfo = ()=>{
      fetch(`${this.baseUrl}/users/me`,{
          headers: this.headers
      })
      .then((response)=> {return response.json()})
    }
    updateUserInfo = () => {
      fetch(`${this.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: this.headers,
    }).then((response)=> {return response.json()})
    }
    getAllPosts = () =>{
      fetch(`${this.baseUrl}/posts`,{
        headers: this.headers
    })
      .then((response)=> {return response.json()})
    }
    addNewPost = (newPost) =>{
      fetch(`${this.baseUrl}/posts`,{
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(newPost),
    })
      .then((response)=> {return response.json()})
    }

    

}
export const api = new Api(config)
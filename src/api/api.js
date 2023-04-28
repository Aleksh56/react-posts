// токен
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ5NWNkMDhmYmM0NzNmYTg5ZTQwMDciLCJncm91cCI6ImVwIiwiaWF0IjoxNjgyNTMzMDE5LCJleHAiOjE3MTQwNjkwMTl9.Qa6u4j8xEUS63vaBMcY0aT5v6THU1a5emwdfZiRtUfY"

// url ссылки
const urlGroup = "https://api.react-learning.ru/v2/ep"


const config = {
  baseUrl: urlGroup,
  headers: {
      "Content-Type": "application/json",
      authorization: token,
  },
  group: "ep" 
}

class Api{
    constructor(data){
      this.baseUrl = data.baseUrl;
      this.headers = data.headers;
      this.group = data.group
    }

    handleResetPassword = (event) => {
      event.preventDefault()
      fetch("https://api.react-learning.ru/password-reset", {
        method: "POST",
        body: JSON.stringify({
          email: event.target.children[0].children[1].value,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
    }

     handleLoginSubmit = async (event) => {
      try {
        const loginSuccess = await fetch("https://api.react-learning.ru/signin", {
          method: "POST",
          body: JSON.stringify({
            email: event.target.children[0].children[1].value,
            password: event.target.children[1].children[1].value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (loginSuccess.ok) {
          const response = await loginSuccess.json();
          return {success: 1, data: response.data};
        } else {
          return 0;
        }
      } catch (error) {
        console.log("Ошибка - ", error);
        return 0;
      }
    };
    
     handleRegisterSubmit = (event) => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch("https://api.react-learning.ru/signup", {
            method: "POST",
            body: JSON.stringify({
              email: event.target.children[0].children[1].value,
              group: this.group,
              password: event.target.children[1].children[1].value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            resolve(1);
          } else {
            resolve(0);
          }
        } catch (error) {
          console.log("Ошибка - ", error);
          resolve(0);
        }
      });
    };
    
    

    // Добавил несколько api запросов 
    getUserInfo = async ()=>{
      const response = await fetch(`${this.baseUrl}/users/me`,{
          headers: this.headers
      })
      const userData = await response.json()
      return userData
    }
    updateUserInfo = () => {
      fetch(`${this.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: this.headers,
    }).then((response)=> {return response.json()})
    }
    getAllPosts = async () =>{
      const fetchPosts = await fetch(`${this.baseUrl}/posts`,{
        method: "GET",
        headers: this.headers
    })
      const allPosts = await fetchPosts.json()
      return allPosts
    }

    addNewPost = async (newPost) =>{
        await fetch(`${this.baseUrl}/posts`,{
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(newPost),
    })
    }

    updatePostInfo = async (post) => {
      // console.log(post)
      // console.log(JSON.stringify(post))
      // console.log(post._id)
      fetch(`${this.baseUrl}/posts/${post._id}`,{
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(post)
    })
    }

    deletePost = async (postId) => {
      // console.log(postId)
      fetch(`${this.baseUrl}/posts/${postId}`,{
        method: 'DELETE',
        headers: this.headers,
    })
    }

    

}
export const api = new Api(config)
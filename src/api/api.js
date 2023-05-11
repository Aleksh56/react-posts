const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ5NWNkMDhmYmM0NzNmYTg5ZTQwMDciLCJncm91cCI6ImVwIiwiaWF0IjoxNjgyNTMzMDE5LCJleHAiOjE3MTQwNjkwMTl9.Qa6u4j8xEUS63vaBMcY0aT5v6THU1a5emwdfZiRtUfY"
const urlGroup = "https://api.react-learning.ru/v2/ep"
let fetchedToken = ""


const config = {
  baseUrl: urlGroup,
  headers: {
      "Content-Type": "application/json",
      authorization: token,
  },
}

class Api{
    constructor(data){
      this.baseUrl = data.baseUrl;
      this.headers = data.headers;
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
        const response = await fetch("https://api.react-learning.ru/signin", {
          method: "POST",
          body: JSON.stringify({
            email: event.target.children[0].children[1].value,
            password: event.target.children[1].children[1].value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          fetchedToken = data.token
          return { success: 1, data: data.data };
        } else {
          return 0;
        }
      } catch (error) {
        console.log("Ошибка - ", error);
        return 0;
      }
    };
    
     handleRegisterSubmit = async (event) => {
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
        return 1
      } catch (error) {
        console.log("Ошибка - ", error);
        return 0
      }
    };
    
    async getUserInfo() {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      });
      const userData = await response.json();
      return userData;
    }

    async updateUserInfo(updUser) {
      await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(updUser)
    })
    }
    async updateUserAvatar(updAvatar){
      await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(updAvatar)
    })
    }
    async getAllPosts() {
      const response = await fetch(`${this.baseUrl}/posts`, {
        headers: this.headers,
      });
      const allPosts = await response.json();
      return allPosts;
    }

    async addNewPost(newPost) {
      await fetch(`${this.baseUrl}/posts`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(newPost),
      });
    }

    async updatePostInfo(post) {
      await fetch(`${this.baseUrl}/posts/${post._id}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(post),
      });
    }

    
    async deletePost(postId) {
      await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: this.headers,
      });
    }

    async getInfoAboutPostById(postId) {
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: "GET",
        headers:this.headers,
      });
      const postInfo = await response.json();
      return postInfo;
    }

    async likePostRequest(postId) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/likes/${postId._id}`, 
        { method: 'PUT' ,
          headers:this.headers,
      });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    async removeLikeRequest(postId) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/likes/${postId._id}`, { 
          method: 'DELETE',
          headers: this.headers,
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    
    
}
export const api = new Api(config)
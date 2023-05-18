// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ5NWNkMDhmYmM0NzNmYTg5ZTQwMDciLCJncm91cCI6ImVwIiwiaWF0IjoxNjgyNTMzMDE5LCJleHAiOjE3MTQwNjkwMTl9.Qa6u4j8xEUS63vaBMcY0aT5v6THU1a5emwdfZiRtUfY"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2MzY1MmUwYmYyYzUxOWJhOTcyMDciLCJncm91cCI6ImVwIiwiaWF0IjoxNjg0NDIwNDcwLCJleHAiOjE3MTU5NTY0NzB9.E7t_V4y0-KD-Md0WP7-dPyj-OOWcBuTOVaRxAXmFYcc"
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
          console.log(data)
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
            group: "ep",
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
      const newUserData = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(updUser)
    })
    const updatedUserData = await newUserData.json()
    return updatedUserData
    }
    async updateUserAvatar(updAvatar){
      await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body:JSON.stringify(updAvatar)
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
        const response = await fetch(`${this.baseUrl}/posts/likes/${postId}`, {
          method: 'PUT',
          headers: this.headers,
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    async removeLikeRequest(postId) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/likes/${postId}`, {
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
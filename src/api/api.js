import {handleGetToken} from "../utils/Token"

const urlGroup = "https://api.react-learning.ru/v2/ep"

const config = {
  baseUrl: urlGroup,
}

class Api{
    constructor(data){
      this.baseUrl = data.baseUrl;
    }

    handleResetPassword = (event) => {
      event.preventDefault()
      fetch("https://api.react-learning.ru/password-reset", {
        method: "POST",
        body: JSON.stringify({
          email: event.target.children[0].children[1].value,
        }),
        ...handleGetToken(),
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
          ...handleGetToken(),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', JSON.stringify(data.token))
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
          ...handleGetToken(),
        });
        return 1
      } catch (error) {
        console.log("Ошибка - ", error);
        return 0
      }
    };
    
    async getUserInfo() {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        ...handleGetToken(),
      });
      const userData = await response.json();
      return userData;
    }

    async updateUserInfo(updUser) {
      const newUserData = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        ...handleGetToken(),
        body: JSON.stringify(updUser)
    })
    const updatedUserData = await newUserData.json()
    return updatedUserData
    }
    async updateUserAvatar(updAvatar){
      await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        ...handleGetToken(),
        body:JSON.stringify(updAvatar)
    })
    }
    async getAllPosts() {
      const response = await fetch(`${this.baseUrl}/posts`, {
        ...handleGetToken(),
      });
      const allPosts = await response.json();
      return allPosts;
    }

    async addNewPost(newPost) {
      await fetch(`${this.baseUrl}/posts`, {
        method: "POST",
        ...handleGetToken(),
        body: JSON.stringify(newPost),
      });
    }

    async updatePostInfo(post) {
      console.log(handleGetToken())
      await fetch(`${this.baseUrl}/posts/${post._id}`, {
        method: "PATCH",
        ...handleGetToken(),
        body: JSON.stringify(post),
      });
    }

    
    async deletePost(postId) {
      await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: "DELETE",
        ...handleGetToken(),
      });
    }

    async getInfoAboutPostById(postId) {
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: "GET",
        ...handleGetToken(),
      });
      const postInfo = await response.json();
      return postInfo;
    }

    async likePostRequest(postId) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/likes/${postId}`, {
          method: 'PUT',
          ...handleGetToken(),
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
          ...handleGetToken(),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    async addCommentToPost(postId, commentText){
      try {
        const response = await fetch(`${this.baseUrl}/posts/comments/${postId}`, {
          method: 'POST',
          ...handleGetToken(),
          body:JSON.stringify({ text: commentText })
        });
        return response;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    async removeCommentFromPost(postId, commentId){
      try {
        const response = await fetch(`${this.baseUrl}/posts/comments/${postId}/${commentId}`, {
          method: 'DELETE',
          ...handleGetToken(),
        });
        return response;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
}
export const api = new Api(config)
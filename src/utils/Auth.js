const API_URL = "https://auth.nomoreparties.co";

export const register = ({password, email}) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResponse)
}; 

export const login = () => {

};


const checkResponse =(response) => {
    if(response.ok) {
        return response.json()
    }
    return response.json().then(error => {
        throw error.error;
    })
} 
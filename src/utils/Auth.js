const BASE_URL = "https://auth.nomoreparties.co";
function cheeckResponse(promise) {
  return promise.then((res) => {
    return (res.status === 200) ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
  }

export const register = (email, password) => {

  console.log('register:', email, password)
  return  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({email, password})
  })
  
  .then(res => {
    console.log('response', res.json())
  })
}
const baseUrl = 'http://localhost:8080/api';

export const get = async (path: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Content-Type", "application/json");

  const token = localStorage.getItem('jwt');

  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: myHeaders,
    credentials: 'include',
  });

  if (!response.ok) {
    return { errors: await response.json() };
  }

  return { data: await response.json() };
}

export const post = async (path: string, body: object) => {
  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Content-Type", "application/json");

  const token = localStorage.getItem('jwt');

  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
    credentials: 'include',
  });

  if (!response.ok) {
    return { errors: await response.json() };
  }

  return { data: await response.json() };
}

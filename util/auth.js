const AUTH_URL = 'http://localhost:8181/api/auth';

const authenticate = async (email, password) => {
  const url = AUTH_URL + '/signin';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await res.json();
  console.log('로그인 결과: ', result);
};

export function login(email, password) {
  return authenticate(email, password);
}

// export default authenticate;

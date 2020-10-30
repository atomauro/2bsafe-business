import fetch from 'node-fetch';
import FormData from 'form-data';

const TOKEN_SMARTFIT = '875e7df451fd652e94ce6520add30404';
// const getAccessToken = async () => {
//   const response = await fetch(API_2BSAFE_BASE_URL + '/login', {
//     method: 'POST',
//     body: JSON.stringify({
//       email: 'admin@2bsafe.com',
//       password: 'admin2bsafe'
//     })
//   });
//   const data = await response.json();

//   if (data.data) {
//     return data.data.accessToken;
//   }
// };

const SMARTFIT_BASE_URL = 'https://app.smartfit.com.br/api/public/v1';
// const API_2BSAFE_BASE_URL = 'https://api2bsafe.herokuapp.com/';
const API_2BSAFE_BASE_URL = 'https://api.smartfitreserva.com';
const ERRORS: any[] = [];

async function callApi(url: string, options: any = {}) {
  console.log(`callApi: url'${url}`);
  console.log('options', options);
  try {
    const response = await fetch(url, options);
    console.log('response', response);
    const data = await response.json();
    console.log('data', data);
    return {
      ...data,
      hasErrors: () => (data.errors ? data.errors.length > 0 : false)
    };
  } catch (ex) {
    console.error('ex', ex);
    return {
      errors: [ex],
      hasErrors: () => true
    };
  }
}

async function api(credenciales: {
  email: string;
  password?: string;
  accessToken?: string;
}) {
  const { email, password, accessToken } = credenciales;
  let { empresa, posibleSucursal } = {
    empresa: email.slice(0, email.indexOf('@')),
    posibleSucursal: email.slice(email.indexOf('@') + 1, email.indexOf('.com'))
  };
  if (posibleSucursal !== '2bsafe') {
    const empresatemp = empresa;
    empresa = posibleSucursal;
    posibleSucursal = empresatemp;
  }
  const isAdmin: boolean = posibleSucursal === '2bsafe';

  const getAccessToken = async () => {
    const response = await login(`${email}`, password || '');
    if (response.hasErrors()) {
      ERRORS.concat(response.errors);
      return response;
    } else {
      return { data: response.data.accessToken, hasErrors: false };
    }
  };
  const login = async (emailLogin: string, pass: string) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email: emailLogin, password: pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await callApi(`${API_2BSAFE_BASE_URL}/login`, options);
    return { ...response, hasErrors: () => response.errors.length > 0 };
  };

  const ACCESS_TOKEN: string =
    accessToken || (await getAccessToken()).data || '';
  const authTokenHeader = {
    'Content-Type': 'application/json',
    'x-auth-token': ACCESS_TOKEN
  };

  const AdminActions = {
    leerSucursales: async () => {
      const options = {
        method: 'GET',
        headers: authTokenHeader
      };
      const response = await callApi(
        `${API_2BSAFE_BASE_URL}/${empresa}?all=true`,
        options
      );
      response.hasErrors = () => response.errors.length > 0;
      return response;
    },
    nuevaSucursal: async (sucursalDoc: any) => {
      const options = {
        method: 'POST',
        headers: authTokenHeader,
        body: JSON.stringify({
          ...sucursalDoc
        })
      };
      const response = await callApi(
        `${API_2BSAFE_BASE_URL}/${empresa}`,
        options
      );
      return { ...response, hasErrors: () => response.errors.length > 0 };
    },
    changePassword: async (sucursal: string) => {
      const options = {
        method: 'PUT',
        headers: authTokenHeader
      };
      const response = await callApi(
        `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/reset-password`,
        options
      );
      response.hasErrors = () => response.errors.length > 0;
      return response;
    },
    eliminarSucursal: async (sucursal: string) => {
      const options = {
        method: 'DELETE',
        headers: authTokenHeader
      };
      const response = await callApi(
        `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}`,
        options
      );
      response.hasErrors = () => response.errors.length > 0;
      return response;
    }
  };

  return ACCESS_TOKEN
    ? {
        admin: isAdmin ? AdminActions : null,
        accessToken: ACCESS_TOKEN,
        users: {
          login: async (id: string) => {
            const form = new FormData();
            form.append('login', id);
            form.append('authentication_field', 'client_token');
            // TODO: environment variable
            form.append(
              'authentication_value',
              'd3da0b76e5af241fcd1e59a0c2c6b106'
            );
            const options = {
              method: 'POST',
              body: form,
              headers: {
                Authorization: `Token token=${TOKEN_SMARTFIT}`
              }
            };
            const response = await callApi(
              `${SMARTFIT_BASE_URL}/person_session`,
              options
            );
            if (!response.auth_token) {
              return { error: 'Error' };
            }

            return { authToken: response.auth_token };
          },
          info: async (singleAccessToken: string) => {
            const options = {
              method: 'GET',
              headers: {
                Authorization: `Token token=${TOKEN_SMARTFIT}`
              }
            };
            const response = await callApi(
              `${SMARTFIT_BASE_URL}/person_session/${singleAccessToken}`,
              options
            );
            if (!response.id) {
              return { error: 'Error' };
            }

            return {
              ...response
            };
          }
        },
        registros: {
          leerRegistros: async (
            sucursal: string,
            dateTag: string,
            blockTag: string
          ) => {
            blockTag =
              blockTag.length === 7
                ? `${blockTag.slice(0, blockTag.length - 1)}0${blockTag.charAt(
                    blockTag.length - 1
                  )}`
                : blockTag;
            const options = {
              method: 'GET',
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/registros/${dateTag}/${blockTag}`,
              options
            );
            return response;
          }
        },
        reservas: {
          leerReservas: async (
            sucursal: string,
            dateTag: string,
            blockTag: string
          ) => {
            blockTag =
              blockTag.length === 7
                ? `${blockTag.slice(0, blockTag.length - 1)}0${blockTag.charAt(
                    blockTag.length - 1
                  )}`
                : blockTag;
            const options = {
              method: 'GET',
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/reservas/${dateTag}/${blockTag}`,
              options
            );
            return response;
          }
        },
        bloques: {
          createBloque: async (infoBloque: any, sucursal: any) => {
            const options = {
              method: 'POST',
              body: JSON.stringify(infoBloque),
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/bloques`,
              options
            );
            return response;
          },
          getBloquesByDateTag: async (sucursal: string, dateTag: string) => {
            const options = {
              method: 'GET',
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/reservas/${dateTag}`,
              options
            );
            return response;
          },
          deleteBloque: async (
            sucursal: string,
            dateTag: string,
            blockTag: string
          ) => {
            blockTag =
              blockTag.length === 7
                ? `${blockTag.slice(0, blockTag.length - 1)}0${blockTag.charAt(
                    blockTag.length - 1
                  )}`
                : blockTag;
            const options = {
              method: 'DELETE',
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/bloques/${dateTag}/${blockTag}`,
              options
            );
            return response;
          }
        }
      }
    : {
        loginError: {
          errors: ERRORS,
          login: async (credencialesNuevas: {
            email: string;
            password?: string;
            accessToken?: string;
          }) => {
            return await api(credencialesNuevas);
          }
        }
      };
}

export default api;

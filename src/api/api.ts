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
const API_2BSAFE_BASE_URL = 'https://api2bsafe.herokuapp.com';
const ERRORS: any[] = [];

async function callApi(url: string, options: any = {}) {
  console.log(`callApi: url'${url}`);
  console.log('options', options);
  try {
    const response = await fetch(url, options);
    console.log('response', response);
    const data = await response.json();
    return data;
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
  const { empresa, posibleSucursal } = {
    empresa: email.slice(0, email.indexOf('@')),
    posibleSucursal: email.slice(email.indexOf('@'), email.indexOf('.com'))
  };
  // if (sucursal === "2bsafe") {

  // }
  const getAccessToken = async () => {
    const response = await login(`${email}`, password || '');
    console.log('responseGETACCESSTOKEN', response);
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
        `${API_2BSAFE_BASE_URL}/${empresa}`,
        options
      );
      response.hasErrors = () => response.errors.length > 0;
      return response;
    },
    nuevaSucursal: async (sucursalName: string, sucursalDoc: any) => {
      const options = {
        method: 'POST',
        headers: authTokenHeader,
        body: JSON.stringify({
          email: `${sucursalName}@${empresa}.com`,
          ...sucursalDoc
        })
      };
      const response = await callApi(`${API_2BSAFE_BASE_URL}/signup`, options);
      return { ...response, hasErrors: () => response.errors.length > 0 };
    },
    changePassword: async (sucursal?: string) => {
      if (!sucursal) {
        return; // Caso cambiar contraseña empresa
      } else {
        const options = {
          method: 'POST',
          headers: authTokenHeader,
          body: JSON.stringify({ email: `${sucursal}@${empresa}.com` })
        };
        const response = await callApi(
          `${API_2BSAFE_BASE_URL}/reset-password`,
          options
        );
        response.hasErrors = () => response.errors.length > 0;
        return response;
      }
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
        admin: AdminActions,
        accessToken: ACCESS_TOKEN,
        users: {
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
              name: response.name,
              email: response.email,
              status: response.status,
              address: {
                city: response.address.city,
                state: response.address.state
              }
            };
          }
        },
        reservas: {
          //   nuevaReserva: async (empresa: string, sucursal: string, doc: any) => {
          //     if (!TOKEN_API_FIREBASE) {
          //       TOKEN_API_FIREBASE = await getAccessToken();
          //     }
          //     const options = {
          //       method: 'POST',
          //       body: JSON.stringify(doc),
          //       headers: {
          //         'x-auth-token': TOKEN_API_FIREBASE
          //       }
          //     };
          //     return await callApi(
          //       `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/reservas`,
          //       options
          //     );
          //   },
          nuevaReserva: async (sucursal: string, reservaDoc: any) => {
            const options = {
              method: 'POST',
              body: JSON.stringify(reservaDoc),
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/reservas`,
              options
            );
            return response;
          },
          leerReservas: async (sucursal: string) => {
            const options = {
              method: 'GET',
              headers: authTokenHeader
            };
            const response = await callApi(
              `${API_2BSAFE_BASE_URL}/${empresa}/${sucursal}/reservas`,
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

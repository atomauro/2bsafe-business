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
const API_2BSAFE_BASE_URL = 'http://localhost:8000';

async function callApi(url: string, options: any = {}) {
  console.log(`callApi: url'${url}`);
  console.log('options', options);
  try {
    const response = await fetch(url, options);
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
  empresa: string;
  password?: string;
  accessToken?: string;
}) {
  const { empresa, password, accessToken } = credenciales;
  const getAccessToken = async () => {
    const response = await login(`${empresa}@2bsafe.com`, password || '');
    if (response.hasErrors()) {
      return response;
    } else {
      return { data: response.data.accessToken, hasErrors: false };
    }
  };
  const login = async (email: string, pass: string) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
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
        headers: authTokenHeader,
        body: null
      };
      const response = await callApi(
        `${API_2BSAFE_BASE_URL}/${empresa}`,
        options
      );
      response.hasErrors = () => response.errors.length > 0;
      return response;
    },
    nuevaSucursal: async (sucursalName: string) => {
      const options = {
        method: 'POST',
        headers: authTokenHeader,
        body: JSON.stringify({ email: `${sucursalName}@${empresa}.com` })
      };
      const response = await callApi(`${API_2BSAFE_BASE_URL}/signup`, options);
      return { ...response, hasErrors: () => response.errors.length > 0 };
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
          leerReservas: async (sucursal: string, reservaDoc: any) => {
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
          }
        }
      }
    : {
        loginError: {
          login: async (credencialesNuevas: {
            empresa: string;
            password?: string;
            accessToken?: string;
          }) => {
            return await api(credencialesNuevas);
          }
        }
      };
}

export default api;

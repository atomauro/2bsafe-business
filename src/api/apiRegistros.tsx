import apifirestore from './firebase/firestore/api';

export default function(usernameRaw: string) {
  const extractcompanyname = (username: string) =>
    username.slice(0, username.indexOf('@'));
  const escadenavacia = (cadena: string): boolean => cadena.length === 0;

  const COMPANY_NAME = extractcompanyname(usernameRaw).toLowerCase();
  console.log('COMPANY_NAME', COMPANY_NAME);
  const apiFirestore = apifirestore(COMPANY_NAME);
  if (escadenavacia(COMPANY_NAME)) {
    throw new Error('Error al obtener COMPANY_NAME desde username');
  }

  return {
    nuevoRegistro: async (registro: any) => {
      const response = await apiFirestore.create(registro);
      if (response.errors) {
        return false;
      }
      return true;
    },
    obtenerRegistros: async () => {
      return await apiFirestore.read();
    }
  };
}

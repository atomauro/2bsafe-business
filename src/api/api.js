import firebase from './firebase/firebase';

export default function() {
  return {
    authenticate: async (email, pass) => {
      let user = null;
      try {
        user = await firebase.auth().signInWithEmailAndPassword(email, pass);
      } catch (error) {
        console.log('error al crear el usuario');
      }

      return user;
    },
    signout: async () => await firebase.auth().signOut(),
    onUserChange: firebase.auth().onAuthStateChanged
  };
}

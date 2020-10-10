import firebase from './../firebase';

export default function api(collectionname: string) {
  const DB = firebase.firestore();
  DB.settings({
    timestampsInSnapshots: true
  });
  const collectionRef = DB.collection(collectionname);

  return {
    create: async doc => {
      try {
        await collectionRef.add(doc);
      } catch (error) {
        return { errors: error };
      }
      return { errors: null };
    },
    read: async () => {
      const response = await collectionRef.get();
      return response.map(documentSnapshot => documentSnapshot.data());
    },
    log: async doc => await db.collection('logs').add(doc)
  };
}

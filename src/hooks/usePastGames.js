import firebase from 'firebase/app';
import { useState, useEffect } from 'react';

const usePastGames = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const userId = firebase.auth().currentUser?.uid

        if (userId) {
            const ref = firebase.database().ref(`users/${userId}/boards/`);
            ref.on('value', (snapshot) => setData(snapshot.val()));

            return () => ref.off('value');
        }
    }, [])

    return data
};

export default usePastGames;

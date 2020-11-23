import firebase from 'firebase';

const createGame = async (board, setId) => {
    const user = firebase.auth().currentUser;
    if (!user) {
        await signIn()
        return createGame(board, setId)
    }

    const newBoard = { ...board, startAt: Date.now() }

    const id = await firebase
        .database()
        .ref(`users/${user?.uid}/boards`)
        .push(newBoard)
        .key
    setId(id)
}

const updateGame = (board, id) => {
    const user = firebase.auth().currentUser;
    if (user && id) {
        firebase.database()
            .ref(`users/${user.uid}/boards/${id}/`)
            .update(board)
    }
}

const finishGame = (id, won, turns) => {
    const user = firebase.auth().currentUser;

    firebase.database()
        .ref(`users/${user.uid}/boards/${id}`)
        .update({ won, finishAt: Date.now(), turns })
}

const signIn = async () => {
    await firebase.auth().signInAnonymously()
}


export {
    createGame,
    updateGame,
    finishGame,
}
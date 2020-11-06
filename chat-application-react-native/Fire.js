import firebase from "firebase";

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyD7nFydqpS6Dc8CplQpBgNGbRVSJ6yN5wo",
                authDomain: "chatapplication1234.firebaseapp.com",
                databaseURL: "https://chatapplication1234.firebaseio.com",
                projectId: "chatapplication1234",
                storageBucket: "chatapplication1234.appspot.com",
                messagingSenderId: "813209052814",
                appId: "1:813209052814:web:765318025f30a2c98fcbdf",
                measurementId: "G-EBCVGWH51H"
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = (messages) => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message)
        });
    }

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    }

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
}


export default new Fire();
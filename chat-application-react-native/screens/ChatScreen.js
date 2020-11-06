import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

import Fire from "../Fire"

class ChatScreen extends Component {
    state = {
        messages: []
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.props.navigation.state.params.name
        }
    }

    componentDidMount = () => {
        Fire.get(message => this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        })));
    }

    componentWillUnmount = () => {
        Fire.off()
    }

    render() {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;

        if (Platform.OS == 'android') {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled >
                    {chat}
                </KeyboardAvoidingView>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1 }} >
                {chat}
            </SafeAreaView>
        );
    }
}
export default ChatScreen;
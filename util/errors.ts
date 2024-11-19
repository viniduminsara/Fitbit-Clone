import {ALERT_TYPE, Dialog} from "react-native-alert-notification";

export const handleAuthError = (error: any) => {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Danger',
            textBody: `${error.message.split(']')[1]}`,
            button: 'close',
        })
};

export const handleConnectionError = () => {
    Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Warning',
        textBody: 'Please check your connection',
        button: 'close',
    })
};

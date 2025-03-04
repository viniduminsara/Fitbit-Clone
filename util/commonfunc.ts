import {ALERT_TYPE, Toast} from "react-native-alert-notification";

export const showToast = (alertType: ALERT_TYPE, title: string, message: string) => {

    return (
        Toast.show({
            type: alertType,
            title: title,
            textBody: message,
            autoClose: 2000,
        })
    )
}

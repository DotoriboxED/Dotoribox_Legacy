import React from "react";
import {ListItem, ListItemText} from "@material-ui/core";

const App = (props) => {
    const primary = props.primary;
    const date = new Date(props.date);

    return (
        <ListItem>
            <ListItemText
                primary={primary}
                secondary={date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일 ' +
                date.getHours() + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초'}
            />
        </ListItem>
    )
}

export default App;
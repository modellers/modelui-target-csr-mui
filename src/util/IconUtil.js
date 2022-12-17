import React from 'react';
import 'font-awesome/css/font-awesome.min.css'; // https://stackoverflow.com/questions/23116591/how-to-include-a-font-awesome-icon-in-reacts-render
const LIB_FONT_AWESOME = "font-awesome"; // https://fontawesome.com/v4.7.0/icons/
const LIB_MATERIAL_UI = "material-ui"; // https://material-ui.com/components/material-icons/

export default function getIcon(icon_name) {
    /*
        Examples:
            'font-awesome:fa fa-spinner fa-sm fa-spin'
    */
    if (!icon_name) return undefined;
    if (icon_name.indexOf(LIB_FONT_AWESOME) === 0) {
        icon_name = icon_name.replace(LIB_FONT_AWESOME + ":", "").trim();
        return (<i className={icon_name}></i>)
    }
    else if (icon_name.indexOf(LIB_MATERIAL_UI) === 0) {
        icon_name = icon_name.replace(LIB_MATERIAL_UI + ":", "").trim(); // examle Star, Add
        return MaterialIcon(icon_name);
    }

}
/**/
// https://kamranicus.com/posts/2017-09-02-dynamic-import-material-icons-react
const MaterialIcon = (icon) => {
    let iconName = icon.replace(/Icon$/, '')
    let resolved = require(`@mui/icons-material/${iconName}`).default

    if (!resolved) {
        throw Error(`Could not find @mui/icons-material/${iconName}`)
    }

    return React.createElement(resolved)
}
/**/
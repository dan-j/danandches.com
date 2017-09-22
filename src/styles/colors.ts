import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const rose = '#FFA99C';
export const blue = '#2B4162';
export const teal = '#385F71';
export const beige = '#B8B09D';
export const offWhite = '#FFF8F8';

import MuiTheme = __MaterialUI.Styles.MuiTheme;

const customTheme: MuiTheme = {
    raisedButton: {
        primaryColor: rose,
        disabledColor: beige,
    }
};

export const muiTheme = getMuiTheme(customTheme);

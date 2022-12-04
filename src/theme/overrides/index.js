import Autocomplete from './Autocomplete';
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import CssBaseline from './CssBaseline';
import Input from './Input';
import Paper from './Paper';
import Tooltip from './Tooltip';
import Typography from './Typography';

export default function componentsOverrides(theme) {
    return Object.assign(
        Autocomplete(theme),
        Backdrop(theme),
        Button(theme),
        Card(theme),
        CssBaseline(theme),
        Input(theme),
        Paper(),
        Tooltip(theme),
        Typography(theme)
    );
}
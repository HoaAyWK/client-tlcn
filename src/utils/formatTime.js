import { format, formatDistanceToNow } from 'date-fns';

export function fDateN(date) {
    return format(new Date(date), 'yyyy-MM-dd');
}

export function fDate(date) {
    return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
    return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
    return format(new Date(date), 'dd/MM/yyyy p');
}

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}

export function fYMDate(date) {
    return format(new Date(date), 'yyyy-MM-dd');
}

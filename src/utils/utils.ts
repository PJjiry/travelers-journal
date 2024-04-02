import {format, isPast} from 'date-fns';

export function isPastDate(date: string): boolean {
    const visitDate = format(new Date(date), 'yyyy-MM-dd');
    return isPast(new Date(visitDate));
}
import {format, isPast} from 'date-fns';

// Function to check if the date is in the past
export function isPastDate(date: string): boolean {
    const visitDate = format(new Date(date), 'yyyy-MM-dd');
    return isPast(new Date(visitDate));
}
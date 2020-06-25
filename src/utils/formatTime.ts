import { DateUtils } from '@react-force/date-utils';

export function formatTime(millis: number): string {
    return DateUtils.format(new Date(millis), 'hh:mm:ss');
}

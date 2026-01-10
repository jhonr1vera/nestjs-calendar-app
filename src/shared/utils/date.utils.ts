export class DateUtils {

    // This utils return the time difference between two dates formatted as "Xd Yh Zm"
    static getTimeDifference(dateStart: Date | string, dateEnd: Date | string) {
        const start = new Date(dateStart).getTime();
        const end = new Date(dateEnd).getTime()

        let diffInMs = end - start;
        const isPast = diffInMs < 0;
        diffInMs = Math.abs(diffInMs);
        const msInMinute = 1000 * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;

        const days = Math.floor(diffInMs / msInDay);
        const hours = Math.floor((diffInMs % msInDay) / msInHour);
        const minutes = Math.floor((diffInMs % msInHour) / msInMinute);

        return `${isPast ? '-' : ''}${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm' : ''}`
    }
}

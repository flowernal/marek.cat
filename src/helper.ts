export const getWeekNumber = (date: Date | string): number => {
    date = new Date(date);

    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

    return weekNo;
}

export const getDaysUntil = (date: Date | string): number => {
    const today = new Date();
    const targetDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffMilliseconds = targetDate.getTime() - today.getTime();

    if (diffMilliseconds <= 0) {
        return 0;
    }

    return Math.round(diffMilliseconds / (1000 * 60 * 60 * 24));
};
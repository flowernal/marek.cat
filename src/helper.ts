export interface Dates {
    semester: {
        winter: {
            start: string;
            end: string;
            exams: {
                start: string;
                end: string;
            };
        };
        summer: {
            start: string;
            end: string;
            exams: {
                start: string;
                end: string;
            }
        };
    };
}

type Semester = "WINTER" | "SUMMER";
type NextEvent = "SEMESTER_START" | "SEMESTER_END" | "EXAMS_START" | "EXAMS_END";

interface Event {
    date: Date;
    semester: Semester;
    type: NextEvent;
}

export interface Info {
    semester: Semester;
    type: NextEvent;
    isToday: boolean;
    daysUntil: number;
    weekNumber: number;
    isWeekNumberEven: boolean;
    academicWeekNumber: number;
    isAcademicWeekNumberEven: boolean;
}

// Debug
const currentDate = new Date();

export const getInfo = (dates: Dates): Info => {
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    const events: Event[] = [
        { date: new Date(dates.semester.winter.start), semester: "WINTER" as const, type: "SEMESTER_START" as const },
        { date: new Date(dates.semester.winter.end), semester: "WINTER" as const, type: "SEMESTER_END" as const },
        { date: new Date(dates.semester.winter.exams.start), semester: "WINTER" as const, type: "EXAMS_START" as const },
        { date: new Date(dates.semester.winter.exams.end), semester: "WINTER" as const, type: "EXAMS_END" as const },
        { date: new Date(dates.semester.summer.start), semester: "SUMMER" as const, type: "SEMESTER_START" as const },
        { date: new Date(dates.semester.summer.end), semester: "SUMMER" as const, type: "SEMESTER_END" as const },
        { date: new Date(dates.semester.summer.exams.start), semester: "SUMMER" as const, type: "EXAMS_START" as const },
        { date: new Date(dates.semester.summer.exams.end), semester: "SUMMER" as const, type: "EXAMS_END" as const },
    ];

    for (const event of events) {
        event.date.setHours(0, 0, 0, 0);

        if (today <= event.date) {
            const isToday = today.getTime() === event.date.getTime();

            const weekNumber = getWeekNumber(currentDate);

            const isSemester = (event.type === "SEMESTER_START" && isToday) || event.type === "SEMESTER_END";
            const academicWeekNumber = isSemester ? getAcademicWeekNumber(
                event.semester === "WINTER" ? dates.semester.winter.start : dates.semester.summer.start,
                currentDate
            ) : 0;

            return {
                semester: event.semester,
                type: event.type,
                isToday,
                daysUntil: isToday ? 0 : getDaysUntil(event.date),
                weekNumber,
                isWeekNumberEven: weekNumber % 2 === 0,
                academicWeekNumber,
                isAcademicWeekNumberEven: academicWeekNumber % 2 === 0,
            };
        }
    }

    const nextYearWinter = new Date(dates.semester.winter.start);
    nextYearWinter.setFullYear(nextYearWinter.getFullYear() + 1);
    
    return {
        semester: "WINTER",
        type: "SEMESTER_START",
        isToday: false,
        daysUntil: getDaysUntil(nextYearWinter),
        weekNumber: getWeekNumber(currentDate),
        isWeekNumberEven: getWeekNumber(currentDate) % 2 === 0,
        academicWeekNumber: 0,
        isAcademicWeekNumberEven: false,
    };
}

export const getWeekNumber = (date: Date | string): number => {
    date = new Date(date);

    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

    return weekNo;
}

export const getAcademicWeekNumber = (semesterStart: string, date: Date | string): number => {
    const start = new Date(semesterStart);
    const currentDate = new Date(date);

    currentDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    const diffMilliseconds = currentDate.getTime() - start.getTime();
    if (diffMilliseconds < 0) {
        return 0;
    }

    const daysSinceStart = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    return Math.floor(daysSinceStart / 7) + 1;
}

export const getDaysUntil = (date: Date | string): number => {
    const today = new Date(currentDate);
    const targetDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffMilliseconds = targetDate.getTime() - today.getTime();

    if (diffMilliseconds <= 0) {
        return 0;
    }

    return Math.round(diffMilliseconds / (1000 * 60 * 60 * 24));
};
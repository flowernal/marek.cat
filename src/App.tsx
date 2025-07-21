import { useEffect, useState } from "react";
import { getInfo, type Dates, type Info } from "./helper";
import Koteseni from "./assets/koteseni.png";

const App = () => {
    const [dates, setDates] = useState<Dates>();
    const [info, setInfo] = useState<Info>();

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/flowernal/marek.cat/refs/heads/main/dates.json")
            .then(res => res.json())
            .then(data => {
                setDates(data);
                setInfo(getInfo(data));
            });
    }, []);

    if (typeof dates === "undefined" || typeof info === "undefined") {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <svg className="size-16 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-32 justify-center items-center min-h-screen max-w-2/5 m-auto text-center p-8">
            <div className="flex flex-col gap-4 justify-center items-center">
                {info.type === "SEMESTER_START" ? (
                    <h1 className="text-4xl text-fuchsia-300">
                        {info.semester === "WINTER" ? `Zimný semester začína${info.isToday ? "" : " o"}` : `Letný semester začína${info.isToday ? "" : " o"}`}
                    </h1>
                ) : info.type === "SEMESTER_END" ? (
                    <h1 className="text-4xl text-fuchsia-300">
                        {info.semester === "WINTER" ? `Zimný semester končí${info.isToday ? "" : " o"}` : `Letný semester končí${info.isToday ? "" : " o"}`}
                    </h1>
                ) : info.type === "EXAMS_START" ? (
                    <h1 className="text-4xl text-fuchsia-300">
                        {info.semester === "WINTER" ? `Zimné skúškové obdobie začína${info.isToday ? "" : " o"}` : `Letné skúškové obdobie začína${info.isToday ? "" : " o"}`}
                    </h1>
                ) : (
                    <h1 className="text-4xl text-fuchsia-300">
                        {info.semester === "WINTER" ? `Zimné skúškové obdobie končí${info.isToday ? "" : " o"}` : `Letné skúškové obdobie končí${info.isToday ? "" : " o"}`}
                    </h1>
                )}
                <div className="flex items-center gap-8">
                    {info.isToday ? (
                        <>
                            <img src={Koteseni} alt="Koteseni" className="animate-spin" width="50px" />
                            <h2 className="text-3xl text-sky-500">DNES!</h2>
                            <img src={Koteseni} alt="Koteseni" className="animate-spin" width="50px" />
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl"><span className="text-sky-500">{info.daysUntil}</span> {info.daysUntil === 1 ? "deň" : info.daysUntil >= 2 && info.daysUntil <= 4 ? "dni" : "dní"}</h2>
                            <img src={Koteseni} alt="Koteseni" className="animate-spin" width="50px" />
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl text-fuchsia-300">Tento týždeň je</h1>
                <div className="flex flex-col gap-12 justify-center items-center">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-3xl"><span className="text-sky-500">{info.weekNumber}.</span> v roku</h2>
                        <h2 className={`text-3xl ${info.isWeekNumberEven ? "text-green-400" : "text-yellow-400"}`}>{info.isWeekNumberEven ? "sudý / párny" : "lichý / nepárny"}</h2>
                    </div>
                    {info.academicWeekNumber > 0 ? (
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <h2 className="text-3xl"><span className="text-sky-500">{info.academicWeekNumber}.</span> akademický</h2>
                            <h2 className={`text-3xl ${info.isAcademicWeekNumberEven ? "text-green-400" : "text-yellow-400"}`}>{info.isAcademicWeekNumberEven ? "sudý / párny" : "lichý / nepárny"}</h2>
                        </div>
                    ) : (
                        <h2 className="text-3xl text-gray-500">Momentálne neprebieha akademický týždeň</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
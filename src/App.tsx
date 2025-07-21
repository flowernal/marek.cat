import { getDaysUntil, getWeekNumber } from "./helper";
import koteseni from "./assets/koteseni.png";

const App = () => {
    const weekNo = getWeekNumber(new Date());
    const weekIsEven = weekNo % 2 === 0;
    const daysUntilNewSemester = getDaysUntil("2025-09-15");

    return (
        <div className="flex flex-col gap-32 justify-center items-center min-h-screen text-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl text-fuchsia-300">Semester začína o</h1>
                <div className="flex items-center gap-8">
                    <h2 className="text-3xl"><span className="text-sky-500">{daysUntilNewSemester}</span> dní</h2>
                    <img src={koteseni} alt="Koteseni" className="animate-spin" width="50px" />
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl text-fuchsia-300">Tento týždeň je</h1>
                <h2 className="text-3xl"><span className="text-sky-500">{weekNo}.</span> v roku</h2>
                <h2 className={`text-3xl ${weekIsEven ? "text-green-400" : "text-yellow-400"}`}>{weekIsEven ? "sudý/párny" : "lichý/nepárny"}</h2>
            </div>
        </div>
    );
}

export default App;
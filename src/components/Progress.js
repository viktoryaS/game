export default function Progress({index, numQuestions, points, maxPossiblePoints, answer}) {
    return (
        <header className="progress">
            {/* индикатор линия */}
            <progress max={numQuestions}
            // преобразовать логическое значение в число,которое будет получино в результате проверки
             value={index + Number(answer !== null)} />
            <p>
                Question <strong>{index + 1}</strong> / {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}
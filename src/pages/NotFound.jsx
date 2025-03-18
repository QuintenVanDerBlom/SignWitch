function NotFound() {
    return (
        <>
            <h1>Hey vriend, deze pagina bestaat niet</h1>
            <button onClick={() => window.history.back()} className="text-blue-500 underline">
                Breng me terug naar waar ik was
            </button>
        </>
    );
}

export default NotFound;

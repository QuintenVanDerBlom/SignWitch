import ReactPlayer from "react-player";
import React from "react";

function NotFound() {
    const videoUrl = `public/signs/komt Goed.mp4`;
    return (
        <>
            <div className="flex flex-col text-center items-center p-10">
                <div className="">
                    <div className="w-[640px] h-[360px] rounded-lg shadow-lg overflow-hidden">
                        <ReactPlayer
                            url={videoUrl}
                            controls
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            <h1 className="text-2xl p-10 w-2/3">Het ziet ernaar uit dat de pagina die je hebt bezocht niet bestaat. Klik op een knop in de navigatiebalk of de onderstaande knop om verder te leren.</h1>
            <button onClick={() => window.history.back()} className="text-blue-500 underline text-3xl">
                Breng me terug naar waar ik was
            </button>
            </div>
        </>
    );
}

export default NotFound;
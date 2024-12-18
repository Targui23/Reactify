import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Button } from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

    const [currentIndex, setCurrentindex] = useState(1);
    const [hasClicked, SethasClicked] = useState(false);
    const [isLoading, setIsLoding] = useState(true);
    const [lodedVideos, setLodedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoref = useRef(null);
    const currentVideoRef = useRef(null);

    const handleVideoLoaded = () => {
        setLodedVideos((prev) => prev + 1);
    };

    const upComingVideo = (currentIndex % totalVideos) + 1;

    const handeleMiniVdClick = () => {
        SethasClicked(true);
        setCurrentindex(upComingVideo);
    };


    useEffect(() =>{
        if(lodedVideos ===totalVideos -1){
            setIsLoding(false)
        }
    })

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            console.log("Inizio animazione GSAP");
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoref.current.play(),
            });

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath:  'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',
        })

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0  0 ',
            ease:'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start : 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })

    const getVideosrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 overflow-hidden cursor-pointer">
                        <div onClick={handeleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={nextVideoref}
                                preload="auto"
                                src={getVideosrc(upComingVideo)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoaded}
                            />
                        </div>
                    </div>
                    {/* Video successivo */}
                    <video
                        ref={nextVideoref}
                        preload="auto"
                        src={getVideosrc(currentIndex)}
                        autoPlay
                        muted
                        loop
                        id="next-video"
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoaded}
                    />
                    {/* Video corrente */}
                    <video
                        ref={currentVideoRef}
                        src={getVideosrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        muted
                        loop
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoaded}
                    />
                </div>
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br />
                            Unleash the Play Economy
                        </p>

                        <Button
                            id="watch-trailer"
                            title="Watch Trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>a</b>ming
            </h1>
        </div>
    );
};

export default Hero;

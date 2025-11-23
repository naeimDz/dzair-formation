import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import videoBanner from '../assets/videos/video_banner.mp4';

const HeroParallax: React.FC = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-auto md:h-screen w-full overflow-hidden bg-black pt-24 md:pt-0">
            {/* Parallax Video Background */}
            <motion.div
                style={isMobile ? {} : { y, opacity }}
                className="relative w-full h-auto md:absolute md:inset-0 md:h-full"
            >


                {/* Overlay: 60% opacity + 3px blur */}
                <div className="absolute inset-0 bg-black/20 z-10" />

                {/* Main Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative z-0 w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover saturate-50" // Low saturation
                >
                    <source src={videoBanner} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>
            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-0">
                {/* Scroll Indicator */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2"
                    >
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default HeroParallax;

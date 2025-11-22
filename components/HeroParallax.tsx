import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import videoBanner from '../assets/videos/video_banner.mp4';

const HeroParallax: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Parallax Video Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 w-full h-full"
            >
                {/* Mobile Blurred Background (Fills black space) */}
                <div className="absolute inset-0 md:hidden overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover blur-xl scale-110 opacity-50"
                    >
                        <source src={videoBanner} type="video/mp4" />
                    </video>
                </div>

                {/* Overlay: 60% opacity + 3px blur */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10" />

                {/* Main Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative z-0 w-full h-full object-contain md:object-cover saturate-50" // Low saturation
                >
                    <source src={videoBanner} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-0">


                {/* Scroll Indicator */}
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
            </div>
        </div>
    );
};

export default HeroParallax;

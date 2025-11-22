import React, { useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Play, ShieldCheck, Zap } from 'lucide-react';

const HeroVideo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex flex-col lg:flex-row">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Left Panel - 3D Video Card */}
            <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen flex items-center justify-center p-6 lg:p-12 z-10 [perspective:1000px]">
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    initial={{ scale: 0.8, opacity: 0, x: -50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] shadow-2xl group"
                >
                    {/* Card Frame/Border */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500/30 via-white/10 to-yellow-500/30 rounded-[2.2rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Main Card Content */}
                    <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-inner [transform:translateZ(0)]">
                        {/* Video */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full opacity-80 group-hover:scale-110 transition-transform duration-700"
                        >
                            <source src="../assets/videos/video_banner.mp4" type="video/mp4" />
                        </video>

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                        {/* Floating Badges (3D Elements) */}
                        <motion.div
                            style={{ transform: "translateZ(50px)" }}
                            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg"
                        >
                            <ShieldCheck className="text-yellow-400 w-8 h-8" />
                        </motion.div>

                        <motion.div
                            style={{ transform: "translateZ(30px)" }}
                            className="absolute bottom-8 left-6 bg-black/60 backdrop-blur-md border border-yellow-500/30 px-4 py-2 rounded-xl flex items-center gap-2"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white text-sm font-medium">Live Simulation</span>
                        </motion.div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Play className="text-white w-8 h-8 fill-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Panel - Content */}
            <div className="relative w-full lg:w-[55%] h-auto lg:h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 lg:py-0 z-20">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-right"
                >
                    {/* Top Tag */}
                    <div className="flex items-center justify-end gap-3 mb-8">
                        <span className="text-yellow-500 font-bold tracking-wide text-sm">مستقبل التكوين المهني</span>
                        <div className="h-px w-12 bg-yellow-500" />
                    </div>

                    {/* Giant Typography */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-8 tracking-tight" dir="rtl">
                        تكوين <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">احترافي</span> <br />
                        في سياقة وتشغيل <br />
                        <span className="text-slate-600">الآلات الثقيلة</span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-10 border-r-2 border-slate-700 pr-6 ml-auto" dir="rtl">
                        المدرسة الجزائرية الأولى المتخصصة في التكوين بالمحاكاة للآلات الثقيلة.
                        تدريب آمن، تكنولوجيا متطورة، مع التدريب الميداني، وشهادة معترف بها.
                    </p>

                    {/* Industrial Buttons */}
                    <div className="flex flex-wrap justify-end gap-6">
                        <button className="group relative px-8 py-4 bg-yellow-500 text-black font-bold text-lg tracking-wider overflow-hidden rounded-sm hover:bg-yellow-400 transition-colors">
                            <span className="relative flex items-center gap-2">
                                <Zap className="w-5 h-5" /> سجل الآن
                            </span>
                        </button>

                        <button className="group px-8 py-4 bg-transparent border border-slate-600 text-white font-bold text-lg tracking-wider hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-300 rounded-sm">
                            اكتشف التخصصات
                        </button>
                    </div>

                    {/* Stats/Features Footer */}
                    <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-800 pt-8" dir="rtl">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">98%</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">نسبة التوظيف</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">50+</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">جهاز محاكاة</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">ISO</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">شهادة معتمدة</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroVideo;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    BrainCircuit,
    Gamepad2,
    Construction,
    ChevronDown,
    MessageCircle,
    Play
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { machines } from '../constants';

const MachineDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const machine = machines.find(m => m.id === id);

    useEffect(() => {
        if (machine) {
            document.title = machine.seoTitle || `تدريب ${machine.name} | Dzair Formation`;
            // In a real app with Helmet, we would set meta description here
        }
    }, [machine]);

    if (!machine) {
        return (
            <div className="min-h-screen bg-industrial-dark flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl font-bold mb-4">الآلة غير موجودة</h2>
                <button onClick={() => navigate('/machines')} className="text-industrial-yellow hover:underline">
                    العودة للكتالوغ
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-industrial-dark text-white font-sans" dir="rtl">
            {/* 1) Hero Section */}
            <section className="relative h-screen flex flex-col">
                {/* Split Background */}
                <div className="absolute inset-0 flex flex-col md:flex-row z-0">
                    {/* Simulator Side (Left on desktop, Top on mobile) */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply z-10" />
                        <img
                            src={machine.imageUrl}
                            alt="Simulator View"
                            className="w-full h-full object-cover filter blur-sm scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="bg-black/50 p-4  border border-white/20 backdrop-blur-md">
                                <Gamepad2 size={48} className="text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Field Side (Right on desktop, Bottom on mobile) */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-900/40 mix-blend-multiply z-10" />
                        <img
                            src={machine.parallaxAsset || machine.imageUrl}
                            alt="Field View"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="bg-black/50 p-4  border border-white/20 backdrop-blur-md">
                                <Construction size={48} className="text-industrial-yellow" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-t from-industrial-dark via-industrial-dark/80 to-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link
                            to="/machines"
                            className="absolute top-24 right-8 md:top-8 flex items-center text-gray-300 hover:text-white transition-colors z-50"
                        >
                            <ArrowRight className="ml-2" /> العودة للكتالوغ
                        </Link>

                        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-4 py-2  mb-6 backdrop-blur-md mt-16 md:mt-0">
                            <BrainCircuit size={18} className="text-blue-400" />
                            <span className="text-blue-200 text-sm font-bold">منهج تدريبي معزز بـ AI</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                            تعلّم قيادة <span className="text-industrial-yellow">{machine.name}</span>
                            <br />
                            <span className="text-2xl md:text-4xl text-white/80 font-bold block mt-4">
                                بمزيج من المحاكاة والميدان
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            {machine.longDescription || machine.shortDescription}
                        </p>

                        <button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="bg-industrial-yellow text-black text-lg font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20">
                            ابدأ رحلتك في قيادة {machine.name}
                        </button>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* 2) Description (USP) */}
            <section className="py-20 px-6 bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">ما الذي ستتقنه؟</h2>
                        <p className="text-gray-400 text-lg">منهج مصمّم مع خبراء ميدان + خبراء محاكاة</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(machine.skills || [
                            "مهارات التحكم الأساسية والمتقدمة",
                            "قراءة البيئة الميدانية",
                            "المناورات الصعبة في مساحة ضيقة",
                            "قواعد الأمان المهنية",
                            "تشغيل الآلة في ظروف مختلفة",
                            "أخطاء المتدربين الجدد وكيف تتجنبها"
                        ]).map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 p-6 bg-stone-800/50 rounded-2xl border border-stone-700 hover:border-industrial-yellow/30 transition-colors"
                            >
                                <div className="bg-industrial-yellow/10 p-3 text-industrial-yellow">
                                    <CheckCircle2 size={24} />
                                </div>
                                <p className="text-lg font-medium text-gray-200">{skill}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3) Simulation Section */}
            <section className="py-20 px-6 bg-industrial-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 blur-[120px]  pointer-events-none" />

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
                        <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl">
                            <img
                                src={machine.imageUrl}
                                alt="Simulation Interface"
                                className="w-full object-cover filter contrast-125 brightness-90"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md  flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                                    <Play size={32} className="text-white fill-white" />
                                </div>
                            </div>

                            {/* AI Feedback Overlay Mockup */}
                            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-red-500/50 p-4 rounded-xl max-w-xs">
                                <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                                    <BrainCircuit size={16} />
                                    <span>تنبيه AI</span>
                                </div>
                                <p className="text-white text-sm">انحراف 12° — الميل غير آمن. حاول تعديل المسار.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block px-4 py-1  bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-bold mb-6">
                            سلاحك الأول
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">المحاكاة: <span className="text-blue-500">تعلّم بلا خطر</span></h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            المحاكاة توفر لك 60% من الخبرة قبل لمس الآلة الحقيقية. تتدرب على نفس سيناريوهات الامتحان وتواجه ظروفاً صعبة في بيئة آمنة تماماً.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "تتدرب على نفس سيناريوهات الامتحان",
                                "AI يعطيك Feedback مباشر لتصحيح الأخطاء",
                                "تتبع دقيق للتقدم (Progress Tracking)",
                                "تكرار المحاولات بلا حدود حتى الإتقان"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-2 h-2  bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 4) Field Section */}
            <section className="py-20 px-6 bg-stone-950">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1">
                        <div className="inline-block px-4 py-1  bg-yellow-900/30 border border-yellow-500/30 text-yellow-500 text-sm font-bold mb-6">
                            الواقع الميداني
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">التطبيق الميداني</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            بعد ما تتقن الأساسيات في المحاكاة، تنتقل للآلة الحقيقية باش ترسّخ مهاراتك. تدريب عملي مكثف يضعك في قلب الحدث.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: "توجيه مباشر", desc: "مدربون خبراء يرافقونك في كل حركة." },
                                { title: "آلات حقيقية", desc: "نفس المعدات التي ستجدها في كبرى الشركات." },
                                { title: "مجموعات صغيرة", desc: "عدد محدود للمتدربين لضمان وقت قيادة أطول." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="bg-stone-800 p-3 h-fit text-industrial-yellow">
                                        <Construction size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <p className="text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 md:order-2 relative">
                        <div className="absolute -inset-4 bg-industrial-yellow/20 rounded-3xl blur-xl" />
                        <img
                            src={machine.parallaxAsset || machine.imageUrl}
                            alt="Field Training"
                            className="relative rounded-2xl shadow-2xl border border-stone-800 w-full"
                        />
                    </div>
                </div>
            </section>

            {/* 5) AI Insights */}
            <section className="py-20 px-6 bg-gradient-to-b from-industrial-dark to-stone-900 border-y border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <BrainCircuit size={64} className="text-purple-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        ذكاء اصطناعي يراقب تقدمك... <br />
                        <span className="text-purple-400">ويوجهك كأنك تتدرب مع مدرب ثاني</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12">
                        هذه الميزة ترفع القيمة وتضمن لك تعليماً عصرياً ودقيقاً. الـ AI لا ينام ولا يغفل عن أي تفصيل.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "رصد الأخطاء", val: "فوري" },
                            { label: "تحليل الأداء", val: "دقيق" },
                            { label: "سيناريوهات", val: "مخصصة" },
                            { label: "Score", val: "يومي" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <div className="text-2xl font-bold text-white mb-2">{stat.val}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6) Gallery Section */}
            {machine.gallery && machine.gallery.length > 0 && (
                <section className="py-20 px-6 bg-stone-950">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold mb-10 border-r-4 border-industrial-yellow pr-4">معرض الصور</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
                            {machine.gallery.map((img, index) => (
                                <div key={index} className={`relative rounded-2xl overflow-hidden group ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}>
                                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`${machine.name} ${index + 1}`} />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7) FAQ */}
            <section className="py-20 px-6 bg-stone-900">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center">أسئلة شائعة حول الدورة</h2>
                    <div className="space-y-4">
                        {[
                            { q: "هل لازم عندي خبرة سابقة؟", a: "لا، البرنامج مصمم للمبتدئين ويبدأ معك من الصفر." },
                            { q: "كم مدة التدريب؟", a: machine.durationDays ? `${machine.durationDays} أيام مكثفة.` : "تتراوح بين 3 أسابيع (مكثف) إلى 3 أشهر حسب مستواك وتفرغك." },
                            { q: "هل الشهادة معترف بها؟", a: "نعم، شهادة معتمدة من الدولة وتؤهلك للعمل في الشركات الوطنية والخاصة." },
                            { q: "هل التدريب يشمل المحاكاة فقط؟", a: "لا، المحاكاة هي مرحلة أولى فقط. التدريب الميداني على الآلات الحقيقية جزء أساسي." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                                <h3 className="font-bold text-white text-lg mb-2">{faq.q}</h3>
                                <p className="text-gray-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8) Final CTA */}
            <section id="register" className="py-24 px-6 bg-industrial-yellow text-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-6">جاهز تتعلم قيادة {machine.name}؟</h2>
                    <p className="text-xl font-medium mb-10 opacity-80">
                        أرسل رقمك وسيتواصل فريق التسجيل معك خلال دقائق للإجابة على كل استفساراتك.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/contact" className="bg-black text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors shadow-xl">
                            سجّل اهتمامك الآن
                        </Link>
                        <a href="https://wa.me/213770526454" className="bg-green-600 text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-xl">
                            <MessageCircle size={24} />
                            تواصل عبر واتساب
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MachineDetail;

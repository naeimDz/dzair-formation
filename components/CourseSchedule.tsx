import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Building2, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { COURSES } from '../constants';
import { Reveal } from './Reveal';

const CourseSchedule: React.FC = () => {
    const navigate = useNavigate();
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'open':
                return { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', text: 'التسجيل مفتوح', icon: CheckCircle2 };
            case 'closing_soon':
                return { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', text: 'يغلق قريباً', icon: AlertCircle };
            case 'full':
                return { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', text: 'مكتمل', icon: XCircle };
            default:
                return { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20', text: 'غير متاح', icon: AlertCircle };
        }
    };

    return (
        <div className="min-h-screen bg-industrial-dark text-white pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-400 hover:text-yellow-500 transition-colors mb-6 group"
                    >
                        <ArrowRight className="group-hover:-translate-x-1 transition-transform" />
                        <span>العودة للرئيسية</span>
                    </button>

                    <Reveal>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">رزنامة <span className="text-yellow-500">الدورات</span></h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            تعرف على مواعيد وأماكن دوراتنا القادمة. المقاعد محدودة لضمان جودة التكوين.
                        </p>
                    </Reveal>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.map((course, index) => {
                        const status = getStatusConfig(course.status);
                        const StatusIcon = status.icon;

                        return (
                            <Reveal key={course.id} delay={index * 100}>
                                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-yellow-500/50 transition-all hover:-translate-y-1 group relative overflow-hidden">
                                    {/* Status Badge */}
                                    <div className={`absolute top-4 left-4 px-3 py-1  text-xs font-bold flex items-center gap-1.5 ${status.bg} ${status.color} ${status.border} border`}>
                                        <StatusIcon size={14} />
                                        {status.text}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-6 mt-2 group-hover:text-yellow-500 transition-colors">{course.title}</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-yellow-500">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">تاريخ البداية</p>
                                                <p className="font-bold">{course.startDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-blue-500">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">الولاية</p>
                                                <p className="font-bold">{course.wilaya}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-purple-500">
                                                <Building2 size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">الأكاديمية</p>
                                                <p className="font-bold">{course.academyName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-emerald-500">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">المدة</p>
                                                <p className="font-bold">{course.duration}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        disabled={course.status === 'full'}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                                            ${course.status === 'full'
                                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                : 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20'
                                            }`}
                                    >
                                        {course.status === 'full' ? 'اكتمل العدد' : 'احجز مقعدك الآن'}
                                    </button>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CourseSchedule;

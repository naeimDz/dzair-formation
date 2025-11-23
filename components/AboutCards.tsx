import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle } from 'lucide-react';

const AboutCards: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    mobile: { opacity: 1, y: 0 }
  };

  const secondCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    mobile: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-24 bg-concrete text-industrial-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">أكثر من مجرد تدريب</h2>
          <div className="h-1 w-20 bg-industrial-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Program Card */}
          <motion.div
            initial={isMobile ? "mobile" : "hidden"}
            whileInView={isMobile ? "mobile" : "visible"}
            variants={cardVariants}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-xl border-r-4 border-industrial-yellow hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-700">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-bold">البرنامج والتدريب</h3>
            </div>
            <ul className="space-y-4 text-lg text-gray-600">
              {[
                "مسارات تعليمية متدرجة (مبتدئ - محترف)",
                "توازن 30% نظري و 70% تطبيقي ومحاكاة",
                "اختبارات أداء دورية",
                "شهادات معتمدة تفتح أبواب العمل"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-industrial-yellow shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features Card */}
          <motion.div
            initial={isMobile ? "mobile" : "hidden"}
            whileInView={isMobile ? "mobile" : "visible"}
            variants={secondCardVariants}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: isMobile ? 0 : 0.2 }}
            className="bg-industrial-dark text-white p-8 rounded-2xl shadow-xl border-r-4 border-gray-600 hover:shadow-2xl transition-shadow relative overflow-hidden"
          >
            {/* Decorative background icon */}
            <Award className="absolute -bottom-10 -left-10 text-gray-800 opacity-20 w-64 h-64" />

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 bg-gray-700 rounded-lg text-gray-200">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-bold">لماذا نحن؟</h3>
            </div>
            <ul className="space-y-4 text-lg text-gray-300 relative z-10">
              {[
                "فريق مدربين بخبرة ميدانية تزيد عن 10 سنوات",
                "بيداغوجيا تركز على حل المشكلات",
                "مطابقة تامة لمعايير السلامة الدولية HSE",
                "شراكات مع مؤسسات التوظيف"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-gray-500 shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCards;
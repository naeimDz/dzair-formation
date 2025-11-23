import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SECTORS } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { Sector, Machine } from '../types';

// --- Sub-Components for Different Layouts ---

// 1. Horizontal Card (Public Works) -
const HorizontalCard: React.FC<{ machine: Machine; index: number; onClick: () => void }> = ({ machine, index, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-3xl overflow-hidden shadow-2xl md:max-w-4xl mx-auto transform transition-transform hover:scale-[1.01] duration-300 border border-gray-100 cursor-pointer">
    <div className="grid md:grid-cols-2">
      <div className="h-64 md:h-auto relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
        <img
          src={machine.imageUrl}
          alt={machine.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 bg-industrial-yellow text-black text-xs font-bold px-3 py-1  shadow-md">
          محاكاة دقيقة
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-center relative">
        <div className="absolute bottom-4 left-4 text-8xl font-black text-gray-100 -z-0 select-none pointer-events-none opacity-50">
          0{index + 1}
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{machine.name}</h3>
          <div className="h-1 w-12 bg-industrial-yellow mb-4"></div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {machine.shortDescription}
          </p>
          {machine.highlight && (
            <div className="bg-gray-50 p-4 rounded-xl border-r-4 border-gray-400">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span>💡</span> {machine.highlight}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// 2. Vertical Card (Mining) - Imposing, Hero-style for Giant Machines
const VerticalCard: React.FC<{ machine: Machine; index: number; onClick: () => void }> = ({ machine, index, onClick }) => (
  <div onClick={onClick} className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl md:max-w-2xl mx-auto border border-stone-800 group cursor-pointer">
    <div className="h-80 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent z-10"></div>
      <img
        src={machine.imageUrl}
        alt={machine.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
      />
      <div className="absolute bottom-4 right-4 z-20">
        <h3 className="text-3xl font-black text-white mb-1">{machine.name}</h3>
        <div className="h-1 w-16 bg-industrial-yellow"></div>
      </div>
      <div className="absolute top-4 left-4 z-20 text-6xl font-black text-white/10">
        0{index + 1}
      </div>
    </div>
    <div className="p-8 relative">
      <p className="text-stone-400 mb-6 leading-relaxed text-lg">
        {machine.shortDescription}
      </p>
      {machine.highlight && (
        <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
          <p className="text-sm font-semibold text-industrial-yellow flex items-center gap-2">
            <span>⚠️</span> {machine.highlight}
          </p>
        </div>
      )}
    </div>
  </div>
);

// 3. Compact Card (Logistics) - Image Overlay Style
const CompactCard: React.FC<{ machine: Machine; index: number; onClick: () => void }> = ({ machine, index, onClick }) => (
  <div onClick={onClick} className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={machine.imageUrl}
        alt={machine.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
    </div>

    {/* Content */}
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-2xl font-bold text-white leading-tight">{machine.name}</h3>
          <span className="text-4xl font-black text-white/10">0{index + 1}</span>
        </div>

        <div className="h-1 w-0 group-hover:w-12 bg-blue-500 mb-3 transition-all duration-300"></div>

        <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
          {machine.shortDescription}
        </p>

        {machine.highlight && (
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-blue-400 text-xs font-bold">{machine.highlight}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);


interface SectorItemProps {
  sector: Sector;
  onNavigate: (page: string) => void;
}

const SectorItem: React.FC<SectorItemProps> = ({ sector, onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Determine Layout Strategy
  const isMining = sector.id === 'mining';
  const isLogistics = sector.id === 'logistics_port';
  const isPublicWorks = sector.id === 'public-works';

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row border-b border-gray-800"
    >
      {/* Background Wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-[140%] -top-[20%]"
        >
          <div className="absolute inset-0 bg-industrial-dark/90 z-10" />
          <div className={`absolute inset-0 mix-blend-overlay opacity-20 ${sector.color} z-20`}></div>
          <img
            src={sector.backgroundImage}
            alt={sector.title}
            className="w-full h-full object-cover grayscale hidden md:block"
          />
        </motion.div>
      </div>

      {/* Left Panel: Title & Description */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-8 md:p-12 flex flex-col justify-center relative z-10 md:sticky md:top-0 md:h-screen border-b md:border-b-0 md:border-l border-gray-800/30 bg-industrial-dark/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${sector.color} text-white shadow-lg`}>
          <sector.icon size={32} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{sector.title}</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {sector.description}
        </p>
        <div
          onClick={() => onNavigate('machines')}
          className="flex items-center text-industrial-yellow font-bold group cursor-pointer"
        >
          <span className="ml-2 group-hover:underline">تصفح الآلات</span>
          <ArrowLeft size={20} className="animate-bounce-x" />
        </div>
      </div>

      {/* Right Panel: Machines */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 md:p-12 flex flex-col z-10 relative">
        <div className="hidden md:block h-[10vh]"></div>

        {/* Layout Logic */}
        {isLogistics ? (
          // Logistics: Grid Layout (Side by Side)
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sector.machines.map((machine, index) => (
              <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <CompactCard machine={machine} index={index} onClick={() => onNavigate('machines')} />
              </motion.div>
            ))}
          </div>
        ) : (
          // Public Works & Mining: Stacked (Sticky) Layout
          sector.machines.map((machine, index) => (
            <div
              key={machine.id}
              className={`relative mb-12 last:mb-0 md:sticky md:top-32 md:mb-[40vh] md:last:mb-12`}
              style={{ zIndex: index + 1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {isMining ? (
                  <VerticalCard machine={machine} index={index} onClick={() => onNavigate('machines')} />
                ) : (
                  <HorizontalCard machine={machine} index={index} onClick={() => onNavigate('machines')} />
                )}
              </motion.div>
            </div>
          ))
        )}

        <div className="h-12"></div>
      </div>
    </section>
  );
};

interface SectorsProps {
  onNavigate: (page: string) => void;
}

const Sectors: React.FC<SectorsProps> = ({ onNavigate }) => {
  return (
    <>
      <section className="py-24 px-6 bg-yellow-500 text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">مستقبلك المهني يبدأ هنا</h2>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto opacity-90">
            لا تضيع الفرصة. المقاعد محدودة في كل دفعة لضمان جودة التدريب العملي. انضم إلى أكثر من مئات المتدربين تخرجوا من مدرستنا.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate?.('schedule')}
              className="px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl text-lg shadow-xl transition-transform transform hover:scale-105"
            >
              مواعيد الدورات
            </button>
            <button
              onClick={() => onNavigate?.('contact')}
              className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-lg shadow-xl transition-transform transform hover:scale-105"
            >
              سجل اللآن
            </button>
          </div>
        </div>
      </section>
      <div className="bg-industrial-dark">
        <div className="py-20 px-4 text-center relative z-10">
          <div className="inline-block px-4 py-1  border border-yellow-500/30 text-yellow-500 bg-yellow-500/10 text-sm font-bold mb-4">
            برامج التدريب
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">اختر تخصصك المستقبلي</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            تريد أن تصبح مشغّل حفّارة، لودر، أو شاحنة نقل؟
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mt-2">
            برامجنا العملية تغطي كل الآلات في قطاعات البناء، النقل، المناجم، والموانئ.
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mt-4">
            يضم معهدنا أسطولاً كاملاً من الآلات الحديثة لضمان تدريب عملي واقعي ومطابق لظروف العمل الحقيقية.
          </p>
        </div>
        {SECTORS.map((sector) => (
          <SectorItem key={sector.id} sector={sector} onNavigate={onNavigate} />
        ))}
      </div>
    </>
  );
};

export default Sectors;
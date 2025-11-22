import React from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useRef } from 'react';
import { STATS } from '../constants';

const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView && ref.current) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      if (isNaN(numericValue)) return;

      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString();
          }
        }
      });

      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{value.replace(/[0-9]/g, '0')}</span>;
};

const Stats: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="py-20 bg-industrial-dark relative border-b border-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-industrial-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight max-w-5xl mb-6 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {/* Split text for animation */}
              {"تكوين احترافي في".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
              >
                سياقة وتشغيل
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              >
                الآلات الثقيلة
              </motion.span>
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } }
              }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
            >
              المدرسة الجزائرية الأولى المتخصصة في التكوين بالمحاكاة للآلات الثقيلة.
              <br className="hidden md:block" />
              تدريب آمن، تكنولوجيا متطورة، مع التدريب الميداني، وشهادة معترف بها.
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, index) => (
            <div key={stat.id} className="flex flex-col items-center group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="relative mb-4"
              >
                <div className="text-5xl md:text-6xl font-bold text-white flex items-baseline justify-center">
                  <Counter value={stat.value} />
                  <span className="text-industrial-yellow text-3xl ml-1">{stat.suffix}</span>
                </div>
                {/* Decorative underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 1 }}
                  className="h-1 bg-gradient-to-r from-transparent via-industrial-yellow to-transparent mt-2 mx-auto opacity-50"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                className="text-gray-400 text-lg font-medium group-hover:text-white transition-colors"
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
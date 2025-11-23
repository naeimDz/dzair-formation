import React from 'react';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { machines } from '../constants';
import { Machine } from '../types';
import { Link } from 'react-router-dom';

const MachinesCatalog: React.FC = () => {
    // Use the machines constant directly
    const allMachines = machines;

    return (
        <div className="min-h-screen bg-industrial-dark text-white pt-20 pb-20 px-4 md:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <Link
                    to="/"
                    className="flex items-center text-gray-400 hover:text-industrial-yellow transition-colors mb-8 group w-fit"
                >
                    <ArrowRight className="ml-2 group-hover:-translate-x-1 transition-transform" size={20} />
                    <span>العودة للرئيسية</span>
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-800 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
                            كتالوغ <span className="text-industrial-yellow">الآلات</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            تصفح أسطولنا المتكامل من المعدات الثقيلة. اختر الآلة التي تناسب طموحك المهني وابدأ رحلة الاحتراف.
                        </p>
                    </div>

                    {/* Search Placeholder - Functional in future */}
                    <div className="relative w-full md:w-auto">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="ابحث عن آلة..."
                            className="w-full md:w-64 bg-gray-900/50 border border-gray-700 rounded-xl py-3 pr-10 pl-4 text-gray-300 focus:outline-none focus:border-industrial-yellow focus:ring-1 focus:ring-industrial-yellow transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allMachines.map((machine, index) => (
                    <MachineCard
                        key={machine.id}
                        machine={machine}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

const MachineCard: React.FC<{
    machine: Machine;
    index: number;
}> = ({ machine, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-industrial-yellow/50 transition-all duration-300 hover:shadow-2xl hover:shadow-industrial-yellow/10 flex flex-col"
        >
            <Link to={`/machines/${machine.id}`} className="flex-1 flex flex-col">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-stone-950">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent z-10 opacity-60" />
                    <img
                        src={machine.imageUrl}
                        alt={machine.name}
                        className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {machine.highlight && (
                        <div className="absolute top-4 right-4 z-20 bg-industrial-yellow/90 text-black text-xs font-bold px-3 py-1  backdrop-blur-sm">
                            {machine.highlight}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-industrial-yellow transition-colors">
                        {machine.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                        {machine.shortDescription}
                    </p>

                    <div
                        className="w-full py-3 rounded-xl bg-stone-800 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-industrial-yellow group-hover:text-black transition-all duration-300"
                    >
                        <span>اكتشف المزيد</span>
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default MachinesCatalog;

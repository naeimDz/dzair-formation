import React from 'react';
import { MapPin, Phone, Mail, Send, Check } from 'lucide-react';
import { SECTORS, WILAYAS } from '../constants';
import { useState } from 'react';

const Contact: React.FC = () => {
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);

  // Flatten all machines from sectors
  const allMachines = SECTORS.flatMap(sector => sector.machines);

  const toggleMachine = (machineId: string) => {
    setSelectedMachines(prev =>
      prev.includes(machineId)
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  return (
    <>
      {/* CTA Section */}

      <footer id="contact_footer" className="bg-industrial-dark text-white pt-24 pb-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-industrial-yellow">
                ابدأ مسارك المهني
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
                جاهز لتطوير مهاراتك؟ تواصل معنا لحجز مقعدك في الدورة القادمة أو لطلب عرض أسعار لشركتك.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-industrial-yellow group-hover:bg-industrial-yellow group-hover:text-black transition-colors">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">اتصل بنا</p>
                    <p className="text-xl font-bold text-white dir-rtl text-right">0770526454</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-industrial-yellow group-hover:bg-industrial-yellow group-hover:text-black transition-colors">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">راسلنا</p>
                    <p className="text-xl font-bold text-white">Contact@dzair-formation.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-industrial-yellow group-hover:bg-industrial-yellow group-hover:text-black transition-colors">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">العنوان</p>
                    <p className="text-xl font-bold text-white">الجزائر</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-8 border-t border-gray-800/50">
                  <p className="text-sm text-gray-500 mb-4">تابعنا على منصات التواصل</p>
                  <div className="flex gap-4">
                    {/* Facebook */}
                    <a href="https://web.facebook.com/forsa.tech.formations" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/213770526454" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-all hover:-translate-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                    </a>

                    {/* TikTok */}
                    <a href="https://www.tiktok.com/@dzair.formations" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#000000] hover:text-white transition-all hover:-translate-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2"><circle cx="8" cy="18" r="4" /><path d="M12 18V2l7 4" /></svg>
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/dzair.formations" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all hover:-translate-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-yellow/10 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

              <h3 className="text-2xl font-bold mb-8 relative z-10">تواصل معنا</h3>
              <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-industrial-yellow focus:border-transparent outline-none transition-all" placeholder="الاسم الكامل" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">الهاتف</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-industrial-yellow focus:border-transparent outline-none transition-all" placeholder="0550..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نوع الطلب</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-industrial-yellow focus:border-transparent outline-none transition-all">
                    <option>تسجيل كمتدرب</option>
                    <option>عرض للشركات</option>
                    <option>استفسار عام</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الولاية
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-industrial-yellow focus:border-transparent outline-none transition-all">
                    <option value="">اختر الولاية</option>
                    {WILAYAS.map((wilaya, index) => (
                      <option key={index} value={wilaya}>
                        {index + 1} - {wilaya}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    الآلات التي ترغب في التدرب عليها
                    <span className="text-xs font-normal text-gray-500 mr-2">(يمكنك اختيار أكثر من آلة)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {allMachines.map((machine) => (
                      <button
                        key={machine.id}
                        type="button"
                        onClick={() => toggleMachine(machine.id)}
                        className={`
                          relative flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 group
                          ${selectedMachines.includes(machine.id)
                            ? 'border-industrial-yellow bg-industrial-yellow/10 text-slate-900'
                            : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300'
                          }
                        `}
                      >
                        <span className="text-sm font-bold text-center">{machine.name}</span>
                        {selectedMachines.includes(machine.id) && (
                          <div className="absolute -top-2 -right-2 bg-industrial-yellow text-black  p-0.5 shadow-sm">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedMachines.length === 0 && (
                    <p className="text-xs text-red-400 mt-2 mr-1">يرجى اختيار آلة واحدة على الأقل</p>
                  )}
                </div>

                <button className="w-full bg-industrial-dark text-white font-bold py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span>إرسال الرسالة</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Dzair formation & services. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
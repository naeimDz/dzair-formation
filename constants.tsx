import {
  HardHat,
  Truck,
  Anchor,
  Warehouse,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Users,
  Award,
  Cog
} from 'lucide-react';
import { Sector, Stat, HSEPoint, FAQItem, Benefits } from './types';

import PublicWorksBg from './assets/images/parallax/public-works.jpg';
import MiningBg from './assets/images/parallax/mining.jpg';
import LogisticsBg from './assets/images/parallax/logistics.webp';

import TrackedExcavatorImg from './assets/images/machines-simulator/tracked-excavator.png';
import WheelLoaderImg from './assets/images/machines-simulator/wheel_loader.png';
import DumpTruckImg from './assets/images/machines-simulator/dump_truck.png';
import MiningDumperImg from './assets/images/machines-simulator/Mining dumper.png';
import MiningShovelImg from './assets/images/machines-simulator/mining_shovel.png';
import ForkliftImg from './assets/images/machines-simulator/forklift.png';
import EmptyContainerImg from './assets/images/machines-simulator/Empty_Container_Lift_Trucks.png';

export const STATS: Stat[] = [
  { id: 1, value: "1200", label: "ساعة تدريب سنوية", suffix: "+" },
  { id: 2, value: "98", label: "نسبة النجاح", suffix: "%" },
  { id: 3, value: "24", label: "آلة ومحاكي", suffix: "" },
  { id: 4, value: "85", label: "نسبة التوظيف بعد التخرج", suffix: "%" },
];

export const SECTORS: Sector[] = [
  {
    id: 'public-works',
    title: 'الأشغال العمومية والبناء',
    description: 'تدريب مكثف على آلات الحفر والرفع في بيئات عمرانية وصحراوية معقدة.',
    extra_description: 'مسار تكويني مخصص لمعدّات الأشغال العمومية:رافعات برجية، رافعات مجنزرة، حفّارات، جرافات… يتعلم المتدرّب التحكم، إجراءات الأمان، قراءة مخططات الرفع، والتعامل مع البيئات المعقدة داخل المحاكاة.',
    icon: HardHat,
    color: 'bg-yellow-600',
    backgroundImage: PublicWorksBg,
    machines: [
      {
        id: 'tracked-excavator',
        name: 'حفّارة مجنزرة',
        shortDescription: 'تكوين عملي على تشغيل الحفّارات المجنزرة في أعمال الحفر العميق والتفريغ داخل الورشات والبيئات الصعبة.',
        imageUrl: TrackedExcavatorImg,
        highlight: 'التحكم الدقيق في الذراع والدلو على تضاريس غير مستقرة',
        longDescription: 'برنامج تدريبي شامل يغطي تقنيات الحفر المتقدمة، بما في ذلك حفر الخنادق، تسوية الأراضي، والتعامل مع التربة الصخرية والطينية. يركز التدريب على التنسيق بين حركة الجنزير ودوران المقصورة لضمان أقصى كفاءة وأمان في مواقع العمل الضيقة.',
        simulatorType: 'Backhoe',
        audience: 'Intermediate'
      },
      {
        id: 'wheel-loader',
        name: 'لودر بعجلات',
        shortDescription: 'مناولة ونقل المواد الردمية بسرعة وكفاءة، مع التحكم في الرفع والتفريغ داخل المساحات الضيقة.',
        imageUrl: WheelLoaderImg,
        highlight: 'التوازن أثناء الرفع والمناورة تحت الحمولة',
        longDescription: 'تعلم فنون المناورة باللودر ذو العجلات، بدءاً من تحميل الشاحنات بدقة وسرعة، وصولاً إلى إدارة مخزون المواد الأولية في المحاجر ومواقع البناء. يشمل التدريب تقنيات القيادة الاقتصادية والحفاظ على توازن الآلة أثناء حمل الأوزان الثقيلة.',
        simulatorType: 'Other',
        audience: 'Intermediate'
      },
      {
        id: 'dump-truck',
        name: 'شاحنة نقل مفصلية',
        shortDescription: 'قيادة ومناورة الشاحنات المفصلية المخصّصة لنقل المواد الثقيلة عبر المسارات الوعرة.',
        imageUrl: DumpTruckImg,
        highlight: 'التحكم في المفصل المركزي على الأرض غير المستوية',
        longDescription: 'إتقان قيادة الشاحنات المفصلية في أصعب التضاريس. يركز هذا المسار على تقنيات القيادة الدفاعية، المناورة الخلفية الدقيقة للتفريغ، والتعامل مع المنحدرات الحادة والأسطح الزلقة لضمان وصول الحمولة بأمان.',
        simulatorType: 'Dumper',
        audience: 'Intermediate'
      }
    ]

  },
  {
    id: 'mining',
    title: 'المناجم والمحاجر',
    description: 'التعامل مع العمالقة. آلات ضخمة تتطلب دقة متناهية ووعي عالي بالسلامة.',
    extra_description: 'تدريب على معدات الحفر والاستخراج: حفّارات عملاقة، شاحنات التعدين، الكسارات… التركيز على: العمل في بيئات خطرة، تحليل المخاطر، التحكم في الآلات الثقيلة تحت ضغط، والملاحة داخل مواقع التعدين.',
    icon: Cog, // Using Cog as a generic industrial icon
    color: 'bg-stone-700',
    backgroundImage: MiningBg,
    machines: [
      {
        id: 'mining-dumper',
        name: 'شاحنة منجمية عملاقة',
        shortDescription: 'قيادة ومناورة شاحنات التفريغ الضخمة داخل المسارات الوعرة لمناجم الحفر المفتوح.',
        imageUrl: MiningDumperImg,
        highlight: 'إدارة الحمولة الثقيلة والرؤية المحدودة',
        longDescription: 'تجربة واقعية لقيادة عمالقة المناجم. يتدرب المتكون على إجراءات السلامة الصارمة في المناجم المفتوحة، التواصل اللاسلكي مع غرفة التحكم، والتعامل مع النقاط العمياء لهذه الشاحنات الضخمة أثناء الحركة والتفريغ.',
        simulatorType: 'Dumper',
        audience: 'Professional'
      },
      {
        id: 'mining-shovel',
        name: 'حفّارة منجمية (Shovel)',
        shortDescription: 'تشغيل حفّارات التعدين الكبيرة لاقتلاع ونقل الكتل الصخرية بكفاءة وأمان.',
        imageUrl: MiningShovelImg,
        highlight: 'التحكم في الذراع والدلو داخل بيئات ضيقة',
        longDescription: 'التخصص في تشغيل حفارات التعدين الكبيرة لاقتلاع ونقل الكتل الصخرية بكفاءة وأمان. يغطي التدريب استراتيجيات التحميل الفعال للشاحنات المنجمية، إدارة واجهة الحفر (Face Management)، وتقليل دورة التحميل لزيادة الإنتاجية.',
        simulatorType: 'FrontShovel',
        audience: 'Professional'
      },

    ]

  },
  {
    id: 'logistics_port',
    title: 'اللوجستيات والموانئ',
    description: 'السرعة والدقة في نقل الحاويات والبضائع داخل الموانئ والمخازن الكبرى.',
    extra_description: 'تكوين متخصص في معدات المناولة داخل الموانئ والمستودعات: من Reach Stackers ورافعات RTG/STS إلى الرافعات الشوكية وأنظمة التخزين العالي. يتدرّب المتكوّن على سيناريوهات تحميل وتفريغ الحاويات، تنظيم الحركة داخل الأرصفة والمخازن، إدارة المسارات، وتطبيق بروتوكولات الأمان لضمان انسيابية البضائع عبر كامل سلسلة التوريد.',
    icon: Anchor,
    color: 'bg-blue-800',
    backgroundImage: LogisticsBg,
    machines: [
      {
        id: 'forklift',
        name: 'الرافعة الشوكية',
        shortDescription: 'المناورة الدقيقة، التكديس العمودي الآمن، وإدارة المخزون.',
        imageUrl: ForkliftImg,
        highlight: 'تحدي المساحات الضيقة',
        longDescription: 'أساسيات وعمليات الرافعات الشوكية في المستودعات الحديثة. يتعلم المتدرب كيفية التعامل مع الأحمال غير المستقرة، التكديس في الرفوف العالية، والمناورة في الممرات الضيقة مع الحفاظ على سلامة البضائع والمشاة.',
        simulatorType: 'Other',
        audience: 'Beginner'
      },
      {
        id: 'empty-container',
        name: 'رافعة الحاويات الفارغة',
        shortDescription: 'تدريب عملي على تشغيل رافعات الحاويات الفارغة داخل ساحات التخزين، مع التركيز على التكديس العالي والمناورة الدقيقة.',
        imageUrl: EmptyContainerImg,
        highlight: 'دقة الاصطفاف وتثبيت الحاوية عند الارتفاع',
        longDescription: 'احتراف مناولة الحاويات الفارغة في الموانئ الجافة والبحرية. يركز التدريب على سرعة المناولة، التكديس العمودي حتى 7 أو 8 طوابق، ومقاومة تأثير الرياح أثناء العمليات لضمان استقرار الأكداس.',
        simulatorType: 'Other',
        audience: 'Professional'
      },

    ]
  }
];

export const HSE_POINTS: HSEPoint[] = [
  {
    title: "السلامة قبل المهارة",
    description: "نعلمك أن زر التوقف الطارئ أهم من عصا التشغيل.",
    icon: ShieldCheck
  },
  {
    title: "محاكاة المخاطر",
    description: "تدريب افتراضي على الحرائق، الانقلاب، والأحوال الجوية السيئة.",
    icon: AlertTriangle
  },
  {
    title: "أخلاقيات المشغل",
    description: "المسؤولية، الانضباط في المواعيد، والحفاظ على معدات الشركة.",
    icon: Users
  }
];
export const benefits: Benefits = {
  title: "لماذا تختارنا؟",
  items: [
    { value: 100, suffix: "%", title: "أمان مطلق", description: "صفر مخاطر حوادث. تعلم في بيئة خاضعة للرقابة وآمنة." },
    { value: 20, prefix: "+", suffix: "%", title: "كفاءة معززة", description: "حسّن إنتاجيتك ودقتك من خلال الممارسة المكثفة." },
    { value: 70, suffix: "%", title: "تخفيض التكاليف", description: "وفر في استهلاك الوقود والصيانة ورسوم التدريب." },
  ]
};
export const FAQS: FAQItem[] = [
  {
    question: "هل الشهادة معترف بها من طرف الدولة؟",
    answer: "نعم، شهاداتنا معتمدة وتؤهلك للعمل مباشرة في كبرى الشركات الوطنية والخاصة."
  },
  {
    question: "ليس لدي خبرة سابقة، هل يمكنني التسجيل؟",
    answer: "بالتأكيد. برامجنا مصممة لتبدأ معك من الصفر حتى الاحتراف."
  },
  {
    question: "كم مدة التكوين؟",
    answer: "تختلف حسب التخصص، تتراوح عادة بين 3 أسابيع للمكثف و 3 أشهر للتكوين الشامل."
  },
  {
    question: "هل توفرون الإقامة للقادمين من ولايات أخرى؟",
    answer: "نعم، لدينا اتفاقيات مع مراكز إيواء قريبة بأسعار مناسبة للمتريصين."
  },
  {
    question: "كيف يتم التدريب العملي؟",
    answer: "نبدأ بالمحاكاة الافتراضية (Simulators) ثم ننتقل للآلات الحقيقية في حقل تجارب مغلق وآمن."
  }
];

import {  MessageCircle, User, Briefcase, HelpCircle, FileText, Gamepad2, Construction } from 'lucide-react';
import { ContactNumber, JourneyStep } from './types';

export const CONTACT_NUMBERS: ContactNumber[] = [
    { id: '0',label: 'الإدارة العامة', number: '0770526454', icon: <MessageCircle size={18} />, color: 'text-yellow-400' },
    { id: '1', label: 'قسنطينة - خنشلة', number: '0556584780', icon: <HelpCircle size={18} />, color: 'text-green-400' },

  { id: '2', label: 'قسنطينة', number: '0658220079', icon: <User size={18} />, color: 'text-green-400' },
  { id: '3', label: 'قسنطينة', number: '0799322981', icon: <User size={18} />, color: 'text-blue-400' },

  { id: '4', label: 'خنشلة', number: '0799322981', icon: <Briefcase size={18} />, color: 'text-purple-400' },
  { id: '5', label: 'خنشلة', number: '0555344925', icon: <Briefcase size={18} />, color: 'text-purple-400' },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    title: "التسجيل (Dossier)",
    desc: "قدم ملفك الإداري. لا يشترط مستوى دراسي عالٍ، الأهم هو الرغبة في التعلم.",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-slate-700"
  },
  {
    id: 2,
    title: "المحاكاة (Simulation)",
    desc: "تعلم أساسيات القيادة، التحكم في الأذرع، والسلامة داخل قمرة قيادة افتراضية.",
    icon: <Gamepad2 className="w-6 h-6" />,
    color: "bg-blue-600"
  },
  {
    id: 3,
    title: "التطبيق الميداني",
    desc: "انتقل إلى الآلة الحقيقية في الميدان لترسيخ ما تعلمته في المحاكاة.",
    icon: <Construction className="w-6 h-6" />,
    color: "bg-yellow-600"
  },
  {
    id: 4,
    title: "الشهادة والعمل",
    desc: "احصل على دبلوم معتمد من الدولة وابدأ مسارك المهني في الشركات.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-emerald-600"
  }
];

import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'دورة قيادة الرافعة الشوكية',
    startDate: '2024-10-15',
    wilaya: 'الجزائر العاصمة',
    academyName: 'أكاديمية الجزائر الكبرى',
    duration: '5 أيام',
    status: 'open'
  },
  {
    id: 'c2',
    title: 'دورة الحفارة الهيدروليكية',
    startDate: '2024-10-20',
    wilaya: 'وهران',
    academyName: 'مركز الغرب للتكوين',
    duration: '10 أيام',
    status: 'closing_soon'
  },
  {
    id: 'c3',
    title: 'دورة الشاحنات العملاقة',
    startDate: '2024-11-01',
    wilaya: 'حاسي مسعود',
    academyName: 'معهد الجنوب للبترول',
    duration: '15 يوم',
    status: 'open'
  },
  {
    id: 'c4',
    title: 'دورة الرافعات البرجية',
    startDate: '2024-11-05',
    wilaya: 'سطيف',
    academyName: 'مدرسة الهضاب العليا',
    duration: 'أسبوعين',
    status: 'full'
  }
];
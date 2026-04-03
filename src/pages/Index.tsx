import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/eb59834d-a3eb-406d-a1e7-f6f0132456b8/files/87b940cd-cd15-48c3-b833-a5bf235eb340.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "masters", label: "Мастера" },
  { id: "booking", label: "Запись" },
  { id: "portfolio", label: "Портфолио" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  {
    category: "Волосы",
    icon: "Scissors",
    items: [
      { name: "Стрижка и укладка", duration: "60–90 мин", price: "от 3 500 ₽", desc: "Индивидуальный подбор формы с учётом типа лица и образа жизни" },
      { name: "Окрашивание", duration: "120–180 мин", price: "от 7 000 ₽", desc: "Balayage, омбре, осветление, тонирование — все техники сложного цвета" },
      { name: "Кератиновое выпрямление", duration: "150 мин", price: "от 9 000 ₽", desc: "Восстановление структуры и идеальная гладкость на 3–5 месяцев" },
      { name: "Лечение волос", duration: "60 мин", price: "от 4 500 ₽", desc: "Протеиновое восстановление, ботокс для волос, питательные маски" },
    ],
  },
  {
    category: "Ногти",
    icon: "Sparkles",
    items: [
      { name: "Маникюр с покрытием", duration: "60 мин", price: "от 2 800 ₽", desc: "Аппаратный или классический, гель-лак, долговременное покрытие" },
      { name: "Педикюр", duration: "90 мин", price: "от 3 500 ₽", desc: "Комплексный уход со СПА-ванночкой и покрытием гель-лаком" },
      { name: "Наращивание ногтей", duration: "120 мин", price: "от 5 000 ₽", desc: "Гель, акрил, полигель — безупречная длина и форма" },
      { name: "Nail-art", duration: "30–60 мин", price: "от 1 500 ₽", desc: "Росписи, втирки, фольга, стразы — любой дизайн под ваш образ" },
    ],
  },
  {
    category: "Лицо и тело",
    icon: "Heart",
    items: [
      { name: "Уход за лицом", duration: "60–90 мин", price: "от 5 500 ₽", desc: "Профессиональная чистка, увлажнение, лифтинг-процедуры" },
      { name: "Перманентный макияж", duration: "120 мин", price: "от 12 000 ₽", desc: "Брови, губы, стрелки — безупречный образ 24/7 на 1–2 года" },
      { name: "Депиляция", duration: "30–90 мин", price: "от 1 800 ₽", desc: "Шугаринг и воск, все зоны — мягко, быстро, надолго" },
      { name: "Массаж лица", duration: "45 мин", price: "от 3 200 ₽", desc: "Лифтинговый, скульптурирующий, буккальный — видимый результат" },
    ],
  },
];

const MASTERS = [
  { name: "Анастасия Волкова", role: "Колорист-стилист", exp: "8 лет опыта", spec: ["Сложное окрашивание", "Кератин", "Стрижки"], rating: 4.9, reviews: 147, avatar: "А", available: true },
  { name: "Екатерина Морозова", role: "Nail-мастер", exp: "6 лет опыта", spec: ["Маникюр", "Педикюр", "Nail-art"], rating: 4.8, reviews: 203, avatar: "Е", available: true },
  { name: "Мария Соколова", role: "Бьюти-эксперт", exp: "10 лет опыта", spec: ["Перманентный макияж", "Уход за лицом", "Брови"], rating: 5.0, reviews: 89, avatar: "М", available: false },
  { name: "Диана Лебедева", role: "Стилист", exp: "5 лет опыта", spec: ["Стрижки", "Укладки", "Свадебные образы"], rating: 4.7, reviews: 124, avatar: "Д", available: true },
];

const PORTFOLIO_ITEMS = [
  { category: "Окрашивание", label: "Balayage пепельный", color: "from-slate-700 to-slate-400" },
  { category: "Маникюр", label: "Французский nude", color: "from-amber-900 to-amber-200" },
  { category: "Стрижка", label: "Bob с текстурой", color: "from-stone-800 to-stone-400" },
  { category: "Брови", label: "Перманентный макияж", color: "from-zinc-800 to-zinc-500" },
  { category: "Окрашивание", label: "Русый мелирование", color: "from-amber-800 to-yellow-200" },
  { category: "Маникюр", label: "Геометрия gold", color: "from-yellow-900 to-amber-300" },
];

const REVIEWS = [
  { name: "Светлана К.", date: "15 марта 2025", master: "Анастасия Волкова", service: "Окрашивание", rating: 5, text: "Пришла с мечтой о пепельном блонде и ушла именно с ним. Настя настоящий профессионал — объяснила каждый шаг, волосы живые и блестящие. Запишусь снова!" },
  { name: "Елена М.", date: "2 марта 2025", master: "Екатерина Морозова", service: "Маникюр", rating: 5, text: "Уже полгода хожу только к Кате. Держится больше трёх недель, рисунки как произведение искусства. Салон — самое уютное и приятное место." },
  { name: "Ирина П.", date: "18 февраля 2025", master: "Мария Соколова", service: "Перманентный макияж", rating: 5, text: "Наконец-то решилась на перманент бровей и не пожалела ни секунды! Мария очень аккуратно всё сделала, форма идеально подошла к лицу." },
  { name: "Анна Г.", date: "5 февраля 2025", master: "Диана Лебедева", service: "Стрижка", rating: 5, text: "Давно искала своего мастера по стрижке. Диана с первого раза поняла, чего я хочу. Теперь хожу только к ней каждые 6 недель." },
];

const SCHEDULE = [
  { day: "Понедельник — Пятница", hours: "10:00 — 21:00" },
  { day: "Суббота", hours: "10:00 — 20:00" },
  { day: "Воскресенье", hours: "11:00 — 19:00" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Волосы");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [isLoggedIn] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-obsidian text-cream font-montserrat">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/90 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="font-cormorant text-2xl font-light tracking-[0.15em] text-amber-400">
            LUMIÈRE
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-[10px] uppercase tracking-[0.15em] font-medium transition-colors duration-200 ${
                  activeSection === item.id ? "text-amber-400" : "text-cream/50 hover:text-cream"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo("booking")} className="hidden lg:block btn-gold px-5 py-2 rounded-sm">
              Записаться
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-cream/70">
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-obsidian border-t border-gold/10 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-[10px] uppercase tracking-[0.15em] text-left text-cream/60 hover:text-amber-400 transition-colors">
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("booking")} className="btn-gold px-5 py-2 rounded-sm mt-2">
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-6 animate-fade-in opacity-0">
              Премиальный салон красоты · Москва
            </p>
            <h1 className="font-cormorant text-7xl md:text-9xl font-light leading-[0.9] mb-8 animate-fade-in opacity-0 delay-100 text-cream">
              Красота,<br />
              <em className="text-amber-400">рождённая</em><br />
              светом
            </h1>
            <p className="text-cream/55 text-sm leading-relaxed max-w-md mb-10 animate-fade-in opacity-0 delay-200">
              Мы создаём образы, которые отражают вашу уникальность. Профессиональные мастера, люксовые бренды, атмосфера абсолютного комфорта.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0 delay-300">
              <button onClick={() => scrollTo("booking")} className="btn-gold px-8 py-3 rounded-sm">
                Записаться онлайн
              </button>
              <button onClick={() => scrollTo("services")} className="btn-outline-gold px-8 py-3 rounded-sm">
                Наши услуги
              </button>
            </div>
            <div className="flex gap-10 mt-16 animate-fade-in opacity-0 delay-400">
              {[["500+", "Довольных клиентов"], ["8", "Мастеров экспертов"], ["4.9★", "Средний рейтинг"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-cormorant text-3xl text-amber-400 font-light">{num}</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-cream/35 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-amber-400/60 to-transparent mx-auto" />
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-obsidian border-y border-amber-400/15 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 justify-center items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400">Акции апреля</span>
          {[
            { name: "Маникюр + Педикюр", old: "7 000 ₽", price: "5 600 ₽", tag: "−20%" },
            { name: "Стрижка + Укладка", old: "5 500 ₽", price: "4 400 ₽", tag: "−20%" },
            { name: "Окрашивание + Уход", old: "12 000 ₽", price: "9 600 ₽", tag: "−20%" },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 border border-amber-400/30 px-2 py-0.5">{p.tag}</span>
              <span className="text-cream/60 text-sm">{p.name}</span>
              <span className="text-cream/25 text-xs line-through">{p.old}</span>
              <span className="text-amber-400 text-sm font-medium">{p.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-3">Что мы делаем</p>
            <h2 className="font-cormorant text-6xl font-light text-cream">Каталог услуг</h2>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0">
            {SERVICES.map((s) => (
              <button
                key={s.category}
                onClick={() => setSelectedCategory(s.category)}
                className={`text-[10px] uppercase tracking-wider px-5 py-2 border transition-all duration-200 ${
                  selectedCategory === s.category
                    ? "border-amber-400 bg-amber-400/10 text-amber-400"
                    : "border-amber-400/15 text-cream/40 hover:border-amber-400/30 hover:text-cream/70"
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </div>

        {SERVICES.filter((s) => s.category === selectedCategory).map((cat) => (
          <div key={cat.category} className="grid md:grid-cols-2 gap-4">
            {cat.items.map((item) => (
              <div key={item.name} className="card-luxury group hover:border-amber-400/35 transition-all duration-300 rounded-sm p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-cormorant text-2xl font-light text-cream group-hover:text-amber-400 transition-colors">{item.name}</h3>
                  <span className="text-amber-400 font-montserrat text-sm font-medium ml-4 whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-cream/45 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cream/25">
                    <Icon name="Clock" size={12} />
                    <span className="text-[10px] uppercase tracking-wider">{item.duration}</span>
                  </div>
                  <button onClick={() => { setSelectedService(item.name); scrollTo("booking"); }} className="text-[10px] uppercase tracking-wider text-amber-400 hover:underline">
                    Записаться →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* MASTERS */}
      <section id="masters" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-3">Наша команда</p>
          <h2 className="font-cormorant text-6xl font-light text-cream">Мастера</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASTERS.map((master) => (
            <div key={master.name} className="card-luxury rounded-sm overflow-hidden group">
              <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #242424 100%)" }}>
                <span className="font-cormorant text-7xl font-light text-amber-400/35 group-hover:text-amber-400/65 transition-opacity duration-500">
                  {master.avatar}
                </span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian/50" />
                <span className={`absolute top-3 right-3 text-[9px] uppercase tracking-wider px-2 py-1 border ${master.available ? "bg-green-900/50 text-green-400 border-green-800/40" : "bg-red-900/30 text-red-400/60 border-red-800/25"}`}>
                  {master.available ? "Свободна" : "Занята"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-cormorant text-xl font-medium text-cream mb-1">{master.name}</h3>
                <p className="text-[10px] uppercase tracking-wider text-amber-400 mb-3">{master.role}</p>
                <p className="text-cream/35 text-xs mb-3">{master.exp}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {master.spec.map((s) => (
                    <span key={s} className="text-[9px] text-cream/35 border border-amber-400/10 px-2 py-0.5">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-cream/40 mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={11} className="text-amber-400" />
                    <span className="text-amber-400 font-medium">{master.rating}</span>
                  </div>
                  <span>{master.reviews} отзывов</span>
                </div>
                <button
                  onClick={() => { setSelectedMaster(master.name); scrollTo("booking"); }}
                  className="w-full btn-outline-gold py-2 text-[10px]"
                >
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* BOOKING */}
      <section id="booking" className="py-24 max-w-3xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-3">Онлайн-запись</p>
          <h2 className="font-cormorant text-6xl font-light text-cream">Записаться на приём</h2>
          <p className="text-cream/35 text-sm mt-4 max-w-md mx-auto">Подтверждение придёт в течение нескольких минут. Бесплатная отмена за 24 часа.</p>
        </div>
        <div className="card-luxury rounded-sm p-8 md:p-12">
          {/* Steps */}
          <div className="flex items-center justify-center gap-0 mb-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${bookingStep >= step ? "bg-amber-400 text-obsidian" : "border border-amber-400/20 text-cream/25"}`}>
                  {bookingStep > step ? <Icon name="Check" size={12} /> : step}
                </div>
                {step < 3 && <div className={`w-24 h-px transition-all duration-300 ${bookingStep > step ? "bg-amber-400/50" : "bg-amber-400/10"}`} />}
              </div>
            ))}
          </div>

          {bookingStep === 1 && (
            <div className="space-y-6">
              <h3 className="font-cormorant text-2xl text-center text-cream mb-8">Выберите услугу</h3>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-3">Категория</label>
                <div className="grid grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <button key={s.category} onClick={() => setSelectedCategory(s.category)} className={`p-3 border text-sm transition-all ${selectedCategory === s.category ? "border-amber-400 bg-amber-400/10 text-amber-400" : "border-amber-400/15 text-cream/45 hover:border-amber-400/30"}`}>
                      {s.category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-3">Услуга</label>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full bg-obsidian border border-amber-400/20 text-cream px-4 py-3 text-sm focus:border-amber-400/50 outline-none">
                  <option value="">— Выберите услугу —</option>
                  {SERVICES.find((s) => s.category === selectedCategory)?.items.map((item) => (
                    <option key={item.name} value={item.name}>{item.name} · {item.price}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => selectedService && setBookingStep(2)} className={`w-full py-3 btn-gold rounded-sm mt-4 ${!selectedService ? "opacity-40 cursor-not-allowed" : ""}`}>
                Далее
              </button>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-cormorant text-2xl text-center text-cream mb-8">Мастер и дата</h3>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-3">Мастер</label>
                <div className="grid grid-cols-2 gap-3">
                  {MASTERS.map((m) => (
                    <button key={m.name} onClick={() => setSelectedMaster(m.name)} className={`p-3 border text-left transition-all ${selectedMaster === m.name ? "border-amber-400 bg-amber-400/10" : "border-amber-400/15 hover:border-amber-400/30"}`}>
                      <p className="text-sm text-cream">{m.name}</p>
                      <p className="text-[10px] uppercase tracking-wider text-cream/35 mt-0.5">{m.role}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-3">Дата и время</label>
                <input type="datetime-local" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-obsidian border border-amber-400/20 text-cream px-4 py-3 text-sm focus:border-amber-400/50 outline-none" />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setBookingStep(1)} className="flex-1 btn-outline-gold py-3 rounded-sm">Назад</button>
                <button onClick={() => selectedMaster && selectedDate && setBookingStep(3)} className={`flex-1 btn-gold py-3 rounded-sm ${!selectedMaster || !selectedDate ? "opacity-40 cursor-not-allowed" : ""}`}>Далее</button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-cormorant text-2xl text-center text-cream mb-8">Ваши данные</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-2">Имя</label>
                  <input type="text" placeholder="Ваше имя" className="w-full bg-obsidian border border-amber-400/20 text-cream placeholder-cream/20 px-4 py-3 text-sm focus:border-amber-400/50 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-obsidian border border-amber-400/20 text-cream placeholder-cream/20 px-4 py-3 text-sm focus:border-amber-400/50 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-cream/35 block mb-2">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full bg-obsidian border border-amber-400/20 text-cream placeholder-cream/20 px-4 py-3 text-sm focus:border-amber-400/50 outline-none" />
              </div>
              <div className="bg-obsidian/60 border border-amber-400/15 p-4">
                <p className="text-[10px] uppercase tracking-wider text-cream/30 mb-3">Итог записи</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-cream/40">Услуга</span><span className="text-cream">{selectedService || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-cream/40">Мастер</span><span className="text-cream">{selectedMaster || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-cream/40">Дата</span><span className="text-cream">{selectedDate ? new Date(selectedDate).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "—"}</span></div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setBookingStep(2)} className="flex-1 btn-outline-gold py-3 rounded-sm">Назад</button>
                <button className="flex-1 btn-gold py-3 rounded-sm">Подтвердить запись</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-3">Наши работы</p>
          <h2 className="font-cormorant text-6xl font-light text-cream">Портфолио</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div key={i} className={`aspect-square bg-gradient-to-br ${item.color} relative group cursor-pointer overflow-hidden`}>
              <div className="absolute inset-0 bg-obsidian/50 group-hover:bg-obsidian/20 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 mb-2">{item.category}</span>
                <span className="font-cormorant text-xl text-cream">{item.label}</span>
              </div>
              <div className="absolute bottom-4 left-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-wider text-cream/50">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* REVIEWS */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-3">Что говорят клиенты</p>
            <h2 className="font-cormorant text-6xl font-light text-cream">Отзывы</h2>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="text-right">
              <p className="font-cormorant text-4xl text-amber-400">4.9</p>
              <p className="text-[10px] uppercase tracking-wider text-cream/35">из 5.0</p>
            </div>
            <div className="flex flex-col gap-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[9px] text-cream/25">{star}</span>
                  <div className="w-20 h-1 bg-obsidian rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? "90%" : star === 4 ? "8%" : "2%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((review, i) => (
            <div key={i} className="card-luxury rounded-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
                    <span className="font-cormorant text-lg text-amber-400">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-cream text-sm font-medium">{review.name}</p>
                    <p className="text-cream/35 text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Icon key={j} name="Star" size={12} className="text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-cream/65 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex gap-4 text-xs text-cream/30">
                <span className="flex items-center gap-1"><Icon name="User" size={10} />{review.master}</span>
                <span className="flex items-center gap-1"><Icon name="Scissors" size={10} />{review.service}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="btn-outline-gold px-10 py-3 rounded-sm">Все отзывы</button>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-3">Где нас найти</p>
            <h2 className="font-cormorant text-6xl font-light text-cream mb-10">Контакты</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/30 mb-1">Адрес</p>
                  <p className="text-cream text-sm">г. Москва, ул. Тверская, д. 12, стр. 1</p>
                  <p className="text-cream/35 text-xs mt-1">м. Тверская · 3 мин пешком</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/30 mb-1">Телефон</p>
                  <a href="tel:+74951234567" className="text-cream text-sm hover:text-amber-400 transition-colors">+7 (495) 123-45-67</a>
                  <p className="text-cream/35 text-xs mt-1">Звонки и WhatsApp</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/30 mb-2">Режим работы</p>
                  <div className="space-y-2">
                    {SCHEDULE.map((s) => (
                      <div key={s.day} className="flex justify-between gap-8 text-sm">
                        <span className="text-cream/45">{s.day}</span>
                        <span className="text-amber-400">{s.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Share2" size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/30 mb-2">Соцсети</p>
                  <div className="flex gap-4">
                    {["Instagram", "ВКонтакте", "Telegram"].map((s) => (
                      <a key={s} href="#" className="text-cream/50 hover:text-amber-400 text-sm transition-colors">{s}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-luxury rounded-sm overflow-hidden">
            <div className="h-full min-h-[340px] relative flex flex-col items-center justify-center gap-4" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #242424 100%)" }}>
              <Icon name="MapPin" size={48} className="text-amber-400/25" />
              <p className="text-[10px] uppercase tracking-wider text-cream/20">Карта будет здесь</p>
              <p className="text-xs text-center text-cream/30 px-8">ул. Тверская, д. 12 · Москва</p>
              <button className="btn-outline-gold px-6 py-2 rounded-sm mt-4 text-[10px]">Открыть в картах</button>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section className="border-t border-amber-400/10 py-16 bg-obsidian">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-2">Личный кабинет</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Профиль клиента</h2>
          </div>
          {!isLoggedIn ? (
            <div className="card-luxury rounded-sm p-10 text-center">
              <div className="w-16 h-16 border border-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="User" size={24} className="text-amber-400/50" />
              </div>
              <h3 className="font-cormorant text-3xl text-cream mb-3">Войдите в личный кабинет</h3>
              <p className="text-cream/35 text-sm mb-8 max-w-xs mx-auto">История посещений, управление записями и эксклюзивные предложения</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="btn-gold px-8 py-3 rounded-sm">Войти</button>
                <button className="btn-outline-gold px-8 py-3 rounded-sm">Зарегистрироваться</button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                {[["История", "Все ваши посещения", "History"], ["Записи", "Управление записями", "Calendar"], ["Акции", "Персональные скидки", "Tag"]].map(([label, desc, icon]) => (
                  <div key={label} className="p-4 border border-amber-400/8">
                    <Icon name={icon as string} size={20} className="text-amber-400/35 mx-auto mb-2" />
                    <p className="text-cream/60 text-sm">{label}</p>
                    <p className="text-cream/25 text-xs mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-amber-400/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-cormorant text-2xl text-amber-400 font-light tracking-[0.15em]">LUMIÈRE</p>
            <p className="text-[10px] uppercase tracking-wider text-cream/25 mt-1">Премиальный салон красоты · Москва</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-[10px] uppercase tracking-wider text-cream/25 hover:text-amber-400 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-wider text-cream/20">© 2025 LUMIÈRE</p>
        </div>
      </footer>
    </div>
  );
}

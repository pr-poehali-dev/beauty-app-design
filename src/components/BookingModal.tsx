import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Master {
  id: number;
  name: string;
  role: string;
  avatarInitial: string;
  isAvailable: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  masters: Master[];
  initialService?: string;
  initialMaster?: string;
}

const SERVICES = [
  {
    category: "Волосы",
    items: [
      { name: "Стрижка и укладка", duration: "60–90 мин", price: "от 3 500 ₽" },
      { name: "Окрашивание", duration: "120–180 мин", price: "от 7 000 ₽" },
      { name: "Кератиновое выпрямление", duration: "150 мин", price: "от 9 000 ₽" },
      { name: "Лечение волос", duration: "60 мин", price: "от 4 500 ₽" },
    ],
  },
  {
    category: "Ногти",
    items: [
      { name: "Маникюр с покрытием", duration: "60 мин", price: "от 2 800 ₽" },
      { name: "Педикюр", duration: "90 мин", price: "от 3 500 ₽" },
      { name: "Наращивание ногтей", duration: "120 мин", price: "от 5 000 ₽" },
      { name: "Nail-art", duration: "30–60 мин", price: "от 1 500 ₽" },
    ],
  },
  {
    category: "Лицо и тело",
    items: [
      { name: "Уход за лицом", duration: "60–90 мин", price: "от 5 500 ₽" },
      { name: "Перманентный макияж", duration: "120 мин", price: "от 12 000 ₽" },
      { name: "Депиляция", duration: "30–90 мин", price: "от 1 800 ₽" },
      { name: "Массаж лица", duration: "45 мин", price: "от 3 200 ₽" },
    ],
  },
];

export default function BookingModal({ isOpen, onClose, masters, initialService = "", initialMaster = "" }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Волосы");
  const [service, setService] = useState(initialService);
  const [master, setMaster] = useState(initialMaster);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setService(initialService);
      setMaster(initialMaster);
      setDate("");
      setDone(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, initialService, initialMaster]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const selectedServiceData = SERVICES.flatMap(s => s.items).find(i => i.name === service);

  const handleSubmit = () => {
    if (!name || !phone) return;
    setDone(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(12px)", background: "rgba(13,13,13,0.85)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{
          background: "linear-gradient(145deg, #1a1a1a 0%, #141414 100%)",
          border: "1px solid rgba(201,169,110,0.25)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,169,110,0.05) inset",
          animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Декоративная золотая линия сверху */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />

        {/* Заголовок */}
        <div className="flex items-center justify-between px-8 pt-7 pb-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-amber-400 mb-1">Онлайн-запись</p>
            <h2 className="font-cormorant text-3xl font-light text-cream">
              {done ? "Запись принята" : step === 1 ? "Выберите услугу" : step === 2 ? "Мастер и время" : "Ваши данные"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-cream/30 hover:text-amber-400 transition-colors border border-amber-400/10 hover:border-amber-400/30"
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        {/* Прогресс-бар шагов */}
        {!done && (
          <div className="flex px-8 gap-1 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="h-0.5 flex-1 transition-all duration-500"
                style={{
                  background: step >= s
                    ? "linear-gradient(90deg, #C9A96E, #E8D5A3)"
                    : "rgba(201,169,110,0.1)"
                }}
              />
            ))}
          </div>
        )}

        <div className="px-8 pb-8">

          {/* УСПЕХ */}
          {done && (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)" }}
              >
                <Icon name="Check" size={28} className="text-amber-400" />
              </div>
              <h3 className="font-cormorant text-2xl text-cream mb-3">Вы записаны!</h3>
              <p className="text-cream/45 text-sm leading-relaxed mb-2">
                Подтверждение отправим на <span className="text-amber-400">{phone}</span>
              </p>
              <div className="bg-obsidian/60 border border-amber-400/10 p-4 mt-6 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Услуга</span>
                  <span className="text-cream">{service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Мастер</span>
                  <span className="text-cream">{master || "Любой свободный"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Дата</span>
                  <span className="text-cream">
                    {date ? new Date(date).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "—"}
                  </span>
                </div>
              </div>
              <button onClick={onClose} className="btn-gold w-full py-3 mt-6 rounded-sm">
                Закрыть
              </button>
            </div>
          )}

          {/* ШАГ 1 — УСЛУГА */}
          {!done && step === 1 && (
            <div className="space-y-5">
              <div className="flex gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.category}
                    onClick={() => setCategory(s.category)}
                    className="flex-1 py-2 text-[9px] uppercase tracking-wider border transition-all"
                    style={{
                      borderColor: category === s.category ? "#C9A96E" : "rgba(201,169,110,0.12)",
                      background: category === s.category ? "rgba(201,169,110,0.08)" : "transparent",
                      color: category === s.category ? "#C9A96E" : "rgba(245,240,232,0.4)",
                    }}
                  >
                    {s.category}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {SERVICES.find(s => s.category === category)?.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setService(item.name)}
                    className="w-full flex items-center justify-between p-4 border text-left transition-all group"
                    style={{
                      borderColor: service === item.name ? "#C9A96E" : "rgba(201,169,110,0.08)",
                      background: service === item.name ? "rgba(201,169,110,0.06)" : "transparent",
                    }}
                  >
                    <div>
                      <p className="text-cream text-sm group-hover:text-amber-400 transition-colors">{item.name}</p>
                      <p className="text-cream/30 text-[10px] mt-0.5 flex items-center gap-1">
                        <Icon name="Clock" size={10} />
                        {item.duration}
                      </p>
                    </div>
                    <span className="text-amber-400 text-sm font-medium">{item.price}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => service && setStep(2)}
                className={`w-full btn-gold py-3 rounded-sm mt-2 ${!service ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Далее →
              </button>
            </div>
          )}

          {/* ШАГ 2 — МАСТЕР И ДАТА */}
          {!done && step === 2 && (
            <div className="space-y-5">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-cream/30 mb-3">Мастер</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMaster("")}
                    className="p-3 border text-left transition-all"
                    style={{
                      borderColor: master === "" ? "#C9A96E" : "rgba(201,169,110,0.1)",
                      background: master === "" ? "rgba(201,169,110,0.06)" : "transparent",
                    }}
                  >
                    <p className="text-sm text-cream">Любой свободный</p>
                    <p className="text-[9px] uppercase tracking-wider text-cream/30 mt-0.5">Автовыбор</p>
                  </button>
                  {masters.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMaster(m.name)}
                      className="p-3 border text-left transition-all relative"
                      style={{
                        borderColor: master === m.name ? "#C9A96E" : "rgba(201,169,110,0.1)",
                        background: master === m.name ? "rgba(201,169,110,0.06)" : "transparent",
                        opacity: m.isAvailable ? 1 : 0.5,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-6 h-6 flex items-center justify-center text-xs font-cormorant"
                          style={{ background: "rgba(201,169,110,0.15)", color: "#C9A96E" }}
                        >
                          {m.avatarInitial}
                        </span>
                        <p className="text-xs text-cream leading-tight">{m.name}</p>
                      </div>
                      <p className="text-[9px] uppercase tracking-wider text-cream/30">{m.role}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider text-cream/30 mb-2">Дата и время</p>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-obsidian border border-amber-400/15 text-cream px-4 py-3 text-sm focus:border-amber-400/50 outline-none"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {selectedServiceData && (
                <div className="flex items-center justify-between py-3 border-t border-amber-400/10 text-sm">
                  <span className="text-cream/40">{selectedServiceData.name}</span>
                  <span className="text-amber-400">{selectedServiceData.price}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 btn-outline-gold py-3 rounded-sm">← Назад</button>
                <button
                  onClick={() => date && setStep(3)}
                  className={`flex-1 btn-gold py-3 rounded-sm ${!date ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  Далее →
                </button>
              </div>
            </div>
          )}

          {/* ШАГ 3 — ДАННЫЕ */}
          {!done && step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-cream/30 mb-2">Имя *</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full bg-obsidian border border-amber-400/15 text-cream placeholder-cream/20 px-4 py-3 text-sm focus:border-amber-400/50 outline-none"
                  />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-cream/30 mb-2">Телефон *</p>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-obsidian border border-amber-400/15 text-cream placeholder-cream/20 px-4 py-3 text-sm focus:border-amber-400/50 outline-none"
                  />
                </div>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-cream/30 mb-2">Email</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-obsidian border border-amber-400/15 text-cream placeholder-cream/20 px-4 py-3 text-sm focus:border-amber-400/50 outline-none"
                />
              </div>

              <div className="p-4 space-y-2" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <p className="text-[9px] uppercase tracking-wider text-cream/25 mb-3">Итог записи</p>
                {[
                  ["Услуга", service || "—"],
                  ["Мастер", master || "Любой свободный"],
                  ["Дата", date ? new Date(date).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-cream/35">{k}</span>
                    <span className="text-cream">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={() => setStep(2)} className="flex-1 btn-outline-gold py-3 rounded-sm">← Назад</button>
                <button
                  onClick={handleSubmit}
                  className={`flex-1 btn-gold py-3 rounded-sm ${!name || !phone ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  Подтвердить запись
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

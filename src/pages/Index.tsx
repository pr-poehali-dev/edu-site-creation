import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/73239f08-8a21-4e36-81c4-d3e83a114eb3/files/4c6231ef-7d87-4a1f-8d63-96853bd3e802.jpg';

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'materials', label: 'Учебные материалы', icon: 'BookOpen' },
  { id: 'interactive', label: 'Интерактивные задания', icon: 'Gamepad2' },
  { id: 'parents', label: 'Для родителей', icon: 'Heart' },
  { id: 'teacher', label: 'О учителе', icon: 'GraduationCap' },
];

const PRINCIPLES = [
  { icon: 'Smile', title: 'Радость познания', text: 'Учимся через игру, любопытство и маленькие открытия каждый день.' },
  { icon: 'Users', title: 'Поддержка каждого', text: 'У каждого ребёнка свой темп — мы внимательны к индивидуальности.' },
  { icon: 'Sparkles', title: 'Творчество', text: 'Рисуем, мастерим и фантазируем, чтобы знания оживали.' },
  { icon: 'ShieldCheck', title: 'Безопасность', text: 'Тёплая и спокойная атмосфера, где не страшно ошибаться.' },
];

const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

const SCHEDULE: Record<string, { time: string; subject: string; icon: string; color: string }[]> = {
  Понедельник: [
    { time: '8:30', subject: 'Математика', icon: 'Calculator', color: 'bg-primary/20' },
    { time: '9:30', subject: 'Русский язык', icon: 'PenLine', color: 'bg-secondary/40' },
    { time: '10:30', subject: 'Чтение', icon: 'BookOpen', color: 'bg-accent/40' },
    { time: '11:30', subject: 'Физкультура', icon: 'Dumbbell', color: 'bg-primary/20' },
  ],
  Вторник: [
    { time: '8:30', subject: 'Русский язык', icon: 'PenLine', color: 'bg-secondary/40' },
    { time: '9:30', subject: 'Математика', icon: 'Calculator', color: 'bg-primary/20' },
    { time: '10:30', subject: 'Окружающий мир', icon: 'Globe', color: 'bg-accent/40' },
    { time: '11:30', subject: 'Музыка', icon: 'Music', color: 'bg-secondary/40' },
  ],
  Среда: [
    { time: '8:30', subject: 'Математика', icon: 'Calculator', color: 'bg-primary/20' },
    { time: '9:30', subject: 'Чтение', icon: 'BookOpen', color: 'bg-accent/40' },
    { time: '10:30', subject: 'ИЗО', icon: 'Palette', color: 'bg-secondary/40' },
    { time: '11:30', subject: 'Русский язык', icon: 'PenLine', color: 'bg-primary/20' },
  ],
  Четверг: [
    { time: '8:30', subject: 'Русский язык', icon: 'PenLine', color: 'bg-secondary/40' },
    { time: '9:30', subject: 'Математика', icon: 'Calculator', color: 'bg-primary/20' },
    { time: '10:30', subject: 'Технология', icon: 'Scissors', color: 'bg-accent/40' },
    { time: '11:30', subject: 'Физкультура', icon: 'Dumbbell', color: 'bg-secondary/40' },
  ],
  Пятница: [
    { time: '8:30', subject: 'Чтение', icon: 'BookOpen', color: 'bg-accent/40' },
    { time: '9:30', subject: 'Окружающий мир', icon: 'Globe', color: 'bg-primary/20' },
    { time: '10:30', subject: 'Математика', icon: 'Calculator', color: 'bg-secondary/40' },
    { time: '11:30', subject: 'Классный час', icon: 'Coffee', color: 'bg-accent/40' },
  ],
};

const MATERIALS = [
  { subject: 'Математика', icon: 'Calculator', items: ['Карточки со счётом до 100 (PDF)', 'Таблица умножения для печати', 'Весёлые задачки в картинках'] },
  { subject: 'Русский язык', icon: 'PenLine', items: ['Прописи для первоклассников (PDF)', 'Словарные слова по неделям', 'Памятка по разбору слова'] },
  { subject: 'Чтение', icon: 'BookOpen', items: ['Список книг на лето', 'Дневник читателя (шаблон)', 'Стихи для заучивания'] },
  { subject: 'Окружающий мир', icon: 'Globe', items: ['Атлас «Времена года»', 'Опыты дома (инструкция)', 'Карточки о животных'] },
];

const RESOURCES = [
  { title: 'Учи.ру', desc: 'Интерактивные задания по школьной программе', icon: 'Rocket' },
  { title: 'РЭШ', desc: 'Российская электронная школа: уроки и тесты', icon: 'Tv' },
  { title: 'LearningApps', desc: 'Игровые упражнения и викторины', icon: 'Puzzle' },
];

const QUIZ = {
  question: 'Сколько будет 7 + 6?',
  options: ['11', '12', '13', '14'],
  correct: 2,
};

const Index = () => {
  const [activeDay, setActiveDay] = useState('Понедельник');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Навигация */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 font-display text-xl font-extrabold">
            <span className="grid place-items-center w-10 h-10 rounded-2xl bg-primary text-primary-foreground">
              <Icon name="Pencil" size={20} />
            </span>
            <span className="hidden sm:inline text-foreground">Кабинет 1«А»</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-3 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {n.label}
              </button>
            ))}
          </div>
          <Button onClick={() => scrollTo('parents')} className="rounded-full font-semibold">
            <Icon name="Mail" size={16} className="mr-1" /> Связаться
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-bold mb-5">
              <Icon name="Sun" size={16} /> Добро пожаловать!
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Кабинет<br />
              <span className="text-primary">начальных классов</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Уютное пространство, где учиться легко и радостно. Здесь — материалы, задания, расписание и всё для родителей.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollTo('schedule')} className="rounded-full font-bold text-base">
                <Icon name="CalendarDays" size={18} className="mr-2" /> Расписание
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('materials')} className="rounded-full font-bold text-base bg-card">
                <Icon name="BookOpen" size={18} className="mr-2" /> Материалы
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 bg-primary/15 rounded-[2.5rem] rotate-3" />
            <img src={HERO_IMG} alt="Кабинет начальных классов" className="relative rounded-[2rem] shadow-xl w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Наши принципы обучения</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="hover-lift bg-card rounded-3xl p-6 border border-border text-center">
              <div className="mx-auto mb-4 grid place-items-center w-14 h-14 rounded-2xl bg-primary/15">
                <Icon name={p.icon} size={26} className="text-primary" />
              </div>
              <h3 className="font-extrabold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Интерактивное расписание */}
      <section id="schedule" className="container mx-auto px-4 py-12">
        <div className="bg-card rounded-[2rem] border border-border p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="CalendarDays" size={28} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-extrabold">Интерактивное расписание</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                  activeDay === d
                    ? 'bg-primary text-primary-foreground scale-105 shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SCHEDULE[activeDay].map((lesson, i) => (
              <div key={i} className="animate-fade-in flex items-center gap-4 p-4 rounded-2xl border border-border bg-background">
                <div className={`grid place-items-center w-12 h-12 rounded-xl ${lesson.color}`}>
                  <Icon name={lesson.icon} size={22} className="text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold">{lesson.time}</p>
                  <p className="font-extrabold text-lg">{lesson.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Учебные материалы */}
      <section id="materials" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">Учебные материалы</h2>
        <p className="text-center text-muted-foreground mb-10">Файлы для скачивания и материалы по предметам</p>
        <div className="grid lg:grid-cols-2 gap-8">
          <Accordion type="single" collapsible className="space-y-3">
            {MATERIALS.map((m) => (
              <AccordionItem key={m.subject} value={m.subject} className="bg-card border border-border rounded-2xl px-5">
                <AccordionTrigger className="hover:no-underline font-extrabold text-lg">
                  <span className="flex items-center gap-3">
                    <Icon name={m.icon} size={22} className="text-primary" /> {m.subject}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="FileDown" size={16} className="text-primary shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="space-y-4">
            <h3 className="font-extrabold text-xl flex items-center gap-2">
              <Icon name="Link" size={20} className="text-primary" /> Полезные ресурсы
            </h3>
            {RESOURCES.map((r) => (
              <button key={r.title} className="hover-lift w-full text-left flex items-center gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-accent/40">
                  <Icon name={r.icon} size={22} className="text-accent-foreground" />
                </div>
                <div>
                  <p className="font-extrabold">{r.title}</p>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
                <Icon name="ArrowUpRight" size={18} className="ml-auto text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Интерактивные задания */}
      <section id="interactive" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Интерактивные задания</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Квиз */}
          <div className="bg-card rounded-[2rem] border border-border p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Icon name="Brain" size={24} className="text-primary" />
              <h3 className="font-extrabold text-xl">Квиз «Проверь свои знания»</h3>
            </div>
            <p className="font-bold text-lg mb-5">{QUIZ.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {QUIZ.options.map((opt, i) => {
                const isCorrect = i === QUIZ.correct;
                const isPicked = quizAnswer === i;
                let style = 'bg-muted text-foreground hover:bg-accent';
                if (quizAnswer !== null && isCorrect) style = 'bg-primary text-primary-foreground';
                else if (isPicked && !isCorrect) style = 'bg-destructive text-destructive-foreground';
                return (
                  <button
                    key={opt}
                    onClick={() => setQuizAnswer(i)}
                    className={`py-4 rounded-2xl font-extrabold text-lg transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {quizAnswer !== null && (
              <p className="mt-5 font-bold text-center animate-fade-in">
                {quizAnswer === QUIZ.correct ? '🎉 Верно! Молодец!' : '🙂 Попробуй ещё раз!'}
              </p>
            )}
          </div>
          {/* Видео */}
          <div className="bg-card rounded-[2rem] border border-border p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Icon name="PlayCircle" size={24} className="text-primary" />
              <h3 className="font-extrabold text-xl">Обучающее видео</h3>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted grid place-items-center">
              <div className="text-center text-muted-foreground">
                <Icon name="Youtube" size={48} className="mx-auto mb-2" />
                <p className="font-semibold">Здесь появится видео с YouTube</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Можно встроить мультфильмы-уроки, песенки о буквах и цифрах, развивающие ролики.
            </p>
          </div>
        </div>
      </section>

      {/* Для родителей */}
      <section id="parents" className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-secondary/40 to-accent/30 rounded-[2rem] p-6 md:p-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Для родителей</h2>
            <p className="text-muted-foreground mb-6">
              Здесь вы найдёте всё важное: домашние задания, рекомендации и форму обратной связи. Напишите нам — мы всегда на связи.
            </p>
            <ul className="space-y-3">
              {['Расписание родительских собраний', 'Памятка по режиму дня школьника', 'Как помочь с домашним заданием'].map((t) => (
                <li key={t} className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border">
                  <Icon name="CheckCircle2" size={20} className="text-primary shrink-0" /> <span className="font-semibold">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <form className="bg-card rounded-3xl p-6 border border-border space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-extrabold text-xl flex items-center gap-2">
              <Icon name="MessageCircle" size={22} className="text-primary" /> Обратная связь
            </h3>
            <input className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Ваше имя" />
            <input className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" placeholder="E-mail или телефон" />
            <textarea rows={4} className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Ваш вопрос или сообщение" />
            <Button type="submit" className="w-full rounded-2xl font-bold text-base">
              <Icon name="Send" size={16} className="mr-2" /> Отправить
            </Button>
          </form>
        </div>
      </section>

      {/* О учителе */}
      <section id="teacher" className="container mx-auto px-4 py-12">
        <div className="bg-card rounded-[2rem] border border-border p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 grid place-items-center w-32 h-32 rounded-full bg-primary/20">
            <Icon name="GraduationCap" size={56} className="text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Анна Петровна Соловьёва</h2>
            <p className="text-primary font-bold mb-4">Учитель начальных классов · 12 лет опыта</p>
            <p className="text-muted-foreground max-w-2xl">
              Люблю свою профессию и каждого ученика. Верю, что школа — это место, где рождается любовь к знаниям.
              Помогаю детям делать первые шаги в большой мир с улыбкой и заботой.
            </p>
            <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
              {['Высшая категория', 'Наставник года', 'Эксперт ОГЭ'].map((b) => (
                <span key={b} className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-bold">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-primary/10 border-t border-border mt-12">
        <div className="container mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-extrabold mb-3">
              <span className="grid place-items-center w-10 h-10 rounded-2xl bg-primary text-primary-foreground">
                <Icon name="Pencil" size={20} />
              </span>
              Кабинет 1«А»
            </div>
            <p className="text-sm text-muted-foreground">Учиться — это радостно и интересно.</p>
          </div>
          <div>
            <h4 className="font-extrabold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Icon name="Mail" size={16} className="text-primary" /> klass1a@school.ru</li>
              <li className="flex items-center gap-2"><Icon name="Phone" size={16} className="text-primary" /> +7 (900) 123-45-67</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={16} className="text-primary" /> г. Москва, ул. Школьная, 5</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold mb-3">Разделы</h4>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="text-muted-foreground hover:text-foreground transition-colors">{n.label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-sm text-muted-foreground">
          © 2026 Кабинет начальных классов. Сделано с заботой о детях.
        </div>
      </footer>
    </div>
  );
};

export default Index;

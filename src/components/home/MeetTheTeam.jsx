import { useEffect, useRef, useState, useCallback } from "react";

const team = [
  {
    name: "The Full Team",
    role: "Best Team",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
    wide: true,
  },
  {
    name: "Content Director",
    role: "Content Strategy",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Link Building Lead",
    role: "Off-Page SEO",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Account Manager",
    role: "Client Success",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Founder & SEO Lead",
    role: "Strategy & Growth",
    img: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Technical SEO Lead",
    role: "Site Architecture",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Outreach Specialist",
    role: "Partnerships",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function MeetTheTeam() {
  const [headerRef, headerInView] = useInView(0.2);

  const scrollRef = useRef(null);
  const isPausedRef = useRef(false); // ref, not state — read instantly inside rAF loop
  const isDragging = useRef(false);
  const [progress, setProgress] = useState(0);

  // Auto-scroll loop (slow, continuous, seamless loop)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame;

    const step = () => {
      if (!isPausedRef.current && !isDragging.current && el) {
        el.scrollLeft += 0.4; // slow speed, instant increment (no CSS smoothing fighting it)
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 1) {
          el.scrollLeft = 0;
        }
        setProgress(max > 0 ? el.scrollLeft / max : 0);
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollByAmount = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-[500px] bg-purple-700/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/10 blur-3xl rounded-full" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Meet the Team
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          One Team for Every Corner of{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            the Adult Industry
          </span>
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          From adult eCommerce and dating to cam studios, OnlyFans creators,
          fetish brands and AI companions, we have ranked them all. Meet the
          specialists behind your rankings.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative mt-12 sm:mt-16 max-w-6xl mx-auto"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => {
            isDragging.current = true;
            isPausedRef.current = true;
          }}
          onTouchEnd={() => {
            isDragging.current = false;
            isPausedRef.current = false;
          }}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {[...team, ...team].map((member, i) => (
            <div
              key={i}
              className={`group relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_10px_40px_rgba(225,29,72,0.2)] ${
                member.wide ? "w-64 sm:w-72" : "w-48 sm:w-56"
              } h-72 sm:h-80`}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-[#0a0710]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm sm:text-base font-bold text-white">
                  {member.name}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nav arrows - visible from sm up */}
        <button
          onClick={() => scrollByAmount(-1)}
          className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white hover:border-red-500/50 hover:text-red-400 transition-all duration-300 z-10"
          aria-label="Scroll left"
        >
          ◀
        </button>
        <button
          onClick={() => scrollByAmount(1)}
          className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white hover:border-red-500/50 hover:text-red-400 transition-all duration-300 z-10"
          aria-label="Scroll right"
        >
          ▶
        </button>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-full max-w-xs mx-auto rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-all duration-150"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
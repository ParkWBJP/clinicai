// Enable JS-only styles (e.g., reveal animations). If a runtime error occurs,
// remove the class to avoid hiding content.
document.documentElement.classList.add("js");
const __disableJsClass = () => document.documentElement.classList.remove("js");
window.addEventListener("error", __disableJsClass);
window.addEventListener("unhandledrejection", __disableJsClass);

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  // 모바일 내비 토글
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // FAQ 아코디언
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      question.setAttribute("aria-expanded", isOpen);
    });
  });

  // Header logo click -> refresh page
  const logoLink = document.querySelector(".logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }

  // Hero anti-gravity background: parallax on desktop, gentle drift on touch
  const blobs = document.querySelectorAll(".hero-bg-layer .hero-blob");
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.innerWidth >= 768;
  const particleCanvas = document.querySelector(".hero-particles");

  if (blobs.length && !prefersReduce) {
    const enableDrift = () => {
      blobs.forEach((blob) => {
        blob.classList.add("drift");
        blob.style.transform = "";
      });
    };

    if (isDesktop) {
      enableDrift();
      let driftTimeout;
      window.addEventListener("mousemove", (e) => {
        blobs.forEach((blob) => blob.classList.remove("drift"));
        const mx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 ~ 1
        const my = (e.clientY / window.innerHeight - 0.5) * 2;
        blobs.forEach((blob) => {
          const speed = parseFloat(blob.dataset.speed || "5");
          const dx = mx * speed;
          const dy = my * speed * 0.7;
          blob.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        });
        clearTimeout(driftTimeout);
        driftTimeout = setTimeout(enableDrift, 1600);
      });

      window.addEventListener("mouseleave", enableDrift);
    } else {
      enableDrift();
    }
  }

  // Hero particle field (wind-driven sand drift)
  if (particleCanvas && particleCanvas.getContext && !prefersReduce) {
    const ctx = particleCanvas.getContext("2d");
    let particles = [];
    let rafId;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      particleCanvas.width = particleCanvas.clientWidth * dpr;
      particleCanvas.height = particleCanvas.clientHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const densityBase = 7;
      const count = Math.min(780, Math.floor(particleCanvas.clientWidth / densityBase) * 2);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * particleCanvas.clientWidth,
        y: Math.random() * particleCanvas.clientHeight, // 전체 영역에 생성
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.3 + 0.5,
        alpha: Math.random() * 0.45 + 0.25
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, particleCanvas.clientWidth, particleCanvas.clientHeight);
      const w = particleCanvas.clientWidth;
      const h = particleCanvas.clientHeight;
      t += 0.6;
      const margin = 80;
      const bottom = h * 0.9;

      particles.forEach((p) => {
        // Smooth wind field based on position + time
        const windX = Math.sin(p.y * 0.004 + t * 0.008) * 0.8 + Math.sin(t * 0.02) * 0.35;
        const windY = Math.cos(p.x * 0.0035 + t * 0.006) * 0.4 - 0.28;

        p.vx += windX * 0.05 + (Math.random() - 0.5) * 0.02;
        p.vy += windY * 0.05 + (Math.random() - 0.5) * 0.02 - 0.01; // upward bias

        // mild damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // cap speed
        const speed = Math.hypot(p.vx, p.vy);
        const maxSpeed = 2.0;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
        // prevent stalling: if almost stopped, nudge with fresh velocity
        if (speed < 0.05) {
          p.vx = (Math.random() - 0.5) * 0.6;
          p.vy = (Math.random() - 0.5) * 0.6 - 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // bounce upward near lower band to avoid accumulation
        if (p.y > bottom) {
          p.y = bottom - Math.random() * 20;
          p.vy = -Math.abs(p.vy) - 0.3;
          p.vx += (Math.random() - 0.5) * 0.2;
        }

        // wrap/respawn with top bias
        if (p.x < -margin) p.x = w + margin;
        if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) {
          p.y = Math.random() * h;
          p.vy = Math.abs(p.vy) * 0.5;
        }
        if (p.y > h + margin) {
          p.y = Math.random() * h;
          p.vy = -Math.abs(p.vy) * 0.7;
          p.vx += (Math.random() - 0.5) * 0.3;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#3aa398";
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      rafId = requestAnimationFrame(tick);
    };

    resize();
    createParticles();
    tick();
    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
  }

  // 스크롤 리빌 애니메이션 (기존 .reveal)
  const revealItems = document.querySelectorAll(".reveal");
  const canObserve = "IntersectionObserver" in window;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealItems.length) {
    if (canObserve && !reduceMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealItems.forEach((el) => observer.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add("visible"));
    }
  }

  // 스크롤 리빌 애니메이션 (problems 카드)
  const revealOnScroll = document.querySelectorAll(".reveal-on-scroll");
  if (revealOnScroll.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      revealOnScroll.forEach((el) => observer.observe(el));
    } else {
      const onScroll = () => {
        revealOnScroll.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) {
            el.classList.add("reveal-visible");
          }
        });
      };
      window.addEventListener("scroll", onScroll);
      onScroll();
    }
  }

  // 성공사례 슬라이더 (1장씩 표시)
  const successTrack = document.querySelector(".success-track");
  const successDots = document.querySelector(".success-dots");
  const successPrev = document.querySelector(".success-prev");
  const successNext = document.querySelector(".success-next");

  const successSlides = [
    {
      headlineHtml: "AI 최적화 이후<br>15,000건 이상의 오가닉 트래픽 상승<br>고객 문의 40건 이상 증가",
      bodyText:
        "Northwest Eye Clinic은 생성형 엔진 최적화(GEO) 콘텐츠 엔진을 도입해, 월 15,000건 이상의 자연(오가닉) 방문 트래픽과 40건이 넘는 신규 환자 문의를 안정적으로 만들어 내고 있습니다.",
      clinicName: "Northwest Eye Clinic",
      metaText: "Minnesota · 제공: Tely AI",
      caseUrl:
        "https://www.tely.ai/case-study-new/northwest-eye-clinic-growing-from-near-zero-to-15k-monthly-views-with-seo-geo-optimized-stabilization"
    },
    {
      headlineHtml: "AI 최적화 이후<br>ChatGPT 답변 상위 노출 달성<br>병원 FAQ 기반 환자 신뢰도 급상승",
      bodyText:
        "Midwest Regional Medical Center는 FAQ 콘텐츠를 생성형 엔진 최적화(GEO) 구조로 재설계한 이후, ChatGPT 및 주요 AI 답변에서 병원 정보가 상위로 인용되기 시작했으며, 환자들이 신뢰하는 1차 정보 출처로 자리 잡았습니다.",
      clinicName: "Midwest Regional Medical Center",
      metaText: "400-bed Hospital · 제공: Relixir",
      caseUrl: "https://relixir.ai/blog/relixir-chatgpt-rankings-hospital-faq-27-days-geo-case-study"
    },
    {
      headlineHtml: "AIO/GEO도입 이후 3개월전 대비<br>오가닉 트래픽 1만 건 달성<br>전화 문의 819건 · 예약 61건 증가",
      bodyText:
        "Glen Burnie Medical Clinic은  AIO/GEO 구조를 도입한 이후 단 28일 만에 1만 건 이상의 방문과 819건의 전화 문의, 61건의 직접 예약을 만들어 내며 지역 내 병원 검색에서 압도적인 성과를 달성했습니다.",
      clinicName: "Glen Burnie Medical Clinic",
      metaText: "Maryland · 제공: Frasatali",
      caseUrl: "https://frasatali.com/medical-clinic-seo-case-study-glen-burnie/"
    }
  ];

  if (successTrack && successSlides.length) {
    successTrack.innerHTML = successSlides
      .map(
        (slide, idx) => `
        <article class="success-card reveal-on-scroll">
          <p class="success-label">SUCCESS STORY 0${idx + 1}</p>
          <h3 class="case-headline">${slide.headlineHtml}</h3>
          <p class="case-body">${slide.bodyText}</p>
          <div class="success-footer">
            <div class="footer-left">
              <p class="footer-hospital">${slide.clinicName}</p>
              <p class="footer-meta">${slide.metaText}</p>
            </div>
            <a class="footer-link case-link" href="${slide.caseUrl}" target="_blank" rel="noopener noreferrer">Case Study →</a>
          </div>
        </article>`
      )
      .join("");

    const slides = Array.from(successTrack.children);
    if (successDots) {
      successDots.innerHTML = slides
        .map(
          (_, i) => `<button class="${i === 0 ? "active" : ""}" aria-label="Success story ${i + 1}"></button>`
        )
        .join("");
    }

    // Re-attach reveal animation for dynamically injected slides
    const newReveals = slides;
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      newReveals.forEach((el) => obs.observe(el));
    } else {
      newReveals.forEach((el) => el.classList.add("reveal-visible"));
    }

    let sIndex = 0;
    let sTimer;

    const update = (idx) => {
      sIndex = (idx + slides.length) % slides.length;
      successTrack.style.transform = `translateX(-${sIndex * 100}%)`;
      if (successDots) {
        Array.from(successDots.children).forEach((dot, i) => dot.classList.toggle("active", i === sIndex));
      }
    };

    const next = () => update(sIndex + 1);
    const prev = () => update(sIndex - 1);

    const startAuto = () => {
      clearInterval(sTimer);
      sTimer = setInterval(next, 3500);
    };
    update(0);
    startAuto();

    if (successNext) successNext.addEventListener("click", () => { next(); startAuto(); });
    if (successPrev) successPrev.addEventListener("click", () => { prev(); startAuto(); });
    if (successDots) {
      Array.from(successDots.children).forEach((dot, i) =>
        dot.addEventListener("click", () => { update(i); startAuto(); })
      );
    }

    // touch swipe
    let sx = 0;
    let swiping = false;
    successTrack.addEventListener("touchstart", (e) => { swiping = true; sx = e.touches[0].clientX; }, { passive: true });
    successTrack.addEventListener("touchend", (e) => {
      if (!swiping) return;
      const diff = e.changedTouches[0].clientX - sx;
      if (diff > 40) prev();
      if (diff < -40) next();
      startAuto();
      swiping = false;
    }, { passive: true });
  }

  // Partner AI network: circular layout + orbital wobble
  (function initAiNetwork() {
    const network = document.querySelector(".ai-network");
    if (!network) return;
    const centerEl = network.querySelector(".ai-center");
    const nodeEls = Array.from(network.querySelectorAll(".ai-node"));
    const svg = network.querySelector(".ai-lines");
    if (!centerEl || !nodeEls.length || !svg) return;

    // Setup lines
    svg.innerHTML = "";
    const lines = nodeEls.map(() => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("stroke", "rgba(15, 35, 62, 0.14)");
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);
      return line;
    });

    const startAngle = -54; // degrees
    const step = 72; // degrees
    const meta = nodeEls.map((node, idx) => ({
      node,
      angle: (startAngle + step * idx) * (Math.PI / 180),
      amp: 4 + Math.random() * 4,
      speed: 0.45 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      line: lines[idx],
      baseX: 0,
      baseY: 0
    }));

    let running = false;
    let rafId;
    let lastRect;

    const layout = () => {
      const rect = network.getBoundingClientRect();
      lastRect = rect;
      const radius = Math.min(rect.width, rect.height) * 0.38;
      meta.forEach((m) => {
        m.baseX = Math.cos(m.angle) * radius;
        m.baseY = Math.sin(m.angle) * radius;
      });
    };

    const render = (ts) => {
      if (!running) return;
      const rect = lastRect || network.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const t = (ts || 0) / 1000;
      meta.forEach((m) => {
        const wobbleX = Math.cos(t * m.speed + m.phase) * m.amp;
        const wobbleY = Math.sin(t * (m.speed * 0.9) + m.phase) * m.amp;
        const x = m.baseX + wobbleX;
        const y = m.baseY + wobbleY;
        m.node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        if (m.line) {
          m.line.setAttribute("x1", cx);
          m.line.setAttribute("y1", cy);
          m.line.setAttribute("x2", cx + x);
          m.line.setAttribute("y2", cy + y);
        }
      });
      rafId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    // Observe visibility to run only when visible (fallback: run always)
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              layout();
              start();
            } else {
              stop();
            }
          });
        },
        { threshold: 0.15 }
      );
      io.observe(network);
    } else {
      layout();
      start();
    }

    window.addEventListener("resize", () => {
      layout();
    });

    layout();
  })();

  // Partner AI network parallax (subtle)
  const aiNetwork = document.querySelector(".ai-network");
  if (aiNetwork) {
    const nodes = aiNetwork.querySelectorAll(".ai-node, .ai-center");
    // Parallax on hover disabled per request
  }

  // Service Structure - Step02 pipeline animation
  (function initPipeline() {
    const configs = [
      { inputId: "opt-input-zone-2", outputId: "opt-output-zone-2", progressId: "opt-progress-2" }
    ];

    const isStackedLayout = () => window.matchMedia && window.matchMedia("(max-width: 900px)").matches;

    const keywords = [
      { text: "Schema Org", icon: "code" },
      { text: "SEO Keywords", icon: "search" },
      { text: "Core Contents", icon: "file-check" },
      { text: "FAQ Logic", icon: "message-circle-question" },
      { text: "JP Local", icon: "globe" }
    ];

    const makeChip = (data) => {
      const chip = document.createElement("div");
      chip.className = "opt-chip";
      chip.innerHTML = `<i data-lucide="${data.icon}"></i><span>${data.text}</span>`;
      return chip;
    };

    const makeOutput = (data) => {
      const out = document.createElement("div");
      const isJP = data.text.toLowerCase().includes("jp");
      out.className = `opt-output-chip${isJP ? " jp" : ""}`;
      out.innerHTML = `
        <div class="opt-output-meta">
          <i data-lucide="${data.icon}"></i>
          <span>${data.text}</span>
        </div>
        <i data-lucide="check-circle-2" class="opt-output-check"></i>
      `;
      return out;
    };

    const run = (inputEl, outputEl, progressEl) => {
      if (!inputEl || !outputEl || !progressEl) return;
      let idx = 0;
      const timers = [];

      const schedule = (fn, delay) => {
        const id = setTimeout(fn, delay);
        timers.push(id);
      };

      const spawn = (keyword) => {
        const chip = makeChip(keyword);
        const randX = (Math.random() - 0.5) * 50;
        const randY = (Math.random() - 0.5) * 80;

        chip.style.transform = "translate(-50%, -50%) scale(0.8)";
        chip.style.opacity = "0";
        inputEl.appendChild(chip);
        if (window.lucide) window.lucide.createIcons();

        schedule(() => {
          chip.style.opacity = "1";
          chip.style.transform = `translate(calc(-50% + ${randX}px), calc(-50% + ${randY}px)) scale(1)`;
        }, 40);

        schedule(() => {
          if (isStackedLayout()) {
            chip.style.transform = `translate(calc(-50% + ${randX}px), calc(-50% + ${randY}px)) scale(0.92)`;
            chip.style.opacity = "0.55";
            return;
          }

          chip.style.transform = `translate(calc(-50% + ${randX + 280}px), calc(-50% + ${randY}px)) scale(0.55)`;
          chip.style.opacity = "0.6";
        }, 475);

        schedule(() => {
          chip.style.opacity = "0";
        }, 850);

        schedule(() => {
          chip.remove();
          const out = makeOutput(keyword);
          outputEl.appendChild(out);
          const progress = ((idx) / keywords.length) * 80 + 10;
          progressEl.style.width = `${progress}%`;
          if (window.lucide) window.lucide.createIcons();
        }, 950);
      };

      const loop = () => {
        if (idx < keywords.length) {
          spawn(keywords[idx]);
          idx += 1;
          schedule(loop, 600);
        } else {
          schedule(() => {
            inputEl.innerHTML = "";
            outputEl.innerHTML = "";
            progressEl.style.width = "0%";
            idx = 0;
            loop();
          }, 2100);
        }
      };

      loop();
      return () => timers.forEach((t) => clearTimeout(t));
    };

    configs.forEach((cfg) => {
      const inputEl = document.getElementById(cfg.inputId);
      const outputEl = document.getElementById(cfg.outputId);
      const progressEl = document.getElementById(cfg.progressId);
      run(inputEl, outputEl, progressEl);
    });
  })();

  // STEP03 monitor widget (clock + bar animation)
  (function initMonitorWidget() {
    const clockEl = document.getElementById("monitor-clock");
    if (clockEl) {
      const updateClock = () => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        clockEl.textContent = `${hh}:${mm}`;
      };
      updateClock();
      setInterval(updateClock, 60000);
    }

    const bars = document.querySelectorAll(".monitor-bar-fill");
    if (bars.length) {
      bars.forEach((bar, idx) => {
        const target = bar.dataset.width || bar.style.width || "0%";
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = target;
        }, 120 + idx * 120);
      });
    }
  })();

  // 폼 제출 알림 (실제 연동 전까지 사용자 경험용)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("무료 AI 감사 요청이 접수되었습니다. 곧 연락드리겠습니다.");
      contactForm.reset();
    });
  }

});

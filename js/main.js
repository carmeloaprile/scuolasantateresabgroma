/* Interazioni condivise: header, drawer mobile, tabs, form, reveal, menù mensile */
(function () {
  "use strict";

  // Header shadow on scroll
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile drawer
  const burger = document.querySelector(".hamburger");
  const drawer = document.querySelector(".drawer");
  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        drawer.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  // Current page highlight
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .drawer a").forEach((a) => {
    if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
  });

  // Tabs
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = root.querySelectorAll("[role=tab]");
    const panels = root.querySelectorAll("[role=tabpanel]");
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
        panels.forEach((p) => (p.hidden = true));
        tab.setAttribute("aria-selected", "true");
        document.getElementById(tab.getAttribute("aria-controls")).hidden = false;
      })
    );
  });

  // Menù mensile: aggiorna link PDF in base al mese scelto
  // In produzione: sostituire con un elenco fornito dal CMS (es. /menu/2026-11-infanzia.pdf)
  document.querySelectorAll("[data-menu-widget]").forEach((w) => {
    const select = w.querySelector("select");
    const links = w.querySelectorAll("[data-menu-link]");
    const label = w.querySelector("[data-menu-label]");
    const update = () => {
      const [y, m] = select.value.split("-");
      links.forEach((a) => {
        a.href = `menu/${y}-${m}-${a.dataset.menuLink}.pdf`;
      });
      if (label) label.textContent = select.options[select.selectedIndex].text;
    };
    select.addEventListener("change", update);
    update();
  });

  // Forms: invio via Web3Forms (fetch) con stato e gestione errori
  document.querySelectorAll("form.form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const err = form.querySelector(".form-error");
      if (err) {
        if (!err.dataset.defaultHtml) err.dataset.defaultHtml = err.innerHTML;
        err.innerHTML = err.dataset.defaultHtml;
        err.hidden = true;
      }
      if (!form.action || form.action.includes(location.host)) {
        form.classList.add("is-sent");
        return;
      }
      const captcha = form.querySelector(".h-captcha");
      const captchaToken = form.querySelector('[name="h-captcha-response"]')?.value;
      if (captcha && !captchaToken) {
        if (err) {
          err.textContent = "Per favore completa la verifica \"Non sono un robot\" prima di inviare.";
          err.hidden = false;
          captcha.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Invio in corso…";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) throw new Error(data.message || "Errore di invio");
        form.classList.add("is-sent");
        form.querySelector(".form-success")?.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (ex) {
        if (window.hcaptcha) try { window.hcaptcha.reset(); } catch (_) {}
        if (err) {
          err.hidden = false;
        } else {
          alert("Non è stato possibile inviare la richiesta. Riprova o scrivi a segreteria.stbg@gmail.com");
        }
      } finally {
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  });

  // Lightbox per locandine
  const lb = document.getElementById("lightbox");
  if (lb) {
    const img = lb.querySelector("img");
    const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
    document.querySelectorAll("[data-lightbox]").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        img.src = a.getAttribute("href");
        img.alt = a.querySelector("img")?.alt || a.textContent.trim();
        lb.hidden = false;
        document.body.style.overflow = "hidden";
      })
    );
    lb.addEventListener("click", (e) => { if (e.target !== img) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) close(); });
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("is-visible"), io.unobserve(en.target))),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();

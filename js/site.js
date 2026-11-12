(() => {
  const dict = window.ASE_I18N;
  const page = document.body.dataset.page || "home";

  const applyLang = (lang) => {
    const pack = dict[lang] || dict.tr;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (pack[key]) node.textContent = pack[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (pack[key]) node.setAttribute("placeholder", pack[key]);
    });
    document.querySelectorAll(".lang button").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.lang === lang);
    });
    localStorage.setItem("ase-lang", lang);
  };

  const nav = document.getElementById("nav-root");
  if (nav) {
    nav.innerHTML = `
      <header class="nav" id="nav">
        <a class="nav-logo" href="index.html"><img src="assets/logo.png" alt="ASE Group" width="120" height="48"></a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu"><span></span></button>
        <div class="nav-links" id="nav-links">
          <a href="index.html" data-i18n="nav_home">Ana Sayfa</a>
          <div class="drop">
            <button type="button" data-i18n="nav_work">Faaliyetler</button>
            <div class="drop-menu">
              <a href="faaliyetler.html" data-i18n="nav_work">Faaliyetler</a>
              <a href="yapi.html" data-i18n="nav_yapi">Yapı</a>
              <a href="ticaret.html" data-i18n="nav_trade">İthalat & İhracat</a>
              <a href="enerji.html" data-i18n="nav_energy">Araç Elektrik & Şarj</a>
              <a href="tadilat.html" data-i18n="nav_reno">Tadilat</a>
              <a href="kesif.html" data-i18n="nav_survey">Keşif & Görsel Hafıza</a>
            </div>
          </div>
          <a href="iletisim.html" data-i18n="nav_contact">İletişim</a>
          <div class="lang">
            <button type="button" data-lang="tr">TR</button>
            <button type="button" data-lang="en">EN</button>
          </div>
          <a class="nav-cta" href="iletisim.html" data-i18n="nav_cta">Teklif alın</a>
        </div>
      </header>`;
  }

  const foot = document.getElementById("footer-root");
  if (foot) {
    foot.innerHTML = `
      <footer class="site">
        <div class="container foot-grid">
          <div>
            <div class="foot-brand"><img src="assets/logo.png" alt="ASE Group"></div>
            <p data-i18n="foot_note">Yapı, ticaret ve enerji işlerinde keşif, tedarik ve uygulama.</p>
          </div>
          <div class="foot-col">
            <h4 data-i18n="foot_work">Faaliyetler</h4>
            <a href="yapi.html" data-i18n="nav_yapi">Yapı</a>
            <a href="ticaret.html" data-i18n="nav_trade">İthalat & İhracat</a>
            <a href="enerji.html" data-i18n="nav_energy">Araç Elektrik & Şarj</a>
            <a href="tadilat.html" data-i18n="nav_reno">Tadilat</a>
            <a href="kesif.html" data-i18n="nav_survey">Keşif</a>
          </div>
          <div class="foot-col">
            <h4 data-i18n="nav_contact">İletişim</h4>
            <a href="mailto:info@asegroup.com.tr">info@asegroup.com.tr</a>
            <a href="https://asegroup.com.tr">asegroup.com.tr</a>
            <a href="iletisim.html" data-i18n="nav_cta">Teklif alın</a>
          </div>
        </div>
        <div class="container legal">
          <span data-i18n="copy">© 2026 ASE Group</span>
          <span>asegroup.com.tr</span>
        </div>
      </footer>`;
  }

  const startLang = localStorage.getItem("ase-lang") || "tr";
  applyLang(startLang);

  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  const navEl = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  toggle?.addEventListener("click", () => navEl.classList.toggle("is-open"));
  window.addEventListener("scroll", () => {
    navEl?.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  const pre = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => pre?.classList.add("is-done"), 700);
  });
  setTimeout(() => pre?.classList.add("is-done"), 2200);

  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  } else {
    cursor?.remove();
  }

  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
    const mailto = `mailto:info@asegroup.com.tr?subject=${encodeURIComponent("ASE Group")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    const ok = document.getElementById("form-ok");
    if (ok) ok.style.display = "block";
  });

  void page;
})();

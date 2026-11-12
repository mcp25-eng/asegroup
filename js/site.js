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
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria");
      if (pack[key]) node.setAttribute("aria-label", pack[key]);
    });
    const wa = document.getElementById("wa-btn");
    if (wa && pack.wa_msg) {
      wa.href = `https://wa.me/905415752301?text=${encodeURIComponent(pack.wa_msg)}`;
    }
    document.querySelectorAll(".lang button").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.lang === lang);
    });
    localStorage.setItem("ase-lang", lang);
  };

  const nav = document.getElementById("nav-root");
  if (nav) {
    nav.innerHTML = `
      <header class="nav" id="nav">
        <a class="nav-logo" href="index.html"><img src="assets/logo-on-dark.png" alt="ASE Group" width="120" height="46"></a>
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
            <div class="foot-brand"><img src="assets/logo-on-dark.png" alt="ASE Group"></div>
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
            <a href="https://wa.me/905415752301">+90 541 575 23 01</a>
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

  if (!document.getElementById("wa-btn")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<a class="wa-btn" id="wa-btn" href="https://wa.me/905415752301?text=${encodeURIComponent(
        "Merhaba, ASE Group ile iletişime geçmek istiyorum."
      )}" target="_blank" rel="noopener noreferrer" data-i18n-aria="wa_label" aria-label="WhatsApp ile yazın">
        <span class="wa-tip" data-i18n="wa_tip">WhatsApp</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>`
    );
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

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

const currentPath = window.location.pathname;

const isCurrent = (prefix) =>
  currentPath === prefix || (prefix !== "/" && currentPath.startsWith(prefix));

if (navigation) {
  navigation.innerHTML = `
    <a href="/" ${isCurrent("/") ? 'aria-current="page"' : ""}>About Me</a>
    <div class="nav-dropdown ${isCurrent("/aejmc2026/") ? "current" : ""}">
      <button class="nav-dropdown-toggle" type="button" aria-expanded="false">
        AEJMC 2026 <span class="nav-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="dropdown-menu">
        <a href="/aejmc2026/paper/" ${isCurrent("/aejmc2026/paper/") ? 'aria-current="page"' : ""}>Full Paper</a>
        <a href="/aejmc2026/rip/" ${isCurrent("/aejmc2026/rip/") ? 'aria-current="page"' : ""}>Research in Progress</a>
      </div>
    </div>
    <div class="nav-dropdown ${isCurrent("/lens/") ? "current" : ""}">
      <button class="nav-dropdown-toggle" type="button" aria-expanded="false">
        Through My Lens <span class="nav-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="dropdown-menu">
        <a href="/lens/portraits/" ${isCurrent("/lens/portraits/") ? 'aria-current="page"' : ""}>Portrait Photography</a>
        <a href="/lens/videos/" ${isCurrent("/lens/videos/") ? 'aria-current="page"' : ""}>Video Projects</a>
      </div>
    </div>
    <a href="/awards/" ${isCurrent("/awards/") ? 'aria-current="page"' : ""}>Awards</a>
    <a href="/contact/" ${isCurrent("/contact/") ? 'aria-current="page"' : ""}>Contact</a>
    <a class="nav-cta" href="/lets-talk/" ${isCurrent("/lets-talk/") ? 'aria-current="page"' : ""}>Let’s Talk</a>
  `;
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
    document.body.classList.toggle("menu-open", isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
      document.body.classList.remove("menu-open");
    });
  });
}

const dropdowns = document.querySelectorAll(".nav-dropdown");

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");

  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !dropdown.classList.contains("open");

    dropdowns.forEach((item) => {
      item.classList.remove("open");
      item
        .querySelector(".nav-dropdown-toggle")
        ?.setAttribute("aria-expanded", "false");
    });

    dropdown.classList.toggle("open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", () => {
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("open");
    dropdown
      .querySelector(".nav-dropdown-toggle")
      ?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      dropdown
        .querySelector(".nav-dropdown-toggle")
        ?.setAttribute("aria-expanded", "false");
    });
  }
});

const emailForm = document.querySelector("#email-form");

emailForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(emailForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "Website inquiry").trim();
  const message = String(formData.get("message") || "").trim();
  const body = `Dear Siman,\n\n${message}\n\nBest,\n${name}\n${email}`;
  window.location.href = `mailto:sliu35@albany.edu?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const researchOrbit = document.querySelector(".orbit");

if (researchOrbit && "IntersectionObserver" in window) {
  researchOrbit.classList.add("orbit-enhanced");

  const orbitObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (!entry.isIntersecting) return;
      researchOrbit.classList.add("is-in-view");
      observer.unobserve(researchOrbit);
    },
    { threshold: 0.22 },
  );

  orbitObserver.observe(researchOrbit);
}

const portraitFigures = document.querySelectorAll(
  ".portrait-page .portrait-series-compact figure",
);

if (portraitFigures.length && "IntersectionObserver" in window) {
  document.body.classList.add("portrait-reveal-ready");

  portraitFigures.forEach((figure, index) => {
    figure.style.setProperty(
      "--portrait-reveal-delay",
      `${(index % 3) * 90}ms`,
    );
  });

  const portraitObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  portraitFigures.forEach((figure) => portraitObserver.observe(figure));
}

const videoProjects = document.querySelectorAll(".video-page .video-project");

if (videoProjects.length && "IntersectionObserver" in window) {
  document.body.classList.add("video-reveal-ready");

  videoProjects.forEach((project, index) => {
    project.style.setProperty("--video-reveal-delay", `${(index % 2) * 70}ms`);
  });

  const videoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  videoProjects.forEach((project) => videoObserver.observe(project));
}

const qrModal = document.querySelector("#wechat-qr-modal");
const qrOpenButton = document.querySelector("[data-qr-open]");
const qrCloseButtons = document.querySelectorAll("[data-qr-close]");
let qrReturnFocus = null;

const closeQrModal = () => {
  if (!qrModal || qrModal.hidden) return;
  qrModal.hidden = true;
  document.body.classList.remove("qr-modal-open");
  qrOpenButton?.setAttribute("aria-expanded", "false");
  qrReturnFocus?.focus();
};

qrOpenButton?.addEventListener("click", () => {
  if (!qrModal) return;
  qrReturnFocus = document.activeElement;
  qrModal.hidden = false;
  document.body.classList.add("qr-modal-open");
  qrOpenButton.setAttribute("aria-expanded", "true");
  qrModal.querySelector("[data-qr-close]")?.focus();
});

qrCloseButtons.forEach((button) => {
  button.addEventListener("click", closeQrModal);
});

qrModal?.addEventListener("click", (event) => {
  if (event.target === qrModal) closeQrModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeQrModal();
});

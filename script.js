let hasShownName = false;
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cursorElement = document.getElementById("cursor");
  const typedTextElement = document.getElementById("typed-text");

  if (cursorElement) {
    let cursor = true;
    const speed = 100;

    setInterval(() => {
      cursorElement.style.opacity = cursor ? 1 : 0;
      cursor = !cursor;
    }, speed);
  } else {
    console.error("Element with id 'cursor' not found.");
  }

  if (typedTextElement) {
    console.log("typed-text element found!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  let lastScrollY = window.scrollY;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;
  });
});
function waitForNameToShow() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (hasShownName) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

async function startTypingEffect() {
  await waitForNameToShow();
  const typedText = document.getElementById("typed-text");
  const cursor = document.getElementById("cursor");

  const wordsWithSlogans = [
    {
      word: "Empowering IoT and AI ",
      slogan: "for smarter, connected futures.",
    },
    {
      word: "Bridging embedded systems and AI ",
      slogan: "to drive innovation.",
    },
    {
      word: "From Python to AI,",
      slogan: " transforming code into intelligence.",
    },
    {
      word: "Crafting intelligent solutions ",
      slogan: " with AI, IoT, and embedded systems.",
    },
    { word: "Optimizing the world ", slogan: "with AI-powered systems." },
    {
      word: "Driving innovation ",
      slogan: "at the crossroads of AI and engineering.",
    },
    {
      word: "Integrating AI into embedded systems ",
      slogan: "for smarter solutions.",
    },
    {
      word: "Mastering AI, IoT, and embedded technologies ",
      slogan: "to shape the future.",
    },
    {
      word: "Innovating with AI and IoT ",
      slogan: "for a more connected tomorrow.",
    },
    {
      word: "Harnessing AI ",
      slogan: "to redefine the possibilities of embedded systems.",
    },
  ];

  let currentIndex = 0;
  let currentLetterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function type() {
    const { word, slogan } = wordsWithSlogans[currentIndex];
    const fullText = `${word} - ${slogan}`;

    if (isDeleting) {
      typedText.innerHTML =
        `<span class="word">${word.substring(0, currentLetterIndex)}</span>` +
        `<span class="slogan"> ${slogan.substring(
          0,
          currentLetterIndex - word.length - 3
        )}</span>`;
      currentLetterIndex--;
    } else {
      typedText.innerHTML =
        `<span class="word">${word.substring(0, currentLetterIndex)}</span>` +
        `<span class="slogan"> ${slogan.substring(
          0,
          currentLetterIndex - word.length - 3
        )}</span>`;
      currentLetterIndex++;
    }

    if (!isDeleting && currentLetterIndex === fullText.length) {
      setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && currentLetterIndex === 0) {
      currentIndex = (currentIndex + 1) % wordsWithSlogans.length;
      isDeleting = false;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const imagePopup = document.getElementById("image-popup");
const popupImage = document.getElementById("popup-image");

document.querySelectorAll(".section").forEach((section) => {
  section.addEventListener("mouseover", () => {
    const bgImage = section.getAttribute("data-bg-image");
    popupImage.src = bgImage;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursorElement = document.getElementById("cursor");
  const degreeElement = document.getElementById("degree");
  const nameElement = document.querySelector("header h1");
  const button = document.querySelector("header .btn");
  const preview = document.getElementById("previewBtn");
  const social_icon = document.querySelector("header .social-icon");

  setTimeout(() => {
    degreeElement.style.opacity = "1";
    degreeElement.style.transform = "translateY(0)";
  }, 500);

  setTimeout(() => {
    nameElement.style.opacity = "1";
    hasShownName = true;
  }, 1500);
  setTimeout(() => {
    cursorElement.style.opacity = "1";
    button.style.opacity = "1";
    preview.style.opacity = "1";
    cursorElement.style.animation = "blink 0.7s step-end infinite";
    social_icon.style.opacity = "1";
    social_icon.style.transform = "translateY(0)";
    startTypingEffect();
  }, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          const bgImage = entry.target.dataset.bgImage;
          if (bgImage) {
            if (bgImage.startsWith("#")) {
              entry.target.style.backgroundColor = bgImage;
            } else {
              entry.target.style.backgroundImage = "url(" + bgImage + ")";
              entry.target.style.backgroundSize = "cover";
              entry.target.style.backgroundPosition = "center";
            }
          }
          entry.target.style.transition =
            "opacity 0.5s ease, background 0.5s ease";
          entry.target.style.opacity = "1";
        }, 500);
      } else {
        setTimeout(function () {
          entry.target.style.opacity = "0";
          entry.target.style.transition = "opacity 0.5s ease";
        }, 500);
      }
    });
  }, options);

  document.querySelectorAll(".page").forEach(function (section) {
    observer.observe(section);
  });
});
function animateCounter(counter) {
  const target = +counter.getAttribute("data-count");
  const step = target / 100;
  let count = 0;

  const updateCounter = () => {
    count += step;
    if (count >= target) {
      counter.textContent = target;
    } else {
      counter.textContent = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
}

function resetCounter(counter) {
  counter.textContent = 0;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const counters = entry.target.querySelectorAll(".counter");
      if (entry.isIntersecting) {
        setTimeout(() => {
          counters.forEach((counter) => animateCounter(counter));
        }, 1500);
      } else {
        counters.forEach((counter) => resetCounter(counter));
      }
    });
  },
  { threshold: 0.5 }
);

const objectiveSection = document.querySelector("#objective");
observer.observe(objectiveSection);
document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.querySelector("#experience");
  const hiddenElements = experienceSection.querySelectorAll(".hidden");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.isIntersecting) {
        setTimeout(() => {
          target.classList.add("show");
          target.classList.remove("hidden");
        }, 500);
      } else {
        target.classList.remove("show");
        target.classList.add("hidden");
      }
    });
  });

  hiddenElements.forEach((element) => observer.observe(element));
});

const previewBtn = document.getElementById("previewBtn");
const modal = document.getElementById("previewModal");
const closeModal = document.getElementById("closeModal");

previewBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

emailjs.init("S6SYGP8fbxeLs2-o0");

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    console.log(form);

    const statusDialog = document.getElementById("statusDialog");
    const dialogIcon = document.getElementById("dialogIcon");
    const dialogMessage = document.getElementById("dialogMessage");

    function showDialog(icon, color, message) {
      dialogIcon.textContent = icon;
      dialogIcon.style.color = color;
      dialogMessage.textContent = message;

      statusDialog.classList.remove("hidden", "hide");
      statusDialog.classList.add("show");

      setTimeout(() => {
        statusDialog.classList.remove("show");
        statusDialog.classList.add("hide");

        setTimeout(() => {
          statusDialog.classList.add("hidden");
        }, 500);
      }, 4000);
    }

    emailjs.sendForm("service_7t0cyl1", "template_wsww9lu", form).then(
      function (response) {
        showDialog(
          "✔",
          "green",
          "Message sent successfully! Pham Nghia will contact you soon..."
        );
        form.reset();
      },
      function (error) {
        showDialog(
          "✖",
          "red",
          "Failed to send message. Please try again.",
          error
        );
        console.error("EmailJS Error:", error);
      }
    );
  });

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("nav ul li a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`a[href="#${entry.target.id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          link.classList.add("active");
          console.log(`${entry.target.id} is visible`);
        } else {
          link.classList.remove("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((link) => link.classList.remove("active"));
      e.target.classList.add("active");
    });
  });
});

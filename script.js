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

  // Kiểm tra nếu phần tử tồn tại
  if (cursorElement) {
    let cursor = true;
    const speed = 100;

    setInterval(() => {
      // Thay đổi opacity của #cursor
      cursorElement.style.opacity = cursor ? 1 : 0;
      cursor = !cursor;
    }, speed);
  } else {
    console.error("Element with id 'cursor' not found.");
  }

  // Kiểm tra #typed-text nếu cần thiết
  if (typedTextElement) {
    console.log("typed-text element found!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  let lastScrollY = window.scrollY; // Lưu vị trí cuộn trước

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (window.scrollY > lastScrollY) {
            // Khi cuộn xuống (scroll down)
            entry.target.classList.add("show"); // Hiện phần tử từ bên trái hoặc bên phải
            entry.target.classList.remove("hidden_left");
            entry.target.classList.remove("hidden_right");
          } else {
            // Khi cuộn lên (scroll up)
            entry.target.classList.add("show"); // Hiện phần tử từ bên trái hoặc bên phải
            entry.target.classList.remove("hidden_left");
            entry.target.classList.remove("hidden_right");
          }
        } else {
          // Khi phần tử ra khỏi màn hình, ẩn lại
          entry.target.classList.remove("show");
          entry.target.classList.add("hidden_right"); // Ẩn từ bên phải hoặc bên trái
        }
      });
    },
    {
      threshold: 0.1, // Khi 10% phần tử vào màn hình
    }
  );

  sections.forEach((section) => {
    section.classList.add("hidden_right"); // Ẩn phần tử ban đầu
    section.classList.add("hidden_left");
    observer.observe(section); // Quan sát các phần tử
  });

  // Cập nhật vị trí cuộn mỗi khi người dùng cuộn trang
  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;
  });
});
function waitForNameToShow() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (hasShownName) {
        clearInterval(interval); // Dừng kiểm tra
        resolve(); // Kết thúc Promise
      }
    }, 50); // Kiểm tra mỗi 50ms
  });
}

async function startTypingEffect() {
  await waitForNameToShow(); // Đợi đến khi `hasShownName = true`
  const typedText = document.getElementById("typed-text");
  const cursor = document.getElementById("cursor");

  const wordsWithSlogans = [
    { word: "Embedded", slogan: " - The foundation of embedded systems." },
    { word: "IoT", slogan: " - Connecting everything within reach." },
    { word: "C/C++", slogan: " - The language of performance and control." },
    { word: "Python", slogan: " - Powerful, easy to learn, versatile." },
    { word: "PyQt5", slogan: " - Build strong GUIs with Python." },
    {
      word: "AI/Computer Vision",
      slogan: " - Bringing intelligence into vision.",
    },
    { word: "HTML/CSS", slogan: " - Building and styling the web world." },
    { word: "JavaScript", slogan: " - Driving dynamic web experiences." },
    { word: "C#", slogan: " - Versatile power for all applications." },
    { word: "Window Form", slogan: " - Simple and efficient Windows apps." },
    { word: "React", slogan: " - Interactive UIs with React" },
    { word: "NodeJs", slogan: " - Efficient Backend with NodeJS" },
    { word: "Linux", slogan: " - The operating system of freedom." },
    {
      word: "MATLAB/Simulink",
      slogan: " - Simplifying simulation and data analysis.",
    },
    { word: "Arduino", slogan: " - Turning DIY ideas into reality." },
    { word: "ESP32", slogan: " - The core of your IoT projects." },
    { word: "STM32Fx", slogan: " - High-performance embedded solutions." },
    {
      word: "Raspberry Pi",
      slogan: " - Compact computing with endless possibilities.",
    },
    {
      word: "Jetson Nano",
      slogan: " - AI and GPU power at your fingertips.",
    },
    {
      word: "OOP",
      slogan: " - Object-oriented thinking, streamlined solutions.",
    },
    { word: "RTOS", slogan: " - Efficient real-time management." },
  ];

  let currentIndex = 0;
  let currentLetterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50; // Adjust typing speed

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
    e.preventDefault(); // Ngừng hành động mặc định

    // Cuộn mượt đến phần tử đích
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth", // Tạo hiệu ứng cuộn mượt
    });
  });
});
// Lấy phần tử image-popup và popup-image
const imagePopup = document.getElementById("image-popup");
const popupImage = document.getElementById("popup-image");

document.querySelectorAll(".section").forEach((section) => {
  const imagePopup = document.getElementById("image-popup");
  const popupImage = document.getElementById("popup-image");

  section.addEventListener("mouseover", () => {
    const bgImage = section.getAttribute("data-bg-image");
    popupImage.src = bgImage;
    imagePopup.classList.add("show");
  });

  section.addEventListener("mouseout", () => {
    imagePopup.classList.remove("show");
  });

  section.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    imagePopup.style.left = mouseX + 20 + "px";
    imagePopup.style.top = mouseY + 20 + "px";
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
  // Cấu hình IntersectionObserver
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Khi phần tử xuất hiện 50%
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          const bgImage = entry.target.dataset.bgImage; // Lấy giá trị từ data-bg-image
          if (bgImage) {
            if (bgImage.startsWith("#")) {
              // Nếu là mã màu
              entry.target.style.backgroundColor = bgImage;
            } else {
              // Nếu là URL hình ảnh
              entry.target.style.backgroundImage = "url(" + bgImage + ")";
              entry.target.style.backgroundSize = "cover";
              entry.target.style.backgroundPosition = "center";
            }
          }
          entry.target.style.transition =
            "opacity 0.5s ease, background 0.5s ease";
          entry.target.style.opacity = "1";
        }, 500); // Sau 1.3 giây
      } else {
        setTimeout(function () {
          entry.target.style.opacity = "0";
          entry.target.style.transition = "opacity 0.5s ease";
        }, 500); // Sau 1.3 giây
      }
    });
  }, options);

  // Quan sát các phần tử có class "page"
  document.querySelectorAll(".page").forEach(function (section) {
    observer.observe(section);
  });
});
function animateCounter(counter) {
  const target = +counter.getAttribute("data-count");
  const step = target / 100; // Increment step
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

// Reset counters to 0
function resetCounter(counter) {
  counter.textContent = 0;
}

// Observe when the section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const counters = entry.target.querySelectorAll(".counter");
      if (entry.isIntersecting) {
        setTimeout(() => {
          counters.forEach((counter) => animateCounter(counter));
        }, 1500); // Delay 1.5 seconds
      } else {
        counters.forEach((counter) => resetCounter(counter));
      }
    });
  },
  { threshold: 0.5 }
);

// Attach observer to the objective section
const objectiveSection = document.querySelector("#objective");
observer.observe(objectiveSection);
document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.querySelector("#experience");
  const hiddenElements = experienceSection.querySelectorAll(".hidden"); // Tất cả các phần tử có class 'hidden'

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.isIntersecting) {
        // Hiện phần tử sau 500ms
        setTimeout(() => {
          target.classList.add("show");
          target.classList.remove("hidden");
        }, 500);
      } else {
        // Ẩn lại nếu phần tử không còn trong viewport
        target.classList.remove("show");
        target.classList.add("hidden");
      }
    });
  });

  // Quan sát tất cả các phần tử ẩn
  hiddenElements.forEach((element) => observer.observe(element));
});
// Lấy các phần tử
const previewBtn = document.getElementById("previewBtn");
const modal = document.getElementById("previewModal");
const closeModal = document.getElementById("closeModal");

// Mở modal khi nhấn nút xem trước
previewBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Đóng modal khi nhấn vào dấu "x"
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Đóng modal khi nhấn bên ngoài modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

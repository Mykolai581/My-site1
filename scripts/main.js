//Animation
const animElements = document.querySelectorAll(".animation");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

animElements.forEach((anim) => {
  observer.observe(anim);
});

//Menu-Burger

const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");
const menuLink = document.querySelectorAll(".menu__link");

buttonMenu.addEventListener("click", () => {
  buttonMenu.classList.toggle("active");
  menu.classList.toggle("active");
});

menuLink.forEach((link) => {
  link.addEventListener("click", () => {
    buttonMenu.classList.remove("active");
    menu.classList.remove("active");
  });
});

//Creators

const creatorsItems = document.querySelectorAll(".creators__item.animation");
const btnShowCreators = document.querySelector(".creators__show-more");
const hiddenItems = document.querySelectorAll(
  ".creators__item:nth-child(n + 7)"
);

let isShow = false;

hiddenItems.forEach((item) => item.classList.add("_hidden"));

btnShowCreators.addEventListener("click", () => {
  if (!isShow) {
    hiddenItems.forEach((item) => {
      item.classList.remove("_hidden");
    });
    btnShowCreators.textContent = "Close";
  } else {
    hiddenItems.forEach((item) => {
      item.classList.add("_hidden");
    });
    btnShowCreators.textContent = "Show more";
  }
  isShow = !isShow;
});

function checkWidth() {
  if (window.innerWidth > 950) {
    hiddenItems.forEach((item) => {
      item.classList.remove("_hidden");
    });
    btnShowCreators.style.display = "none";
  } else {
    if (!isShow) {
      hiddenItems.forEach((item) => {
        item.classList.add("_hidden");
      });
    }
    btnShowCreators.style.display = "block";
  }
}

window.addEventListener("resize", checkWidth);
document.addEventListener("DOMContentLoaded", checkWidth);

const observerItems = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

creatorsItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observerItems.observe(item);
});

//Timer

const hoursEl = document.querySelector(".timer__hours");
const minutesEl = document.querySelector(".timer__minutes");
const secondsEl = document.querySelector(".timer__seconds");

let endTime;

if (localStorage.getItem("auctionEndTime")) {
  endTime = new Date(localStorage.getItem("auctionEndTime"));
} else {
  endTime = new Date(Date.now() + 59 * 60 * 60 * 1000);
  localStorage.setItem("auctionEndTime", endTime.toISOString());
}

function updateTimer() {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    clearInterval(timeInterval);
    localStorage.removeItem("auctionEndTime");
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  hoursEl.textContent = `${String(hours).padStart(2, "0")} :`;
  minutesEl.textContent = `${String(minutes).padStart(2, "0")} :`;
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

const timeInterval = setInterval(updateTimer, 1000);
updateTimer();

//Form validation

const formEl = document.querySelector(".subscribe__form");
const inputEl = document.querySelector(".subscribe__input");
const message = document.querySelector(".message");

const footerFormEl = document.querySelector(".footer__form");
const footerInputEl = document.querySelector(".footer__input");
const footerMessage = document.querySelector(".message__footer");

document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("subscriberEmail");
  if (savedEmail) {
    message.textContent = `You already subscribed with: ${savedEmail}`;
    message.style.color = "gray";
  }

  if (footerMessage) {
    footerMessage.textContent = `You already subscribed with: ${savedEmail}`;
    footerMessage.style.color = "gray";
  }
});

function handleSubscriptionForm(form, input, messageBox) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (email === "") {
      messageBox.textContent = "Please enter an email";
      messageBox.style.color = "white";
      input.style.border = "2px solid white";
      return;
    }

    if (isValidEmail(email)) {
      if (!email.endsWith(".com")) {
        messageBox.textContent = "Email must end with .com ";
        messageBox.style.color = "red";
        input.style.border = "2px solid red";
        return;
      }

      messageBox.textContent = "Email is valid";
      messageBox.style.color = "green";
      input.style.border = "2px solid green";
      localStorage.setItem("subscriberEmail", email);
      input.value = "";
    } else {
      messageBox.textContent = "Email is not valid";
      messageBox.style.color = "red";
      input.style.border = "2px solid red";
    }

    setTimeout(() => {
      messageBox.textContent = "";
      input.style.border = "";
    }, 3000);
  });
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

handleSubscriptionForm(formEl, inputEl, message);
handleSubscriptionForm(footerFormEl, footerInputEl, footerMessage);

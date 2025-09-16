// element toggle function
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active")
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]")
const sidebarBtn = document.querySelector("[data-sidebar-btn]")

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () => {
  elementToggleFunc(sidebar)
})

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]")
const modalContainer = document.querySelector("[data-modal-container]")
const modalCloseBtn = document.querySelector("[data-modal-close-btn]")
const overlay = document.querySelector("[data-overlay]")

// modal variable
const modalImg = document.querySelector("[data-modal-img]")
const modalTitle = document.querySelector("[data-modal-title]")
const modalText = document.querySelector("[data-modal-text]")

// modal toggle function
const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active")
  overlay.classList.toggle("active")
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML

    testimonialsModalFunc()
  })
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc)
overlay.addEventListener("click", testimonialsModalFunc)

// custom select variables
const select = document.querySelector("[data-select]")
const selectItems = document.querySelectorAll("[data-select-item]")
const selectValue = document.querySelector("[data-selecct-value]")
const filterBtn = document.querySelectorAll("[data-filter-btn]")

select.addEventListener("click", function () {
  elementToggleFunc(this)
})

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    elementToggleFunc(select)
    filterFunc(selectedValue)
  })
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]")

const filterFunc = (selectedValue) => {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active")
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active")
    } else {
      filterItems[i].classList.remove("active")
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0]

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    filterFunc(selectedValue)

    lastClickedBtn.classList.remove("active")
    this.classList.add("active")
    lastClickedBtn = this
  })
}

// contact form variables
const form = document.querySelector("[data-form]")
const formInputs = document.querySelectorAll("[data-form-input]")
const formBtn = document.querySelector("[data-form-btn]")

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", () => {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled")
    } else {
      formBtn.setAttribute("disabled", "")
    }
  })
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]")
const pages = document.querySelectorAll("[data-page]")

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active")
        navigationLinks[j].classList.add("active")
        window.scrollTo(0, 0)

        if (pages[j].dataset.page === "resume") {
          animateEducationItems()
          // Reset and reinitialize skill animations
          resetSkillAnimations()
          setTimeout(() => {
            animateSkillBars()
          }, 500)
        }

        if (pages[j].dataset.page === "experience") {
          animateExperienceItems()
        }
      } else {
        pages[j].classList.remove("active")
        navigationLinks[j].classList.remove("active")
      }
    }
  })
}

function animateEducationItems() {
  const educationItems = document.querySelectorAll(".education-item")

  // Reset all animations first
  educationItems.forEach((item) => {
    item.classList.remove("animate-in")
  })

  // Animate each item with delay
  educationItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate-in")

      // Add subtle bounce effect
      setTimeout(() => {
        item.style.transform = "translateY(-2px) scale(1.02)"
        setTimeout(() => {
          item.style.transform = ""
        }, 150)
      }, 300)
    }, index * 200) // 200ms delay between each item
  })
}

function animateExperienceItems() {
  const experienceItems = document.querySelectorAll(".experience-item")

  // Reset all animations first
  experienceItems.forEach((item) => {
    item.classList.remove("animate-in")
  })

  // Animate each item with staggered delay
  experienceItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate-in")

      // Add interactive hover effects after animation
      setTimeout(() => {
        const card = item.querySelector(".experience-card")
        if (card) {
          card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px)"
          })

          card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(-5px)"
          })
        }
      }, 600)
    }, index * 300) // 300ms delay between each item for dramatic effect
  })
}

function animateSkillBars() {
  const skillSections = document.querySelectorAll(".skill")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target
          const title = section.querySelector(".skills-title")
          const skillItems = section.querySelectorAll(".skills-item")

          // Animate title first
          setTimeout(() => {
            title.classList.add("animate-in")
          }, 100)

          // Animate skill items with staggered delay
          skillItems.forEach((item, index) => {
            setTimeout(
              () => {
                item.classList.add("animate-in")

                // Animate progress bar
                const progressFill = item.querySelector(".skill-progress-fill")
                const percentage = progressFill.getAttribute("data-skill-percentage")

                setTimeout(() => {
                  progressFill.style.width = percentage + "%"
                  progressFill.classList.add("animate")

                  // Remove animation class after completion
                  setTimeout(() => {
                    progressFill.classList.remove("animate")
                  }, 2000)
                }, 200)
              },
              index * 150 + 300,
            ) // Staggered animation with 150ms delay between items
          })

          // Stop observing this section once animated
          skillObserver.unobserve(section)
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  skillSections.forEach((section) => {
    skillObserver.observe(section)
  })
}

function resetSkillAnimations() {
  const skillSections = document.querySelectorAll(".skill")

  skillSections.forEach((section) => {
    const title = section.querySelector(".skills-title")
    const skillItems = section.querySelectorAll(".skills-item")

    // Reset title
    title.classList.remove("animate-in")

    // Reset skill items and progress bars
    skillItems.forEach((item) => {
      item.classList.remove("animate-in")
      const progressFill = item.querySelector(".skill-progress-fill")
      progressFill.style.width = "0%"
      progressFill.classList.remove("animate")
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".clients-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  skillItems.forEach((item) => {
    observer.observe(item)

    const skillCard = item.querySelector(".skill-card")
    if (skillCard) {
      skillCard.addEventListener("click", function (event) {
        // Add active state
        this.style.transform = "translateY(-5px) scale(0.98)"

        // Reset after animation
        setTimeout(() => {
          this.style.transform = ""
        }, 200)

        // Add ripple effect
        const ripple = document.createElement("div")
        ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 183, 3, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `

        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        ripple.style.width = ripple.style.height = size + "px"
        ripple.style.left = event.clientX - rect.left - size / 2 + "px"
        ripple.style.top = event.clientY - rect.top - size / 2 + "px"

        this.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      })

      skillCard.addEventListener("mouseenter", function () {
        this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      })
    }
  })

  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Check if resume page is active on load
  const resumePage = document.querySelector('[data-page="resume"]')
  if (resumePage && resumePage.classList.contains("active")) {
    setTimeout(() => {
      animateSkillBars()
    }, 500)
  }

  const experiencePage = document.querySelector('[data-page="experience"]')
  if (experiencePage && experiencePage.classList.contains("active")) {
    setTimeout(() => {
      animateExperienceItems()
    }, 500)
  }
})

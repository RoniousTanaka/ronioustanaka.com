document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")

      if (navList.style.display === "flex") {
        navList.style.display = "none"
      } else {
        navList.style.display = "flex"
        navList.style.flexDirection = "column"
        navList.style.position = "absolute"
        navList.style.top = "4rem"
        navList.style.left = "0"
        navList.style.width = "100%"
        navList.style.padding = "1rem"
        navList.style.backgroundColor = "white"
        navList.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        navList.style.zIndex = "50"
      }
    })
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navList.style.display = "none"
        if (mobileMenuBtn) {
          mobileMenuBtn.classList.remove("active")
        }
      }
    })
  })

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category")

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`)

      // Reset the form
      contactForm.reset()
    })
  }

  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-card, .project-card, .timeline-item, .contact-item")

    elements.forEach((element, index) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }

  // Set initial state for scroll animations
  const elementsToAnimate = document.querySelectorAll(".skill-card, .project-card, .timeline-item, .contact-item")
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Back to top button
  const backToTop = document.querySelector(".back-to-top")
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add("active")
      } else {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Initialize the active nav link on page load
  highlightNavLink()

  // Parallax effect for background circles
  window.addEventListener("mousemove", (e) => {
    const circles = document.querySelectorAll(".bg-circle")
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight

    circles.forEach((circle, index) => {
      const speed = (index + 1) * 20
      const xOffset = (x - 0.5) * speed
      const yOffset = (y - 0.5) * speed

      circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    })
  })
})

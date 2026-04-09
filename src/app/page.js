"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
    const roleTextRef = useRef(null);

    useEffect(() => {
        // Disable context menu
        const disableContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", disableContextMenu);

        /* --- Intersection Observer for Active Nav Link --- */
        const sections = document.querySelectorAll('.page-section');
        const navLinks = document.querySelectorAll('.nav-links li a');

        const observerOptions = {
            root: document.querySelector('.scroll-container'),
            threshold: 0.6 // 60% of the section must be visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to corresponding nav link
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        /* --- Smooth Scrolling for Nav Links --- */
        const smoothScrollFn = function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Native smooth scroll to the section
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        };

        navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollFn);
        });

        /* --- Dynamic Typing Effect --- */
        const roles = [
            "Aspiring Software Engineer",
            "Cyber Security Enthusiast",
            "Creative Graphic Designer",
            "Video & Photo Editor"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let typingTimeout;

        const roleTextElement = roleTextRef.current;

        function typeEffect() {
            if (!roleTextElement) return;

            const currentRole = roles[roleIndex];

            if (isDeleting) {
                // Remove a character
                roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Add a character
                roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150; // Normal typing speed
            }

            // If word is completely typed out
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            }
            // If word is completely deleted
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex++;
                if (roleIndex >= roles.length) {
                    roleIndex = 0; // Reset array index
                }
                typingSpeed = 500; // Pause before starting next word
            }

            typingTimeout = setTimeout(typeEffect, typingSpeed);
        }

        // Start typing effect
        typingTimeout = setTimeout(typeEffect, 1000);

        return () => {
            clearTimeout(typingTimeout);
            document.removeEventListener("contextmenu", disableContextMenu);
            observer.disconnect();
            navLinks.forEach(link => {
                link.removeEventListener('click', smoothScrollFn);
            });
        };
    }, []);

    return (
        <>
            {/* Fixed Navigation Area */}
            <header className="navbar">
                <div className="logo">BEESARA<span>.</span></div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="#home" className="active">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#certificate">Certificate</a></li>
                        <li><a href="#education">Education</a></li>
                        <li><a href="#project">Project</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Scroll snapping main container */}
            <main className="scroll-container">

                {/* Home Section */}
                <section id="home" className="page-section home-bg-img">
                    <div className="content-wrapper centered">
                        <div className="text-content">
                            <p className="greeting">Hi, I'm</p>
                            <h1 className="name">Beesara Methmal Witanage</h1>
                            <div className="dynamic-roles">
                                <span className="role-text" ref={roleTextRef}>Aspiring Software Engineer</span>
                                <span className="cursor">|</span>
                            </div>
                            <p className="full-intro">
                                Aspiring Software Engineer | Cyber Security Enthusiast | Creative Graphic Designer | Video &
                                Photo Editor
                            </p>
                        </div>
                    </div>
                    
                    <div className="scroll-indicator">
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="page-section">
                    <div className="content-wrapper row-reverse">
                        <div className="text-content">
                            <h2 className="section-title">About Me</h2>
                            <h3 className="subtitle">"Code by Day. Design by Night."</h3>
                            <p className="description">
                                I’m Beesara Methmal Witanage, an 18-year-old creator who lives at the intersection of Logic and
                                Art.
                            </p>
                            <p className="description">
                                My world revolves around building, securing, and designing digital systems. I am deeply
                                passionate about <strong>Software Engineering</strong> and <strong>Cyber Security</strong>, with
                                a specific focus on Ethical Hacking.
                            </p>
                            <p className="description">
                                At the same time, I have a strong creative side. I specialize in <strong>Graphic Design</strong>
                                and <strong>Video & Photo Editing</strong>. I'm a fast learner, a problem solver, and a visual
                                storyteller on a mission to master the digital landscape.
                            </p>
                        </div>
                        <div className="image-content glass-card">
                            <img src="/assets/images/photo2.png" alt="Beesara Methmal - About" className="portfolio-img" />
                        </div>
                    </div>
                </section>

                {/* Certificate Section */}
                <section id="certificate" className="page-section">
                    <div className="content-wrapper centered">
                        <h2 className="section-title">Certificates</h2>
                        <div className="glass-container placeholder-grid">
                            <a href="/assets/cetificate/ol ceti.png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>G.C.E. Ordinary Level — 2024 (2025)</p>
                            </a>
                            <a href="/assets/cetificate/grapic.png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Graphic Design Illustrator Course – PSD Academy</p>
                            </a>
                            <a href="/assets/cetificate/aec.png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Video Editing: After Effects – PSD Academy</p>
                            </a>
                            <a href="/assets/cetificate/pr.png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Video Editing: Premiere Pro – PSD Academy</p>
                            </a>
                            <a href="/assets/cetificate/hard.png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Hardware Engineering with Networking – Turnkey IT Campus</p>
                            </a>
                            <a href="/assets/cetificate/net.png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Windows Network Administration – Turnkey IT Campus</p>
                            </a>
                            <a href="/assets/cetificate/web (1).png" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Web Design for Beginners – University of Moratuwa (CODL)</p>
                            </a>
                            <a href="/assets/cetificate/UOM PYTHON.jpeg" target="_blank" rel="noopener noreferrer" className="grid-item">
                                <i className="fa-solid fa-award"></i>
                                <p>Python for Beginners – University of Moratuwa (CODL)</p>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section id="education" className="page-section">
                    <div className="content-wrapper education-detailed">
                        <h2 className="section-title">Education</h2>
                        <div className="edu-list">
                            <div className="glass-card education-card">
                                <div className="edu-content">
                                    <img src="/assets/images/d.a rajapksha vidyalaya.jpg" alt="D.A. Rajapaksha Vidyalaya"
                                        className="school-img" />
                                    <div className="edu-text">
                                        <h4 className="school-name"
                                            style={{ fontSize: "1.1rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "5px", letterSpacing: "2px" }}>
                                            D. A. Rajapaksha college</h4>
                                        <h3>G.C.E. O/L examination (2024/2025)</h3>
                                        <p>I have successfully completed the G.C.E. O/L examination (2024/2025) in nine
                                            subjects. My academic performance is highlighted by a Distinction (A) in
                                            Mathematics, along with Very Good passes (B) in both Science and English,
                                            contributing to an overall result of 3As, 4Bs, and 2Cs.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card education-card">
                                <div className="edu-content">
                                    <img src="/assets/images/Icbt campus.jpg" alt="ICBT Campus" className="school-img" />
                                    <div className="edu-text">
                                        <h4 className="school-name"
                                            style={{ fontSize: "1.1rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "5px", letterSpacing: "2px" }}>
                                            ICBT Campus</h4>
                                        <h3>International Diploma in ICT (Level 3)</h3>
                                        <p>Successfully completed the International Diploma in ICT (Level 3) at ICBT Campus.
                                            Gained core competencies in Python programming, web development, and computer
                                            systems, alongside creative skills in graphic design, providing a strong technical
                                            foundation for the ICT industry.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project Section */}
                <section id="project" className="page-section">
                    <div className="content-wrapper centered">
                        <h2 className="section-title">Projects</h2>
                        <div className="glass-container placeholder-grid projects">
                            <div className="grid-item project-card"><i className="fa-solid fa-palette"></i>
                                <p>Graphic Design</p>
                            </div>
                            <div className="grid-item project-card"><i className="fa-solid fa-film"></i>
                                <p>Video Editing</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="page-section contact-bg-img">
                    <div className="content-wrapper" style={{ justifyContent: "flex-start", paddingLeft: "5%" }}>
                        <div className="contact-left-align">
                            <h2 className="section-title" style={{ textAlign: "left" }}>Contact</h2>
                            <div className="glass-container contact-form-wrapper">
                                <form className="contact-form">
                                    <input type="text" placeholder="Name" required />
                                    <input type="email" placeholder="Email" required />
                                    <textarea rows="5" placeholder="Message..." required></textarea>
                                    <button type="submit" className="btn">Send Message</button>
                                </form>
                                <div className="social-links" style={{ justifyContent: "center" }}>
                                    <a href="#"><i className="fa-brands fa-github"></i></a>
                                    <a href="https://www.linkedin.com/in/beesara001/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}

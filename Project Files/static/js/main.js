document.addEventListener("DOMContentLoaded", function() {
    // Set current year in footer
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Sidebar Collapse Logic ---
    const sidebar = document.getElementById('main-sidebar');
    const pageWrapper = document.getElementById('main-wrapper');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (sidebarToggle && sidebar && pageWrapper) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            pageWrapper.classList.toggle('collapsed');
            localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
            
            // Dispatch resize event so Tableau can scale properly
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 350);
        });
    }

    // --- Page Transition Logic ---
    // Hide loader when page is fully loaded
    window.addEventListener("load", function() {
        const loader = document.getElementById("page-loader");
        const wrapper = document.querySelector(".page-wrapper");
        
        if (loader) loader.classList.add("hidden");
        if (wrapper) wrapper.classList.remove("fade-out");
    });

    // Show loader when navigating away via sidebar links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function(e) {
            // Only animate for same-domain links that aren't opening new tabs
            if (this.target !== "_blank") {
                const loader = document.getElementById("page-loader");
                const wrapper = document.querySelector(".page-wrapper");
                
                if (loader) loader.classList.remove("hidden");
                if (wrapper) wrapper.classList.add("fade-out");
            }
        });
    });

    // --- Dark Mode Logic ---
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    if (toggleSwitch) {
        // The actual attribute application is handled by the block script at top of body to prevent flash
        if (localStorage.getItem('theme') === 'dark') {
            toggleSwitch.checked = true;
        }

        toggleSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateParticlesColor("#ffffff");
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateParticlesColor("#1d1d1f");
            }    
        });
    }

    // --- tsParticles Loading Logic ---
    async function loadParticles() {
        if (typeof tsParticles === 'undefined') return;

        await loadColorUpdater(tsParticles);
        await loadCircleShape(tsParticles);
        await loadBaseMover(tsParticles);
        await loadSizeUpdater(tsParticles);
        await loadOpacityUpdater(tsParticles);
        await loadParticlesLinksInteraction(tsParticles);
        await loadBasic(tsParticles);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDark ? "#ffffff" : "#1d1d1f";

        await tsParticles.load({
            id: "tsparticles",
            options: {
                background: {
                    color: { value: "transparent" },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: false },
                        resize: true,
                    },
                },
                particles: {
                    color: { value: particleColor },
                    links: {
                        color: particleColor,
                        distance: 150,
                        enable: true,
                        opacity: 0.15,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: { default: "bounce" },
                        random: false,
                        speed: 0.8,
                        straight: false,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 40,
                    },
                    opacity: { value: 0.15 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            },
        });
    }

    function updateParticlesColor(colorHex) {
        if (typeof tsParticles !== 'undefined') {
            const container = tsParticles.domItem(0);
            if (container) {
                container.options.particles.color.value = colorHex;
                container.options.particles.links.color = colorHex;
                container.refresh();
            }
        }
    }

    loadParticles();
});

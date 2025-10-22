// Premium JavaScript for enhanced interactivity

// Function to generate star rating HTML
function generateStarRating(stars) {
    return stars.map(star => {
        switch (star.type) {
            case 'full':
                return '<i class="fas fa-star"></i>';
            case 'half':
                return '<i class="fas fa-star-half-alt"></i>';
            case 'empty':
                return '<i class="far fa-star"></i>';
            default:
                return '<i class="far fa-star"></i>';
        }
    }).join('');
}

// Function to generate product card HTML
function generateProductCard(product) {
    const starRating = generateStarRating(product.stars);
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.alt}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${starRating}
                    <span class="rating-count">(${product.rating})</span>
                </div>
            </div>
        </div>
    `;
}

// Function to render products for a section
function renderProducts(sectionKey, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container && productsData[sectionKey]) {
        const productsHTML = productsData[sectionKey].map(product =>
            generateProductCard(product)
        ).join('');
        container.innerHTML = productsHTML;
    }
}

// Function to render all products
function renderAllProducts() {
    renderProducts('most-sold', '.most-sold .products-grid');
    renderProducts('newest', '.newest .products-grid');
    renderProducts('others', '.others .products-grid');
}

// Function to attach event listeners to product cards
function attachProductCardListeners() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Enhanced product interaction
            const productName = this.querySelector('.product-name').textContent;
            const productRating = this.querySelector('.rating-count').textContent;

            // Create a more sophisticated modal-like interaction
            showProductPreview(productName, productRating);
        });
    });
}

// Function to show product preview modal
function showProductPreview(name, rating) {
    // Create a sophisticated preview overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        transform: scale(0.8);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;

    modal.innerHTML = `
        <div style="font-size: 3rem; color: #667eea; margin-bottom: 20px;">
            <i class="fas fa-gem"></i>
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: #1a1a1a;">${name}</h3>
        <p style="color: #6b7280; margin-bottom: 20px;">Rating: ${rating}</p>
        <p style="color: #6b7280; margin-bottom: 30px; font-size: 0.9rem;">In a real store, this would navigate to the detailed product page with full specifications, reviews, and purchase options.</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Continue Shopping
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Render all products first
    renderAllProducts();

    // Attach event listeners to the dynamically generated cards
    attachProductCardListeners();

    // Enhanced header animation with stagger effect
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const title = document.querySelector('.store-title');

    // Initial state
    header.style.transform = 'translateY(-20px)';
    header.style.opacity = '0';
    logo.style.transform = 'scale(0.8)';
    logo.style.opacity = '0';
    title.style.transform = 'translateY(10px)';
    title.style.opacity = '0';

    // Animate elements with stagger
    setTimeout(() => {
        header.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }, 200);

    setTimeout(() => {
        logo.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        logo.style.transform = 'scale(1)';
        logo.style.opacity = '1';
    }, 400);

    setTimeout(() => {
        title.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        title.style.transform = 'translateY(0)';
        title.style.opacity = '1';
    }, 600);

    // Add scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
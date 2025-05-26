// Cлайдер
const backBtn = document.querySelector('.back');
const nextBtn = document.querySelector('.next');
const leftImg = document.querySelector('.side:first-child img');
const centerImg = document.querySelector('.central img');
const rightImg = document.querySelector('.side:last-child img');
const images = [
  'photos/nb1.jpg','photos/nb2.jpg','photos/nb3.jpg',
  'photos/nb4.jpg','photos/nb5.jpg','photos/nb6.jpg',
  'photos/nb7.jpg','photos/nb8.jpg','photos/nb9.jpg'
];
let currentIndex = 1;

function initSlider() {
  if (!backBtn || !nextBtn || !leftImg || !centerImg || !rightImg) return;
  function updateSlider() {
    [leftImg, centerImg, rightImg].forEach(img => img.classList.add('fade-out'));
    setTimeout(() => {
      const li = (currentIndex - 1 + images.length) % images.length;
      const ri = (currentIndex + 1) % images.length;
      leftImg.src = images[li];
      centerImg.src = images[currentIndex];
      rightImg.src = images[ri];
      setTimeout(() => [leftImg, centerImg, rightImg].forEach(img => img.classList.remove('fade-out')), 20);
    }, 500);
  }
  backBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  });
  updateSlider();
}

// Поиск товаров
function initSearch() {
  const searchInput = document.getElementById('search');
  const productGrid = document.getElementById('productGrid');
  if (!searchInput || !productGrid) return;
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(term) ? 'block' : 'none';
    });
  });
}

// Корзина
function initCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  const cartCount = document.getElementById('cartCount');
  const cartItemsList = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const productGrid = document.getElementById('productGrid');
  if (cartToggle && cartSidebar && cartCount && cartItemsList && cartTotal) {
    cartToggle.addEventListener('click', () => cartSidebar.classList.toggle('open'));
    closeCart && closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

    productGrid && productGrid.addEventListener('click', e => {
      if (!e.target.classList.contains('add-to-cart')) return;
      const card = e.target.closest('.product-card');
      const name = card.querySelector('h3').innerText;
      const price = parseInt(card.querySelector('p').innerText);
      cart.push({ name, price });
      updateCartUI();
    });

    cartItemsList.addEventListener('click', e => {
      if (!e.target.classList.contains('remove-item')) return;
      const idx = +e.target.dataset.index;
      cart.splice(idx, 1);
      updateCartUI();
    });

    function updateCartUI() {
      cartItemsList.innerHTML = '';
      let total = 0;
      cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} — ${item.price}₽ <button class="remove-item" data-index="${i}">×</button>`;
        cartItemsList.append(li);
        total += item.price;
      });
      cartCount.innerText = cart.length;
      cartTotal.innerText = `Итого: ${total}₽`;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCartUI();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initSearch();
  initCart();
});
function show() {
    const footer = document.querySelector('footer');

    footer.addEventListener('mouseenter', () => {
        footer.classList.add('visible');
    });

    footer.addEventListener('mouseleave', () => {
        footer.classList.remove('visible');
    });
}

show();

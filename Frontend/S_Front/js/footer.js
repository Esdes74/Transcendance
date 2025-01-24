function show() {
    const footer = document.querySelector('footer');

    footer.addEventListener('mouseenter', () => {
        footer.classList.add('visible'); // Show the footer
    });

    footer.addEventListener('mouseleave', () => {
        footer.classList.remove('visible'); // Hide the footer
    });
}

show();

/**
 * Scroll
 */
let scrollY = window.scrollY

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY;
})

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5; // substracting by 0.5 to have value between -0.5 and 0.5
    cursor.y = event.clientY / sizes.height - 0.5;
})

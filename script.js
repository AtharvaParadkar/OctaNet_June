const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const container = document.querySelector('.card-container');
const card = document.querySelector('.card').getBoundingClientRect();
nextBtn.onclick = () => {
    container.scrollLeft += card.width;
}
prevBtn.onclick = () => {
    container.scrollLeft -= card.width;
}
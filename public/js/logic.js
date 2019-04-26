window.addEventListener('scroll', stickyFunc);
let header = document.getElementById('headerBox');
let sticky = header.offsetTop;
console.log('banana');
function stickyFunc() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

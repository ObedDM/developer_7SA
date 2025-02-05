var swiper = new Swiper(".mySwiper", {
    loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
      380: {
          slidesPerView: 1, 
      },
      600: {
          slidesPerView: 2,
      },
      900: {
          slidesPerView: 3,
      },
  },
});

async function fetchData() {
  const response = await fetch(
    "https://api.opensea.io/api/v2/collection/mutant-ape-yacht-club/nfts",
    {
      method: "GET",
      headers:{
        accept: "application/json",
        "x-api-key": "75155c934b84483e9f05b8493ee51155",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  data.nfts.forEach((nft) => {
    console.log(nft.display_image_url);
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.innerHTML = ` <div class="nft-box"> <img src="${nft.display_image_url}" class="nft-img" /> <h2 class="title">Monkey NFT</h2> <p class="price">From 8.48 ETH</p> <a href="#" class="buy-btn">Buy Now</a> </div>`;
    document.querySelector(".swiper-wrapper").appendChild(swiperSlide);
  });
}
fetchData();
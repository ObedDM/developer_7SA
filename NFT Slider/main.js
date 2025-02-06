//For development testing only
api_key = "75155c934b84483e9f05b8493ee51155" //For development testing only

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

async function fetchNftData() {
    const response = await fetch("https://api.opensea.io/api/v2/collection/mutant-ape-yacht-club/nfts?limit=10",
    {
        method: "GET",
        headers:{
        accept: "application/json",
        "x-api-key": api_key,
    }});

    const data = await response.json();

    return data
  }

  async function displayData() {
    data = await fetchNftData();

    let pricing = "Not currently listed for purchase";

    for (let nft of data.nfts) {

      let nft_price_data = await getPrice(nft.identifier);

        if (nft_price_data.available) {
            pricing = `From ${nft_price_data.listing_price} ${nft_price_data.coin_type}`;
        }
 
        const swiperSlider = document.createElement("div");
        
        swiperSlider.classList.add("swiper-slide");
        swiperSlider.innerHTML = `<div class="nft-box">
                                    <img src="${nft.display_image_url}" class="nft-img" />
                                    <h2 class="title">${nft.identifier}</h2>
                                    <p class="price">${pricing}</p>
                                    <a href="${nft.opensea_url}" class="buy-btn">Buy Now</a>
                                </div>`;
        document.querySelector(".swiper-wrapper").appendChild(swiperSlider);
    }
}

async function getPrice(nft_id) {

  let available = true;

    const response = await fetch(`https://api.opensea.io/api/v2/listings/collection/mutant-ape-yacht-club/nfts/${nft_id}/best`,
    {
        method: "GET",
        headers: {
        accept: "application/json",
        "x-api-key": api_key,
        }
    });

    const data = await response.json();

    if (Object.keys(data).length === 0) {
        available = false;
        console.log(nft_id, "unavailable");
        return {available};
    }

    else {
        const decimals = 10 ** (data.price.current.decimals);
        const listing_price = data.price.current.value / decimals;
        const coin_type = data.price.current.currency;

        console.log(nft_id, listing_price, coin_type);

        return {available, listing_price, coin_type};
    }
}

displayData();
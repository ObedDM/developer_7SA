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

async function fetchData() {
    const response = await fetch("https://api.opensea.io/api/v2/collection/mutant-ape-yacht-club/nfts",
    {
        method: "GET",
        headers:{
        accept: "application/json",
        "x-api-key": api_key,
    }});

    const data = await response.json();

    console.log(data);
    
    data.nfts.forEach((nft) => {
        console.log(nft.display_image_url);

        const swiperSlider = document.createElement("div");
        
        swiperSlider.classList.add("swiper-slide");
        swiperSlider.innerHTML = `<div class="nft-box">
                                    <img src="${nft.display_image_url}" class="nft-img" />
                                    <h2 class="title">${nft.identifier}</h2>
                                    <p class="price">From 8.48 ETH</p>
                                    <a href="${nft.opensea_url}" class="buy-btn">Buy Now</a>
                                </div>`;
        document.querySelector(".swiper-wrapper").appendChild(swiperSlider);
    });
}

fetchData();

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
        return {available};
    }

    if (available == true) {
        const decimals = 10 ** (data.price.current.decimals);
        const listing_price = data.price.current.value / decimals;
        const coin_type = data.price.current.currency;

        return {available, listing_price, coin_type};
    }
}

async function fetchNftPrice() {

    const nft_id = "8778"
    const nft_price_data = await getPrice(nft_id);

    if (nft_price_data.available === true) {
        console.log(`${nft_id} currently listed for: ${nft_price_data.listing_price} ${nft_price_data.coin_type}`);
    }

    else {
        console.log("Not currently listed for purchase");
    }
}

fetchNftPrice();
const API_BASE = "http://localhost:8000/api";
let currentLang = "en";

const translations = {
    en: {
        title: "Our Product",
        detail: "View Details",
        hero: "Product Catalog",
        productNav: "Product",
        socialMediaText: "Connect With Us",
        downloadText: "Download our Mobile App",
        informationText: "Information",
        locationText: "Location",
        faqText: "FAQ",
        privacyPolicyText: "Privacy Policy",
        tncText: "Terms and Condition",
        labelDescription: "Description",
        labelApplication: "Application",
        labelMetaTitle: "Meta Title",
        labelMetaKeyword: "Meta Keyword",
        labelMetaDescription: "Meta Description",
        nullLabel: "No product data available",
    },
    id: {
        title: "Produk Kami",
        detail: "Lihat Detail",
        hero: "Katalog Produk",
        productNav: "Produk",
        socialMediaText: "Terhubung Dengan Kami",
        downloadText: "Unduh Aplikasi Mobile kami",
        informationText: "Informasi",
        locationText: "Lokasi",
        faqText: "SSD",
        privacyPolicyText: "Kebijakan Privasi",
        tncText: "Syarat dan Ketentuan",
        labelDescription: "Deskripsi",
        labelApplication: "Aplikasi",
        labelMetaTitle: "Judul Meta",
        labelMetaKeyword: "Kata Kunci Meta",
        labelMetaDescription: "Deskripsi Meta",
        nullLabel: "Data produk tidak tersedia",
    },
};

function fetchProducts(lang = "en") {
    $.get(`${API_BASE}/${lang}/products/`, function (data) {
        $("#product-list").empty();
        if (!data.length) {
            $("#product-list").append(`
                <div class="col-12 text-center text-muted">
                    <p>${translations[lang].nullLabel}</p>
                </div>
            `);
            return;
        }

        data.slice(0, 10).forEach((product, index) => {
            $("#product-list").append(`
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${
                        product.image_url || "https://via.placeholder.com/150"
                    }" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                    <h5 class="card-title mb-3">${product.name}</h5>
                    <p class="card-text mb-1"><strong>HS Code:</strong> ${
                        product.hs_code
                    }</p>
                    <p class="card-text"><strong>CAS Number:</strong> ${
                        product.cas_number
                    }</p>
                    <button class="btn btn-primary btn-sm" onclick='showDetail(${JSON.stringify(
                        product
                    )})'>
                        ${translations[lang].detail}
                        </button>
                    </div>
                </div>
            </div>
        `);
        });
    });
}

function showDetail(product) {
    $("#product-title").text(product.name);
    $("#product-description").text(product.description);
    $("#product-application").text(product.application);
    $("#meta-title").text(product.meta.meta_title);
    $("#meta-keyword").text(product.meta.meta_keyword);
    $("#meta-description").text(product.meta.meta_description);
    $("#productModal").modal("show");
}

function updateUIText(lang) {
    $("#page-title").text(translations[lang].title);
    $("#hero-text").text(translations[lang].hero);
    $("#nav-product-text").text(translations[lang].productNav);
    $("#social-media-text").text(translations[lang].socialMediaText);
    $("#download-text").text(translations[lang].downloadText);
    $("#information-text").text(translations[lang].informationText);
    $("#location-text").text(translations[lang].locationText);
    $("#faq-text").text(translations[lang].faqText);
    $("#privacy-policy-text").text(translations[lang].privacyPolicyText);
    $("#tnc-text").text(translations[lang].tncText);

    $("#label-description").text(translations[lang].labelDescription + ":");
    $("#label-application").text(translations[lang].labelApplication + ":");
    $("#label-meta-title").text(translations[lang].labelMetaTitle + ":");
    $("#label-meta-keyword").text(translations[lang].labelMetaKeyword + ":");
    $("#label-meta-description").text(
        translations[lang].labelMetaDescription + ":"
    );
}

$("#lang-select").on("change", function () {
    currentLang = $(this).val();
    fetchProducts(currentLang);
    updateUIText(currentLang);
});

$(document).ready(function () {
    fetchProducts(currentLang);
    updateUIText(currentLang);
});

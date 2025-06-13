// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready!');
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Product details functionality
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const productCards = document.querySelectorAll('.product-card');
    
    // Product database - simulating product details
    const productDetails = {
        1: {
            name: "Patat",
            image: "/fotos/Fries-box.png",
            description: "Onze heerlijke, knapperige patat wordt gemaakt van zorgvuldig geselecteerde aardappelen. We bereiden onze patat volgens een traditioneel receptuur, wat resulteert in een perfect knapperige buitenkant en een zachte, fluffy binnenkant.",
            ingredients: "Aardappelen, plantaardige olie, zout",
            price: "€2,50 - €4,50 (afhankelijk van formaat)",
            prepTime: "3-4 minuten"
        },
        2: {
            name: "Frikandel",
            image: "/fotos/Frenchf.png",
            description: "Onze beroemde frikandellen worden gemaakt volgens een geheim recept. Ze worden perfect gekruid en zijn altijd vers bereid. Ideaal om te combineren met onze heerlijke patat en mayonaise.",
            ingredients: "Kippenvlees, kruiden, specerijen",
            price: "€1,75 per stuk",
            prepTime: "3-5 minuten"
        },
        3: {
            name: "Kaassoufflé",
            image: "/fotos/Frenchg.png",
            description: "Een heerlijke kaassoufflé met gesmolten kaas binnenin. Perfect voor de echte kaasliefhebber. Het krokante laagje aan de buitenkant en de romige kaas aan de binnenkant maken dit een populaire snack.",
            ingredients: "Bloem, kaas (48%), plantaardig vet, water, zout, kruiden",
            price: "€1,90 per stuk",
            prepTime: "4 minuten"
        },
        4: {
            name: "Kroket",
            image: "/fotos/Frenchg.png",
            description: "Onze kroketten hebben een knapperige buitenkant en een romige, smaakvolle ragout binnenin. Een Nederlandse klassieker die bij ons perfect wordt bereid voor een ultieme snackervaring.",
            ingredients: "Rundvlees, bloem, boter, melk, paneermeel, kruiden",
            price: "€2,10 per stuk",
            prepTime: "4-5 minuten"
        },
        5: {
            name: "Bitterballen",
            image: "/fotos/Frenchbl.png",
            description: "Onze bitterballen zijn perfect rond en hebben een knapperige korst met een zachte, romige vulling. Deze klassieke Nederlandse snack is perfect voor bij een drankje of als onderdeel van een grotere bestelling.",
            ingredients: "Rundvlees, bloem, boter, bouillon, paneermeel, kruiden",
            price: "€4,50 (8 stuks)",
            prepTime: "4-5 minuten"
        },
        6: {
            name: "Kipnuggets",
            image: "/fotos/Friesa.png",
            description: "Onze kipnuggets zijn gemaakt van puur kipfilet, gekruid en gefrituurd tot perfectie. Ze zijn krokant aan de buitenkant en sappig aan de binnenkant, perfect voor liefhebbers van kip.",
            ingredients: "Kipfilet (85%), paneermeel, plantaardige olie, kruiden",
            price: "€4,75 (6 stuks)",
            prepTime: "4-5 minuten"
        }
    };
    
    // Add click event to each product card
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const product = productDetails[productId];
            
            // Update modal with product details
            document.getElementById('modalProductImage').src = product.image;
            document.getElementById('modalProductTitle').textContent = product.name;
            document.getElementById('modalProductDescription').textContent = product.description;
            document.getElementById('modalProductIngredients').textContent = product.ingredients;
            document.getElementById('modalProductPrice').textContent = product.price;
            document.getElementById('modalProductPrepTime').textContent = product.prepTime;
            
            // Show the modal
            productModal.show();
        });
    });
});
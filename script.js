/* ------------------------------------------------------------
   Patat Palace - demo fries shop
   Menu, cart, demo checkout, opening hours, NL/EN, contact form.
------------------------------------------------------------ */
(() => {
    'use strict';

    /* ---------- Helpers ---------- */
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const el = (tag, cls, text) => {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text != null) node.textContent = text;
        return node;
    };
    const store = {
        get(key, fallback) {
            try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
            catch (e) { return fallback; }
        },
        set(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
        },
    };

    const SHOP = {
        tz: 'Europe/Amsterdam',
        open: 11 * 60, close: 22 * 60, openLabel: '11:00', closeLabel: '22:00',
        deliveryFee: 2.5,
        mail: 'itprocoding@gmail.com',
        formEndpoint: 'https://formsubmit.co/ajax/itprocoding@gmail.com',
    };

    /* ---------- Translations (Dutch is the default) ---------- */
    const I18N = {
        nl: {
            'meta.title': 'Patat Palace — verse patat en Hollandse snacks',
            'meta.desc': 'Patat Palace: verse patat, frikandellen, kroketten en kaassoufflés. Bekijk het menu en bestel online (demo-winkel).',
            'skip': 'Ga naar het menu',
            'demo.banner': 'Demo-winkel — bestellingen en betalingen zijn niet echt.',
            'nav.aria': 'Hoofdmenu', 'nav.toggle': 'Menu openen',
            'nav.menu': 'Menu', 'nav.about': 'Over ons', 'nav.contact': 'Contact',
            'lang.label': 'Switch to English',
            'theme.toDark': 'Schakel naar donker thema', 'theme.toLight': 'Schakel naar licht thema',
            'theme.dark': 'Donker', 'theme.light': 'Licht',
            'cart.open': 'Bestelling', 'cart.aria': 'Bekijk je bestelling',
            'hero.title': 'De lekkerste patat van de stad',
            'hero.sub': 'Vers gebakken patat, Hollandse snacks en kaassoufflés. Bestel online of kom gewoon langs.',
            'hero.cta': 'Bekijk het menu', 'hero.cta2': 'Openingstijden',
            'open.now': 'Nu open · tot {t}',
            'open.today': 'Gesloten · opent vandaag om {t}',
            'open.tomorrow': 'Gesloten · opent morgen om {t}',
            'menu.title': 'Ons menu', 'menu.sub': 'Elke dag vers bereid met de beste ingrediënten.',
            'filter.aria': 'Filter het menu', 'filter.all': 'Alles', 'filter.patat': 'Patat', 'filter.snacks': 'Snacks',
            'card.add': 'Toevoegen', 'card.choose': 'Kies formaat', 'card.from': 'vanaf {p}', 'card.details': 'Details van {n}',
            'p.ingredients': 'Ingrediënten', 'p.allergens': 'Allergenen (demo-info)', 'p.time': 'Bereidingstijd',
            'p.size': 'Formaat', 'p.add': 'Toevoegen', 'p.qty': 'Aantal', 'p.minus': 'Minder', 'p.plus': 'Meer',
            'close': 'Sluiten',
            'size.S': 'Klein', 'size.M': 'Medium', 'size.L': 'Groot',
            'cart.title': 'Jouw bestelling', 'cart.empty': 'Je bestelling is nog leeg.', 'cart.emptyCta': 'Bekijk het menu',
            'cart.total': 'Totaal', 'cart.checkout': 'Afrekenen', 'cart.continue': 'Verder winkelen',
            'cart.remove': 'Verwijderen', 'cart.each': '{p} per stuk',
            'toast.added': '{n} toegevoegd aan je bestelling.',
            'co.title': 'Afrekenen', 'co.summary': 'Jouw bestelling', 'co.subtotal': 'Subtotaal', 'co.fee': 'Bezorgkosten', 'co.total': 'Totaal',
            'co.demo': 'Dit is een demo: er wordt niets verstuurd en er wordt niets betaald.',
            'co.name': 'Naam', 'co.email': 'E-mail', 'co.phone': 'Telefoon',
            'co.method': 'Afhalen of bezorgen', 'co.pickup': 'Afhalen (gratis)', 'co.delivery': 'Bezorgen (+{p})',
            'co.address': 'Adres', 'co.postal': 'Postcode', 'co.city': 'Plaats',
            'co.payment': 'Betaalmethode', 'co.ideal': 'iDEAL', 'co.cash': 'Contant bij afhalen/bezorgen',
            'co.notes': 'Opmerkingen (optioneel)', 'co.place': 'Bestelling plaatsen (demo)',
            'done.title': 'Bedankt voor je bestelling!', 'done.number': 'Bestelnummer',
            'done.pickup': 'Afhalen bij Patat Palace', 'done.deliver': 'Bezorging naar {a}',
            'done.demo': 'Dit was een demo-bestelling: er is niets verstuurd en er is niets betaald.',
            'done.close': 'Sluiten',
            'about.title': 'Over Patat Palace',
            'about.p1': 'Onze patat is vers, knapperig en altijd gemaakt van de beste ingrediënten. Probeer ook onze andere snacks, zoals frikandellen, kroketten en kaassoufflés.',
            'about.p2': 'Of je nu even snel iets wilt eten of een hele maaltijd: bij Patat Palace ben je aan het juiste adres. Ons vriendelijke team helpt je graag met je bestelling.',
            'hours.title': 'Openingstijden', 'hours.all': 'Elke dag', 'hours.note': 'Bestel online of kom langs.',
            'contact.title': 'Neem contact op', 'contact.sub': 'Vragen of opmerkingen? Stuur ons een bericht.',
            'contact.name': 'Naam', 'contact.email': 'E-mail', 'contact.message': 'Bericht', 'contact.send': 'Versturen',
            'contact.sending': 'Verzenden…', 'contact.sent': 'Bedankt {n}! Je bericht is verstuurd.',
            'contact.fail': 'Versturen lukte niet — je e-mailprogramma wordt geopend.',
            'contact.fillAll': 'Vul alle velden in.', 'contact.badEmail': 'Vul een geldig e-mailadres in.',
            'footer.demo': '(demo)', 'footer.built': 'Een demo-project, gebouwd door Emmanuel (Cublex01).',
            'footer.portfolio': 'Mijn portfolio', 'footer.code': 'Code op GitHub',
        },
        en: {
            'meta.title': 'Patat Palace — fresh fries and Dutch snacks',
            'meta.desc': 'Patat Palace: fresh fries, frikandellen, croquettes and cheese soufflés. Browse the menu and order online (demo shop).',
            'skip': 'Skip to the menu',
            'demo.banner': 'Demo shop — orders and payments are not real.',
            'nav.aria': 'Main menu', 'nav.toggle': 'Open menu',
            'nav.menu': 'Menu', 'nav.about': 'About', 'nav.contact': 'Contact',
            'lang.label': 'Naar het Nederlands',
            'theme.toDark': 'Switch to dark theme', 'theme.toLight': 'Switch to light theme',
            'theme.dark': 'Dark', 'theme.light': 'Light',
            'cart.open': 'Order', 'cart.aria': 'View your order',
            'hero.title': 'The best fries in town',
            'hero.sub': 'Freshly fried fries, Dutch snacks and cheese soufflés. Order online or just drop by.',
            'hero.cta': 'View the menu', 'hero.cta2': 'Opening hours',
            'open.now': 'Open now · until {t}',
            'open.today': 'Closed · opens today at {t}',
            'open.tomorrow': 'Closed · opens tomorrow at {t}',
            'menu.title': 'Our menu', 'menu.sub': 'Freshly made every day with the best ingredients.',
            'filter.aria': 'Filter the menu', 'filter.all': 'All', 'filter.patat': 'Fries', 'filter.snacks': 'Snacks',
            'card.add': 'Add', 'card.choose': 'Choose size', 'card.from': 'from {p}', 'card.details': 'Details of {n}',
            'p.ingredients': 'Ingredients', 'p.allergens': 'Allergens (demo info)', 'p.time': 'Preparation time',
            'p.size': 'Size', 'p.add': 'Add', 'p.qty': 'Quantity', 'p.minus': 'Less', 'p.plus': 'More',
            'close': 'Close',
            'size.S': 'Small', 'size.M': 'Medium', 'size.L': 'Large',
            'cart.title': 'Your order', 'cart.empty': 'Your order is still empty.', 'cart.emptyCta': 'View the menu',
            'cart.total': 'Total', 'cart.checkout': 'Checkout', 'cart.continue': 'Continue shopping',
            'cart.remove': 'Remove', 'cart.each': '{p} each',
            'toast.added': '{n} added to your order.',
            'co.title': 'Checkout', 'co.summary': 'Your order', 'co.subtotal': 'Subtotal', 'co.fee': 'Delivery fee', 'co.total': 'Total',
            'co.demo': 'This is a demo: nothing is sent and nothing is paid.',
            'co.name': 'Name', 'co.email': 'Email', 'co.phone': 'Phone',
            'co.method': 'Pickup or delivery', 'co.pickup': 'Pickup (free)', 'co.delivery': 'Delivery (+{p})',
            'co.address': 'Address', 'co.postal': 'Postal code', 'co.city': 'City',
            'co.payment': 'Payment method', 'co.ideal': 'iDEAL', 'co.cash': 'Cash on pickup/delivery',
            'co.notes': 'Notes (optional)', 'co.place': 'Place order (demo)',
            'done.title': 'Thank you for your order!', 'done.number': 'Order number',
            'done.pickup': 'Pickup at Patat Palace', 'done.deliver': 'Delivery to {a}',
            'done.demo': 'This was a demo order: nothing was sent and nothing was paid.',
            'done.close': 'Close',
            'about.title': 'About Patat Palace',
            'about.p1': 'Our fries are fresh, crispy and always made from the best ingredients. Try our other snacks too, like frikandellen, croquettes and cheese soufflés.',
            'about.p2': 'Whether you want a quick bite or a full meal, Patat Palace is the right place for you. Our friendly team is happy to help with your order.',
            'hours.title': 'Opening hours', 'hours.all': 'Every day', 'hours.note': 'Order online or drop by.',
            'contact.title': 'Get in touch', 'contact.sub': 'Questions or comments? Send us a message.',
            'contact.name': 'Name', 'contact.email': 'Email', 'contact.message': 'Message', 'contact.send': 'Send',
            'contact.sending': 'Sending…', 'contact.sent': 'Thank you {n}! Your message has been sent.',
            'contact.fail': "Couldn't send it — your email app will open instead.",
            'contact.fillAll': 'Please fill in all fields.', 'contact.badEmail': 'Please enter a valid email address.',
            'footer.demo': '(demo)', 'footer.built': 'A demo project, built by Emmanuel (Cublex01).',
            'footer.portfolio': 'My portfolio', 'footer.code': 'Code on GitHub',
        },
    };

    const IMG = 'https://www.pngarts.com/files/3/';
    const PRODUCTS = [
        {
            id: 'fries', cat: 'patat', img: IMG + 'Fries-PNG-Photo.png',
            sizes: ['S', 'M', 'L'], prices: { S: 2.5, M: 3.5, L: 4.5 }, defaultSize: 'M', time: { nl: '3–4 minuten', en: '3–4 minutes' },
            name: { nl: 'Patat', en: 'Fries' },
            text: { nl: 'Heerlijke, knapperige patat met jouw favoriete saus.', en: 'Delicious, crispy fries served with your favorite sauce.' },
            desc: {
                nl: 'Onze knapperige patat is gemaakt van zorgvuldig gekozen aardappelen. We bereiden ze volgens een traditioneel recept: knapperig aan de buitenkant en zacht en luchtig van binnen.',
                en: 'Our delicious, crispy fries are made from carefully selected potatoes. We prepare them according to a traditional recipe, resulting in a perfectly crispy exterior and a soft, fluffy interior.',
            },
            ingredients: { nl: 'Aardappelen, plantaardige olie, zout', en: 'Potatoes, vegetable oil, salt' },
            allergens: { nl: 'Geen van de 14 hoofdallergenen (kruisbesmetting in de friteuse mogelijk)', en: 'None of the 14 main allergens (cross-contact in the fryer is possible)' },
        },
        {
            id: 'frikandel', cat: 'snacks', img: IMG + 'French-Fries-PNG-Image.png',
            price: 1.75, time: { nl: '3–5 minuten', en: '3–5 minutes' },
            name: { nl: 'Frikandel', en: 'Dutch sausage (frikandel)' },
            text: { nl: 'Onze beroemde frikandel, perfect gekruid en altijd vers.', en: 'Our famous Dutch sausage, perfectly seasoned and always fresh.' },
            desc: {
                nl: 'Onze beroemde frikandel is gemaakt volgens een geheim recept. Perfect gekruid en altijd vers bereid. Heerlijk met patat en mayonaise.',
                en: 'Our famous Dutch sausages are made according to a secret recipe. They are perfectly seasoned and always freshly prepared. Ideal with our fries and mayonnaise.',
            },
            ingredients: { nl: 'Kippenvlees, kruiden, specerijen', en: 'Chicken meat, herbs, spices' },
            allergens: { nl: 'Gluten, ei, selderij, mosterd', en: 'Gluten, egg, celery, mustard' },
        },
        {
            id: 'souffle', cat: 'snacks', img: IMG + 'Fries-PNG-Download-Image.png',
            price: 1.9, time: { nl: '4 minuten', en: '4 minutes' },
            name: { nl: 'Kaassoufflé', en: 'Cheese soufflé' },
            text: { nl: 'Een heerlijke kaassoufflé, perfect voor echte kaasliefhebbers.', en: 'A delicious cheese soufflé, perfect for true cheese lovers.' },
            desc: {
                nl: 'Een heerlijke kaassoufflé met gesmolten kaas erin. Perfect voor echte kaasliefhebbers. De knapperige korst en de romige kaas maken dit tot een populaire snack.',
                en: 'A delicious cheese soufflé with melted cheese inside. Perfect for true cheese lovers. The crispy layer on the outside and the creamy cheese on the inside make this a popular snack.',
            },
            ingredients: { nl: 'Bloem, kaas (48%), plantaardig vet, water, zout, kruiden', en: 'Flour, cheese (48%), vegetable fat, water, salt, herbs' },
            allergens: { nl: 'Gluten, melk, ei', en: 'Gluten, milk, egg' },
        },
        {
            id: 'kroket', cat: 'snacks', img: IMG + 'French-Fries-PNG-Free-Download.png',
            price: 2.1, time: { nl: '4–5 minuten', en: '4–5 minutes' },
            name: { nl: 'Kroket', en: 'Croquette' },
            text: { nl: 'Een knapperige kroket met een romige vulling.', en: 'A crispy croquette with a creamy filling.' },
            desc: {
                nl: 'Onze kroketten hebben een knapperige korst en een romige, smaakvolle ragout. Een Hollandse klassieker, vers bereid voor de ultieme snackervaring.',
                en: 'Our croquettes have a crispy exterior and a creamy, flavorful ragout inside. A Dutch classic, freshly prepared for the ultimate snack experience.',
            },
            ingredients: { nl: 'Rundvlees, bloem, boter, melk, paneermeel, kruiden', en: 'Beef, flour, butter, milk, breadcrumbs, herbs' },
            allergens: { nl: 'Gluten, melk, ei, selderij', en: 'Gluten, milk, egg, celery' },
        },
        {
            id: 'bitterballen', cat: 'snacks', img: IMG + 'French-Fries-PNG-Image-Background.png',
            price: 4.5, note: { nl: '8 stuks', en: '8 pieces' }, time: { nl: '4–5 minuten', en: '4–5 minutes' },
            name: { nl: 'Bitterballen', en: 'Dutch meatballs (bitterballen)' },
            text: { nl: 'Heerlijke Hollandse bitterballen, perfect bij een drankje.', en: 'Delicious Dutch meatballs, perfect with a drink.' },
            desc: {
                nl: 'Onze bitterballen zijn mooi rond met een knapperige korst en een zachte, romige vulling. Deze Hollandse klassieker is perfect bij een drankje of als onderdeel van een grotere bestelling.',
                en: 'Our Dutch meatballs are perfectly round with a crispy crust and a soft, creamy filling. This classic Dutch snack is perfect with a drink or as part of a larger order.',
            },
            ingredients: { nl: 'Rundvlees, bloem, boter, bouillon, paneermeel, kruiden', en: 'Beef, flour, butter, broth, breadcrumbs, herbs' },
            allergens: { nl: 'Gluten, melk, ei, selderij', en: 'Gluten, milk, egg, celery' },
        },
        {
            id: 'nuggets', cat: 'snacks', img: IMG + 'French-Fries-PNG-High-Quality-Image.png',
            price: 4.75, note: { nl: '6 stuks', en: '6 pieces' }, time: { nl: '4–5 minuten', en: '4–5 minutes' },
            name: { nl: 'Kipnuggets', en: 'Chicken nuggets' },
            text: { nl: 'Knapperige kipnuggets, gemaakt van echte kipfilet.', en: 'Crispy chicken nuggets, made from real chicken breast.' },
            desc: {
                nl: 'Onze kipnuggets zijn gemaakt van pure kipfilet, gekruid en goudbruin gebakken. Knapperig van buiten, sappig van binnen: perfect voor kipliefhebbers.',
                en: 'Our chicken nuggets are made from pure chicken breast, seasoned and fried to perfection. They are crispy on the outside and juicy on the inside, perfect for chicken lovers.',
            },
            ingredients: { nl: 'Kipfilet (85%), paneermeel, plantaardige olie, kruiden', en: 'Chicken breast (85%), breadcrumbs, vegetable oil, herbs' },
            allergens: { nl: 'Gluten, ei', en: 'Gluten, egg' },
        },
    ];

    /* ---------- State ---------- */
    let lang = store.get('lang', 'nl') === 'en' ? 'en' : 'nl';
    let filter = 'all';
    let cart = (store.get('patatCart2', []) || []).filter((i) => i && PRODUCTS.some((p) => p.id === i.id) && i.qty > 0);
    let lastOrder = null;          // kept so the confirmation can be re-translated
    let current = null;            // product dialog state: { product, size, qty }

    const t = (key, vars) => {
        let text = (I18N[lang] && I18N[lang][key]) || I18N.nl[key] || key;
        if (vars) Object.keys(vars).forEach((k) => { text = text.replace(`{${k}}`, vars[k]); });
        return text;
    };
    const fmt = (n) => new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(n);
    const L = (obj) => obj[lang] || obj.nl;
    const find = (id) => PRODUCTS.find((p) => p.id === id);
    const unitPrice = (p, size) => (p.sizes ? p.prices[size || p.defaultSize] : p.price);
    const minPrice = (p) => (p.sizes ? Math.min(...p.sizes.map((s) => p.prices[s])) : p.price);
    const sizeLabel = (s) => t('size.' + s);

    /* ---------- Elements ---------- */
    const grid = $('#menuGrid');
    const cartDialog = $('#cartDialog');
    const productDialog = $('#productDialog');
    const checkoutDialog = $('#checkoutDialog');
    const doneDialog = $('#doneDialog');
    const toastEl = $('#toast');

    /* ---------- Dialog helpers ---------- */
    function openDialog(dlg) {
        if (!dlg.open) dlg.showModal();
        document.body.classList.add('lock');
    }
    $$('dialog').forEach((dlg) => {
        dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
        dlg.addEventListener('close', () => {
            if (!$$('dialog').some((d) => d.open)) document.body.classList.remove('lock');
        });
    });
    $$('[data-close]').forEach((btn) => btn.addEventListener('click', () => btn.closest('dialog').close()));

    /* ---------- Toast ---------- */
    let toastTimer = 0;
    function toast(message) {
        toastEl.textContent = message;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
    }

    /* ---------- Images: if a picture can't load, show the logo instead ---------- */
    function guardImage(img) {
        img.addEventListener('error', () => {
            if (img.dataset.fallback) return;
            img.dataset.fallback = '1';
            img.src = 'images/logo.svg';
        });
    }
    $$('img').forEach(guardImage);

    /* ---------- Translations in the page ---------- */
    function applyStatic() {
        document.documentElement.lang = lang;
        document.title = t('meta.title');
        const desc = $('meta[name="description"]');
        if (desc) desc.setAttribute('content', t('meta.desc'));
        $$('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
        $$('[data-i18n-label]').forEach((node) => node.setAttribute('aria-label', t(node.dataset.i18nLabel)));
        $$('.js-lang').forEach((btn) => {
            btn.textContent = lang === 'nl' ? 'EN' : 'NL';
            btn.setAttribute('aria-label', t('lang.label'));
        });
        syncThemeLabels();
        $('#lblPickup').textContent = t('co.pickup');
        $('#lblDelivery').textContent = t('co.delivery', { p: fmt(SHOP.deliveryFee) });
        $('#year').textContent = new Date().getFullYear();
    }

    /* ---------- Opening hours badge ---------- */
    function minutesInShop() {
        const parts = new Intl.DateTimeFormat('en-GB', { timeZone: SHOP.tz, hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
        const h = Number(parts.find((p) => p.type === 'hour').value);
        const m = Number(parts.find((p) => p.type === 'minute').value);
        return h * 60 + m;
    }
    function renderOpen() {
        const mins = minutesInShop();
        const open = mins >= SHOP.open && mins < SHOP.close;
        $('#openBadge').classList.toggle('is-open', open);
        $('#openText').textContent = open
            ? t('open.now', { t: SHOP.closeLabel })
            : t(mins < SHOP.open ? 'open.today' : 'open.tomorrow', { t: SHOP.openLabel });
    }

    /* ---------- Menu ---------- */
    function renderMenu() {
        grid.textContent = '';
        PRODUCTS.filter((p) => filter === 'all' || p.cat === filter).forEach((p) => {
            const card = el('article', 'card');

            const media = el('div', 'card-img');
            const img = el('img');
            img.src = p.img;
            img.alt = '';
            img.loading = 'lazy';
            guardImage(img);
            media.append(img);

            const body = el('div', 'card-body');
            const title = el('h3', 'card-title');
            const open = el('button', 'card-open', L(p.name));
            open.type = 'button';
            open.setAttribute('aria-label', t('card.details', { n: L(p.name) }));
            open.addEventListener('click', () => openProduct(p.id));
            title.append(open);

            const price = el('span', 'price');
            price.append(p.sizes ? t('card.from', { p: fmt(minPrice(p)) }) : fmt(p.price));
            if (p.note) price.append(' ', el('small', null, '· ' + L(p.note)));

            const add = el('button', 'btn primary add', p.sizes ? t('card.choose') : t('card.add'));
            add.type = 'button';
            add.addEventListener('click', () => (p.sizes ? openProduct(p.id) : addToCart(p.id, null, 1)));

            const foot = el('div', 'card-foot');
            foot.append(price, add);
            body.append(title, el('p', 'card-text', L(p.text)), foot);
            card.append(media, body);
            grid.append(card);
        });
    }

    $$('.filter').forEach((btn) => btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        $$('.filter').forEach((b) => {
            const on = b === btn;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', String(on));
        });
        renderMenu();
    }));

    /* ---------- Product dialog ---------- */
    const pQty = $('#pQty');
    function openProduct(id) {
        const product = find(id);
        current = { product, size: product.defaultSize || null, qty: 1 };
        renderProduct();
        openDialog(productDialog);
    }
    function renderProduct() {
        if (!current) return;
        const { product, size } = current;
        const pImg = $('#pImg');
        delete pImg.dataset.fallback;
        pImg.src = product.img;
        $('#pTitle').textContent = L(product.name);
        $('#pDesc').textContent = L(product.desc);
        $('#pIng').textContent = L(product.ingredients);
        $('#pAll').textContent = L(product.allergens);
        $('#pTime').textContent = L(product.time);

        const sizes = $('#pSizes');
        sizes.hidden = !product.sizes;
        const opts = $('#pSizeOpts');
        opts.textContent = '';
        if (product.sizes) {
            product.sizes.forEach((s) => {
                const label = el('label');
                const input = el('input');
                input.type = 'radio';
                input.name = 'pSize';
                input.value = s;
                input.checked = s === size;
                input.addEventListener('change', () => { current.size = s; updateProductTotal(); });
                label.append(input, `${sizeLabel(s)} · ${fmt(product.prices[s])}`);
                opts.append(label);
            });
        }
        pQty.value = current.qty;
        updateProductTotal();
    }
    function updateProductTotal() {
        if (!current) return;
        const total = unitPrice(current.product, current.size) * current.qty;
        $('#pTotal').textContent = fmt(total);
    }
    function setQty(n) {
        current.qty = Math.max(1, Math.min(20, Math.round(Number(n) || 1)));
        pQty.value = current.qty;
        updateProductTotal();
    }
    $('#pMinus').addEventListener('click', () => current && setQty(current.qty - 1));
    $('#pPlus').addEventListener('click', () => current && setQty(current.qty + 1));
    pQty.addEventListener('change', () => current && setQty(pQty.value));
    $('#pAdd').addEventListener('click', () => {
        if (!current) return;
        addToCart(current.product.id, current.product.sizes ? current.size : null, current.qty);
        productDialog.close();
    });

    /* ---------- Cart ---------- */
    const keyOf = (i) => `${i.id}:${i.size || ''}`;
    function saveCart() { store.set('patatCart2', cart); }
    const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
    const cartSubtotal = () => cart.reduce((sum, i) => sum + unitPrice(find(i.id), i.size) * i.qty, 0);

    function addToCart(id, size, qty) {
        const existing = cart.find((i) => i.id === id && (i.size || null) === (size || null));
        if (existing) existing.qty = Math.min(50, existing.qty + qty);
        else cart.push({ id, size: size || null, qty });
        saveCart();
        renderCart();
        const badge = $('#cartCount');
        badge.classList.remove('bump');
        void badge.offsetWidth;
        badge.classList.add('bump');
        toast(t('toast.added', { n: L(find(id).name) }));
    }
    function changeQty(key, delta) {
        const item = cart.find((i) => keyOf(i) === key);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter((i) => i !== item);
        saveCart();
        renderCart();
    }
    function removeItem(key) {
        cart = cart.filter((i) => keyOf(i) !== key);
        saveCart();
        renderCart();
    }

    function itemName(i) {
        const p = find(i.id);
        return i.size ? `${L(p.name)} (${sizeLabel(i.size)})` : L(p.name);
    }

    function renderCart() {
        const count = cartCount();
        const badge = $('#cartCount');
        badge.hidden = count === 0;
        badge.textContent = count;

        const body = $('#cartBody');
        body.textContent = '';
        if (!cart.length) {
            const empty = el('div', 'empty');
            empty.append(el('p', null, t('cart.empty')));
            const btn = el('button', 'btn ghost', t('cart.emptyCta'));
            btn.type = 'button';
            btn.addEventListener('click', () => { cartDialog.close(); location.hash = '#menu'; });
            empty.append(btn);
            body.append(empty);
        } else {
            cart.forEach((i) => {
                const p = find(i.id);
                const key = keyOf(i);
                const row = el('div', 'item');
                const img = el('img');
                img.src = p.img;
                img.alt = '';
                guardImage(img);

                const info = el('div');
                info.append(el('div', 'item-name', itemName(i)), el('div', 'item-sub', t('cart.each', { p: fmt(unitPrice(p, i.size)) })));

                const right = el('div', 'item-right');
                const stepper = el('div', 'stepper');
                const minus = el('button', null, '−');
                minus.type = 'button';
                minus.setAttribute('aria-label', t('p.minus') + ': ' + itemName(i));
                minus.addEventListener('click', () => changeQty(key, -1));
                const qty = el('input');
                qty.type = 'number';
                qty.readOnly = true;
                qty.value = i.qty;
                qty.setAttribute('aria-label', t('p.qty') + ': ' + itemName(i));
                const plus = el('button', null, '+');
                plus.type = 'button';
                plus.setAttribute('aria-label', t('p.plus') + ': ' + itemName(i));
                plus.addEventListener('click', () => changeQty(key, 1));
                stepper.append(minus, qty, plus);

                const remove = el('button', 'item-remove', t('cart.remove'));
                remove.type = 'button';
                remove.setAttribute('aria-label', t('cart.remove') + ': ' + itemName(i));
                remove.addEventListener('click', () => removeItem(key));
                right.append(el('strong', null, fmt(unitPrice(p, i.size) * i.qty)), stepper, remove);

                row.append(img, info, right);
                body.append(row);
            });
        }
        $('#cartTotal').textContent = fmt(cartSubtotal());
        $('#checkoutBtn').disabled = cart.length === 0;
        if (checkoutDialog.open) renderCheckoutSummary();
    }

    $('#cartBtn').addEventListener('click', () => { renderCart(); openDialog(cartDialog); });

    /* ---------- Checkout (demo) ---------- */
    const form = $('#checkoutForm');
    const isDelivery = () => form.elements.method.value === 'delivery';

    function renderCheckoutSummary() {
        const list = $('#coItems');
        list.textContent = '';
        cart.forEach((i) => {
            const li = el('li');
            li.append(el('span', null, `${i.qty} × ${itemName(i)}`), el('span', null, fmt(unitPrice(find(i.id), i.size) * i.qty)));
            list.append(li);
        });
        const sub = cartSubtotal();
        const fee = isDelivery() ? SHOP.deliveryFee : 0;
        $('#coSub').textContent = fmt(sub);
        $('#coFeeRow').hidden = !isDelivery();
        $('#coFee').textContent = fmt(SHOP.deliveryFee);
        $('#coTotal').textContent = fmt(sub + fee);
    }
    function syncAddress() {
        const delivery = isDelivery();
        $('#addressFields').hidden = !delivery;
        ['coAddress', 'coPostal', 'coCity'].forEach((id) => { $('#' + id).required = delivery; });
        renderCheckoutSummary();
    }
    $$('input[name="method"]', form).forEach((r) => r.addEventListener('change', syncAddress));

    $('#checkoutBtn').addEventListener('click', () => {
        if (!cart.length) return;
        cartDialog.close();
        syncAddress();
        openDialog(checkoutDialog);
    });

    function validateForm(f) {
        let first = null;
        $$('input, textarea', f).forEach((field) => {
            if (field.type === 'radio' || field.closest('[hidden]')) return;
            const bad = !field.checkValidity();
            field.classList.toggle('invalid', bad);
            if (bad && !first) first = field;
        });
        if (first) first.focus();
        return !first;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!cart.length || !validateForm(form)) return;
        const delivery = isDelivery();
        const fee = delivery ? SHOP.deliveryFee : 0;
        lastOrder = {
            number: Math.floor(10000 + Math.random() * 90000),
            lines: cart.map((i) => ({ id: i.id, size: i.size, qty: i.qty })),
            total: cartSubtotal() + fee,
            delivery,
            address: delivery ? `${form.elements.address.value}, ${form.elements.postal.value} ${form.elements.city.value}` : '',
        };
        cart = [];
        saveCart();
        renderCart();
        form.reset();
        $$('.invalid', form).forEach((n) => n.classList.remove('invalid'));
        checkoutDialog.close();
        renderDone();
        openDialog(doneDialog);
    });

    function renderDone() {
        if (!lastOrder) return;
        $('#doneNumber').textContent = '#' + lastOrder.number;
        const list = $('#doneItems');
        list.textContent = '';
        lastOrder.lines.forEach((line) => {
            const p = find(line.id);
            const name = line.size ? `${L(p.name)} (${sizeLabel(line.size)})` : L(p.name);
            const li = el('li');
            li.append(el('span', null, `${line.qty} × ${name}`), el('span', null, fmt(unitPrice(p, line.size) * line.qty)));
            list.append(li);
        });
        $('#doneTotal').textContent = fmt(lastOrder.total);
        $('#doneMethod').textContent = lastOrder.delivery ? t('done.deliver', { a: lastOrder.address }) : t('done.pickup');
    }

    /* ---------- Contact form: really sends (FormSubmit), falls back to the mail app ---------- */
    const contact = $('#contactForm');
    const msg = $('#formMsg');
    function setMsg(text, kind) {
        msg.textContent = text;
        msg.className = 'form-msg' + (kind ? ' ' + kind : '');
    }
    contact.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = contact.elements.name.value.trim();
        const email = contact.elements.email.value.trim();
        const message = contact.elements.message.value.trim();
        if (!name || !email || !message) return setMsg(t('contact.fillAll'), 'err');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg(t('contact.badEmail'), 'err');
        if (contact.elements._honey.value) return;            // a bot filled the hidden field

        const btn = $('#cSend');
        btn.disabled = true;
        btn.textContent = t('contact.sending');
        setMsg('');
        try {
            const res = await fetch(SHOP.formEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name, email, message, _subject: `Bericht via Patat Palace van ${name}`, _template: 'table' }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || String(data.success) !== 'true') throw new Error('send failed');
            contact.reset();
            setMsg(t('contact.sent', { n: name }), 'ok');
        } catch (err) {
            setMsg(t('contact.fail'), 'err');
            const body = `Naam: ${name}\nE-mail: ${email}\n\n${message}`;
            window.location.href = `mailto:${SHOP.mail}?subject=${encodeURIComponent('Bericht via Patat Palace')}&body=${encodeURIComponent(body)}`;
        } finally {
            btn.disabled = false;
            btn.textContent = t('contact.send');
        }
    });

    /* ---------- Navigation ---------- */
    const nav = $('#nav');
    const toggle = $('#navToggle');
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    $$('a', nav).forEach((a) => a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }));

    /* ---------- Language ---------- */
    function renderAll() {
        applyStatic();
        renderOpen();
        renderMenu();
        renderCart();
        if (productDialog.open) renderProduct();
        if (checkoutDialog.open) renderCheckoutSummary();
        if (doneDialog.open) renderDone();
        if (contact.elements.name.value === '' && !msg.classList.contains('err')) setMsg('');
        $('#cSend').textContent = t('contact.send');
    }
    $$('.js-lang').forEach((btn) => btn.addEventListener('click', () => {
        lang = lang === 'nl' ? 'en' : 'nl';
        store.set('lang', lang);
        renderAll();
    }));

    /* ---------- Theme (dark / light) ---------- */
    // The theme is already set on <html> by a tiny script in <head>, so the page never flashes.
    const themeMeta = $('meta[name="theme-color"]');
    const currentTheme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    function syncThemeLabels() {
        const goDark = currentTheme() === 'light';
        $$('.js-theme').forEach((btn) => {
            btn.setAttribute('aria-label', t(goDark ? 'theme.toDark' : 'theme.toLight'));
            const text = $('.theme-text', btn);
            if (text) text.textContent = t(goDark ? 'theme.dark' : 'theme.light');
        });
    }
    function setTheme(theme, save) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#17110c' : '#d62828');
        if (save) { try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ } }
        syncThemeLabels();
    }
    $$('.js-theme').forEach((btn) => btn.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true)));
    // Follow the system setting while the visitor hasn't chosen a theme themselves
    if (window.matchMedia) {
        matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            let saved = null;
            try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
            if (saved !== 'light' && saved !== 'dark') setTheme(e.matches ? 'dark' : 'light', false);
        });
    }
    setTheme(currentTheme(), false);

    /* ---------- Start ---------- */
    renderAll();
    setInterval(renderOpen, 60 * 1000);
})();

# Patat Palace

A demo website for a Dutch fries shop: browse the menu, build an order and "check out", all in the browser.

**Live demo:** https://pata-palace.vercel.app

> This is a **demo shop**. Orders and payments are not real: nothing is sent and nothing is charged. Only the contact form sends a real message.

## Features

- **Menu** with filters (all, fries, snacks), product details with ingredients, allergen info and preparation time, and size options for the fries.
- **Order cart** that remembers your items (saved in the browser), with quantity controls and a live total.
- **Demo checkout** with pickup or delivery (delivery adds a fee), payment choice and a clear demo notice. It ends with an order confirmation.
- **"Open now / Closed" badge** based on the shop hours (11:00 - 22:00, Dutch time).
- **Dutch and English**: Dutch by default, with a switch in the header. The choice is remembered.
- **Contact form** that really sends a message (through [FormSubmit](https://formsubmit.co/)), and falls back to your email app if sending fails.
- Responsive, keyboard friendly, screen-reader labels, and respects "reduce motion".

## Built with

Plain HTML, CSS and JavaScript. No framework and no build step.

## Run it locally

Open `index.html` in your browser, or serve the folder:

```bash
python -m http.server 8000
```

then visit http://localhost:8000.

Built by [Cublex01](https://github.com/Cublex01) - see more at [portfolio.emmanuelgany.tech](https://portfolio.emmanuelgany.tech/).

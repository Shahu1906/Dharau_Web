/* ==========================================================================
   DHARAU — EDIT YOUR WEBSITE CONTENT HERE
   You do not need to touch any other file to add photos or contact details.

   ADD A PHOTO:
     1. Put the photo in assets/products/ or assets/gallery/
     2. Type its path in the matching  image: ""  below
        e.g.  image: "assets/products/paneer.jpg"
     The "Add photo" box disappears by itself.
   ========================================================================== */

window.DHARAU = {
  /* Leave a value empty ("") and that contact card shows "Coming soon". */
  contact: {
    phone: "",            // e.g. "+91 98765 43210"
    whatsapp: "",         // digits only, with country code, e.g. "919876543210"
    email: "",            // e.g. "hello@yourdomain.com"
    address: "",          // e.g. "Village, District, State"
    mapLink: "",          // Google Maps link to your dairy
    instagram: "",        // full link
    facebook: ""          // full link
  },

  /* The first product is your real ghee photo. The rest are examples:
     rename, delete, or add more. `art` is the illustration used until you
     add a photo: ghee, milk, paneer, dahi, butter, lassi, mithai. */
  products: [
    { name: "Golden Ghee", local: "घी",    art: "ghee",   tint: "#F6D98A", image: "assets/ghee-jar.webp", cutout: true,
      text: "Rich, grainy and full of aroma. The jar that started it all." },
    { name: "Fresh Milk",  local: "दूध",   art: "milk",   tint: "#E4E8C4", image: "",
      text: "Clean, creamy milk for your morning chai and everything after." },
    { name: "Soft Paneer", local: "पनीर",  art: "paneer", tint: "#F4E3C3", image: "",
      text: "Soft, milky blocks that soak up every masala you give them." },
    { name: "Set Dahi",    local: "दही",   art: "dahi",   tint: "#EBCFB4", image: "",
      text: "Thick, gently set curd. A cool spoonful of home." },
    { name: "White Butter", local: "मक्खन", art: "butter", tint: "#F8E7A9", image: "",
      text: "Light, fresh and made for hot rotis." },
    { name: "Sweet Lassi", local: "लस्सी",  art: "lassi",  tint: "#DDE3BC", image: "",
      text: "Chilled, frothy and the best part of a hot afternoon." },
    { name: "Mithai",      local: "मिठाई",  art: "mithai", tint: "#F2CFA6", image: "",
      text: "Festive sweets made with the good stuff from our own dairy." }
  ],

  /* Gallery boxes. Add as many as you like. */
  gallery: [
    { caption: "Our cows",        image: "" },
    { caption: "Morning milking", image: "" },
    { caption: "Inside the dairy", image: "" },
    { caption: "Our farmers",     image: "" },
    { caption: "Fresh ghee",      image: "assets/ghee-jar.webp", cutout: true },
    { caption: "Packing day",     image: "" },
    { caption: "Our village",     image: "" },
    { caption: "Our family",      image: "" }
  ]
};

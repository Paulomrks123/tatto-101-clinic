export const BIZ = {
  name: "Gaivota Tattoo Estúdio",
  phoneDisplay: "(21) 99575-8470",
  phoneE164: "+5521995758470",
  waDisplay: "(21) 99575-8470",
  waNumber: "5521995758470", // owner-confirmed WhatsApp
  landline: "(21) 3674-6899",
  instagram: "https://www.instagram.com/gaivota.tattoo/",
  address: "Av. Roberto Silveira, 368 — Icaraí, Niterói - RJ, 24230-161",
  hours: "Segunda a sábado, 8h às 18h · Domingo fechado",
  rating: "5,0",
  reviews: 186,
  site: "https://gaivotatattoo.com.br/",
  facebook: "https://facebook.com/1022255147961927",
  maps: "https://www.google.com/maps/search/?api=1&query=Gaivota%20Tattoo%20Est%C3%BAdio%20Icara%C3%AD%20Niter%C3%B3i%20RJ",
  mapEmbed: "https://www.google.com/maps?q=Gaivota+Tattoo+Est%C3%BAdio+Icara%C3%AD,+Av.+Roberto+Silveira+368,+Niter%C3%B3i&output=embed",
};

export function waLink(msg: string) {
  return `https://wa.me/${BIZ.waNumber}?text=${encodeURIComponent(msg)}`;
}

export const WA_DEFAULT =
  "Olá! Conheci o Gaivota Tattoo pelo site e gostaria de conversar sobre uma tatuagem.";

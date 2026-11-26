export const BIZ = {
  name: "101Clinic Tattoo & Body Piercing",
  phoneDisplay: "(62) 98578-6775",
  phoneE164: "+5562985786775",
  waDisplay: "(62) 98578-6775",
  waNumber: "5562985786775",
  address: "R. V 8, 4 - Vila Vitoria, Itumbiara - GO, 75533-550",
  hours: "Quinta-feira: abertura às 08:00. Consulte os demais horários pelo telefone.",
  rating: "4,9",
  reviews: 89,
  site: "https://tatto-101-clinic.lovable.app",
  maps: "https://maps.app.goo.gl/V8EnKn6GNEcj2zBeA",
  mapEmbed: "https://www.google.com/maps?q=101Clinic+Tattoo+%26+Body+Piercing,+R.+V+8,+4,+Vila+Vitoria,+Itumbiara,+GO,+75533-550&output=embed",
};

export function waLink(msg: string) {
  return `https://wa.me/${BIZ.waNumber}?text=${encodeURIComponent(msg)}`;
}

export const WA_DEFAULT =
  "Olá! Conheci a 101Clinic Tattoo & Body Piercing pelo site e gostaria de conversar sobre tatuagem ou piercing.";

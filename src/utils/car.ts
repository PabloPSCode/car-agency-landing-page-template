export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const formatKmRodage = (value: number) =>
  `${new Intl.NumberFormat("pt-BR").format(value)} km`;

export const formatPublishingDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));

export const getWhatsappHref = (phoneNumber: string, message: string) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

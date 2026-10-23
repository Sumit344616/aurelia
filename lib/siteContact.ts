// Centralized Maison Contact & Atelier Configuration

export interface AtelierContact {
  city: string;
  name: string;
  address: string;
  landmark?: string;
  pincode: string;
  phone: string;
  phoneRaw: string;
  mobile: string;
  mobileRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  hours: string;
  googleMapsEmbed: string;
  googleMapsDirections: string;
  isFlagship?: boolean;
}

export const SITE_CONTACT = {
  brandName: "AURELIA High Jewellery Maison",
  tagline: "Sculptors of Rare Earth & D-Flawless Brilliance",
  
  // Primary Flagship Mobile & WhatsApp (Used for direct 1-click customer enquiries)
  mobileNumber: "+91 98200 12345",
  mobileRaw: "919820012345",
  whatsappNumber: "+91 98200 12345",
  whatsappRaw: "919820012345",
  
  // Concierge Desk Landline
  telephoneNumber: "+91 22 2640 1800",
  telephoneRaw: "+912226401800",
  
  // Official Concierge Email
  email: "liaison@maisonaurelia.com",
  
  // Flagship Store Physical Address (Mumbai)
  flagship: {
    name: "Aurelia Flagship High Jewellery Atelier",
    street: "24/A, Turner Road, Near Waterfield Road",
    area: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India",
    formatted: "24/A Turner Road, Bandra West, Mumbai, Maharashtra 400050, India",
    landmark: "Opposite High Street Concourse",
    hours: "Monday – Saturday: 10:30 AM – 8:30 PM (IST)",
    sundayHours: "Sunday: Private Appointment Only",
    // Google Maps Embed URL for Bandra West
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.464731853245!2d72.8296316!3d19.0558198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c915f0134599%3A0x677ca3e778a3c8!2sTurner%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    // Direct Directions link for Google Maps app / web
    googleMapsDirections:
      "https://www.google.com/maps/search/?api=1&query=Turner+Road+Bandra+West+Mumbai+400050",
  },

  // Global Ateliers Directory
  salons: [
    {
      city: "Mumbai",
      role: "Flagship High Jewellery Studio",
      address: "24/A Turner Road, Bandra West, Mumbai 400050",
      phone: "+91 98200 12345",
      phoneRaw: "+919820012345",
      badge: "India Flagship",
    },
    {
      city: "Paris",
      role: "Haute Joaillerie Salon",
      address: "26 Place Vendôme, 75001 Paris, France",
      phone: "+33 1 42 68 00 00",
      phoneRaw: "+33142680000",
      badge: "Historic Maison",
    },
    {
      city: "London",
      role: "Private Vault & Salon",
      address: "14 New Bond Street, Mayfair, London W1S 3PF",
      phone: "+44 20 7946 0912",
      phoneRaw: "+442079460912",
      badge: "Private Vault",
    },
    {
      city: "New York",
      role: "Connoisseur Penthouse",
      address: "720 Fifth Avenue, New York, NY 10019",
      phone: "+1 212 555 0198",
      phoneRaw: "+12125550198",
      badge: "Penthouse Suite",
    },
  ],
};

/**
 * Build a prefilled WhatsApp link with the piece name or custom query
 */
export function buildWhatsAppLink(pieceName?: string, userMessage?: string): string {
  const baseNumber = SITE_CONTACT.whatsappRaw;
  let text = "";

  if (userMessage && userMessage.trim().length > 0) {
    if (pieceName && pieceName.trim().length > 0) {
      text = `Hello Aurelia High Jewellery,\n\nI am enquiring about "${pieceName}".\n\nQuery: ${userMessage.trim()}\n\nPlease share availability and details.`;
    } else {
      text = `Hello Aurelia High Jewellery,\n\n${userMessage.trim()}\n\nPlease connect me with a private client curator.`;
    }
  } else if (pieceName && pieceName.trim().length > 0) {
    text = `Hello Aurelia High Jewellery,\n\nI would like to enquire about "${pieceName}".\n\nPlease share the pricing, gemstone certification, and private viewing options.\n\nThank you.`;
  } else {
    text = `Hello Aurelia High Jewellery Maison,\n\nI would like to enquire about your High Jewellery collections and direct consultation services.\n\nPlease share catalogue and appointment availability.\n\nThank you.`;
  }

  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct phone call link
 */
export function getDirectCallLink(): string {
  return `tel:${SITE_CONTACT.mobileNumber.replace(/\s+/g, "")}`;
}

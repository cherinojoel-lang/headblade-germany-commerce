export const site = {
  name: "HeadBlade Germany",
  legalName: "LAV Verwaltungs GmbH – HeadBlade Germany",
  address: {
    street: "Jüttenstraße 8",
    postalCode: "58840",
    city: "Plettenberg",
    country: "Deutschland",
  },
  email: "info@headblade.info",
  phone: "+49 (0) 151-15595176",
  productionUrl: "https://www.headblade.info",
  previewLabel: "Review-Preview",
} as const;

export type SiteMetadata = typeof site;

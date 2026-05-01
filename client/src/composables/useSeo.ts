export interface SeoConfig {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonical?: string
  jsonLd?: object
  noIndex?: boolean
}

const companySchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Brick Lane Property Group',
  description: 'Expert property management across Australia. Maximizing returns for landlords, exceptional service for tenants.',
  url: 'https://bricklanepropertygroup.com.au',
  telephone: '+61-2-9123-4567',
  email: 'info@bricklanepropertygroup.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 5, 123 Collins Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  areaServed: [
    { '@type': 'City', name: 'Sydney' },
    { '@type': 'City', name: 'Melbourne' },
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Perth' },
    { '@type': 'City', name: 'Adelaide' },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '14:00' },
  ],
}

const pageConfigs: Record<string, SeoConfig> = {
  '/': {
    title: 'Brick Lane Property Group | Expert Property Management Australia',
    description: 'Trusted property management across Australia. 500+ properties managed, 98% tenant retention, 12 years experience. Get your free rental appraisal today.',
    keywords: 'property management, landlord services, rental management, property manager, real estate management, Australia',
    jsonLd: {
      ...companySchema,
      '@type': 'RealEstateAgent',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '247',
        bestRating: '5',
        worstRating: '1',
      },
    },
  },
  '/for-partners': {
    title: 'Partner Program | Brick Lane Property Group',
    description: 'Join 200+ referral partners earning competitive commissions. Real estate agents, accountants, financial advisors and mortgage brokers trust BPG.',
    keywords: 'property management partnership, referral program, real estate agent partnership, commission referral',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Program',
      name: 'Brick Lane Partner Program',
      description: 'Refer your clients to BPG for property management and earn competitive commissions.',
      url: 'https://bricklanepropertygroup.com.au/for-partners',
    },
  },
  '/for-landlords': {
    title: 'Property Management for Landlords | Brick Lane Property Group',
    description: 'Professional property management services for Australian landlords. 8-9% management fee, rent guarantee, 24/7 support. Get your free appraisal.',
    keywords: 'property management for landlords, rental property management, landlord services, property manager',
    jsonLd: companySchema,
  },
  '/about': {
    title: 'About Us | Brick Lane Property Group',
    description: 'Founded in 2014, Brick Lane Property Group manages 500+ properties across Australia with 45+ team members and 200+ referral partners.',
    keywords: 'property management company, about brick lane, real estate management company',
    jsonLd: {
      ...companySchema,
      '@type': 'Organization',
      foundingDate: '2014',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: '45' },
    },
  },
  '/contact': {
    title: 'Contact Us | Brick Lane Property Group',
    description: 'Get in touch with Brick Lane Property Group. Sydney, Melbourne, and Brisbane offices. Call (02) 9123 4567 or submit our contact form.',
    keywords: 'contact property manager, property management contact, real estate enquiry',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Brick Lane Property Group',
      url: 'https://bricklanepropertygroup.com.au/contact',
    },
  },
}

export const useSeo = (routePath: string): SeoConfig => {
  const config = pageConfigs[routePath]
  if (config) return config

  return {
    title: 'Brick Lane Property Group | Expert Property Management Australia',
    description: 'Trusted property management across Australia.',
    jsonLd: companySchema,
  }
}

export { companySchema }

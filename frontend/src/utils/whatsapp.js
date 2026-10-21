const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export function openWhatsAppInquiry(fields) {
  if (!whatsappNumber) throw new Error('WhatsApp number is not configured');
  const lines = [
    'New AcreArch Website Inquiry',
    '',
    `Name: ${fields.name || 'Not provided'}`,
    `Email: ${fields.email || 'Not provided'}`,
    `Telephone: ${fields.phone || 'Not provided'}`,
    `Area of Interest: ${fields.interest || 'Not provided'}`,
    '',
    'Private Brief:',
    fields.message || 'Not provided',
    '',
    `Submitted: ${new Date().toLocaleString('en-IN')}`
  ];
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
}

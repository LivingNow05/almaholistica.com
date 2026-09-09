/**
 * Generador y Validador de Enlaces de WhatsApp para Alma Holística
 * Autor: E2E Test Writing Track (teamwork_preview_test_writer_e2e_1)
 */

import { PROVISIONAL_WHATSAPP_NUMBER } from './contracts.mjs';

/**
 * Construye la URL de redirección a WhatsApp con mensaje codificado
 */
export function buildWhatsAppUrl({
  phone = PROVISIONAL_WHATSAPP_NUMBER,
  symptom,
  duration,
  priorTreatments,
  location
}) {
  const cleanPhone = String(phone).replace(/\D/g, '');
  
  const textLines = [
    'Hola Alma Holística, deseo agendar una sesión inicial de diagnóstico.',
    symptom ? `• Síntoma / Dolencia: ${symptom}` : null,
    duration ? `• Tiempo de evolución: ${duration}` : null,
    priorTreatments ? `• Tratamientos previos: ${priorTreatments}` : null,
    location ? `• Ubicación: ${location}` : null,
    'Agradezco su orientación para abordar la raíz emocional de mi caso.'
  ].filter(Boolean);

  const rawMessage = textLines.join('\n');
  const encodedText = encodeURIComponent(rawMessage);

  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Parsea y valida una URL de WhatsApp estructurada
 */
export function parseAndValidateWhatsAppUrl(urlStr) {
  try {
    const url = new URL(urlStr);
    const isValidHost = url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com';
    const phone = url.pathname.replace(/\D/g, '');
    const rawText = url.searchParams.get('text') || '';

    return {
      valid: isValidHost && phone.length >= 10 && rawText.length > 0,
      host: url.hostname,
      phone,
      decodedText: rawText,
      hasSymptom: rawText.includes('Síntoma') || rawText.includes('Dolencia'),
      hasLocation: rawText.includes('Ubicación'),
      hasEvaluationIntent: rawText.includes('sesión inicial') || rawText.includes('diagnóstico')
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message
    };
  }
}

// Form field management and data extraction

import { TEMPLATE_CONFIG } from "./config.js";
import { getFieldValue, formatDate, formatTime, calculateTotal } from "./utils.js";

/**
 * Extract form data for a template
 * @param {string} templateId - Template ID (template1 or template2)
 * @returns {Object} Form data object
 */
export function extractFormData(templateId) {
  const config = TEMPLATE_CONFIG[templateId];
  if (!config) throw new Error(`Invalid template ID: ${templateId}`);

  const data = {};
  
  // Extract all field values
  Object.entries(config.fields).forEach(([key, field]) => {
    const parser = field.type === "number" ? parseFloat : null;
    data[key] = getFieldValue(field.id, field.default, parser);
  });

  // Calculate total for both templates
  data.total = calculateTotal(data.quantity, data.rate);

  // Format date and time
  data.date = formatDate(data.date || null, config.dateFormat);
  data.time = formatTime(data.time || null);

  return data;
}

/**
 * Initialize form fields with default values
 * @param {string} templateId - Template ID
 */
export function initializeFormFields(templateId) {
  const config = TEMPLATE_CONFIG[templateId];
  if (!config) return;

  const today = new Date().toISOString().split("T")[0];
  const currentTime = formatTime(null);

  Object.entries(config.fields).forEach(([key, field]) => {
    const element = document.getElementById(field.id);
    if (!element) return;

    if (field.type === "date" && !element.value) {
      element.value = today;
    } else if (field.type === "time" && !element.value) {
      element.value = currentTime;
    }
  });
}

/**
 * Add event listeners to form fields for live preview updates
 * @param {string} templateId - Template ID
 * @param {Function} updateCallback - Callback function to call on field change
 */
export function attachFormListeners(templateId, updateCallback) {
  const config = TEMPLATE_CONFIG[templateId];
  if (!config) return;

  const fieldIds = Object.values(config.fields).map(field => field.id);
  
  fieldIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      // Remove existing listeners to prevent duplicates
      element.removeEventListener("input", updateCallback);
      element.removeEventListener("change", updateCallback);
      
      // Add new listeners
      element.addEventListener("input", updateCallback);
      element.addEventListener("change", updateCallback);
    }
  });
}


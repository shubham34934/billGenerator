// Form field builder utilities

import { TEMPLATE_CONFIG } from "./config.js";

/**
 * Create form field HTML
 * @param {Object} field - Field configuration
 * @param {string} key - Field key name
 * @returns {string} HTML string for form field
 */
function createFormField(field, key) {
  const label = field.label || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
  const inputAttrs = [
    `type="${field.type}"`,
    `id="${field.id}"`,
    field.default !== null ? `value="${field.default}"` : "",
    field.min !== undefined ? `min="${field.min}"` : "",
    field.step !== undefined ? `step="${field.step}"` : "",
  ].filter(Boolean).join(" ");

  return `
    <div style="margin-bottom: 15px">
      <label for="${field.id}">${label}:</label>
      <input
        ${inputAttrs}
        style="width: 100%; padding: 5px; margin-top: 5px"
      />
    </div>`;
}

/**
 * Generate form HTML for a template
 * @param {string} templateId - Template ID
 * @returns {string} Complete form HTML
 */
export function generateFormHTML(templateId) {
  const config = TEMPLATE_CONFIG[templateId];
  if (!config) return "";

  const formFields = Object.entries(config.fields)
    .map(([key, field]) => createFormField(field, key))
    .join("");

  return `
    <div
      id="${config.id}Form"
      style="
        display: none;
        text-align: left;
        max-width: 500px;
        min-width: 400px;
        flex: 0 0 auto;
      "
    >
      <h4 style="text-align: center; margin-bottom: 15px">
        Fill Details for ${config.name}
      </h4>
      ${formFields}
      <button
        id="generate${config.id.charAt(0).toUpperCase() + config.id.slice(1)}Btn"
        style="
          padding: 10px 20px;
          width: 100%;
          background-color: #2c2c2c;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        "
      >
        Generate PDF
      </button>
    </div>`;
}


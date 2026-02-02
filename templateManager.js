// Template management and preview updates

import { TEMPLATE_CONFIG } from "./config.js";
import { extractFormData, attachFormListeners, initializeFormFields } from "./formManager.js";
import { generateTemplate1HTML, generateTemplate2HTML } from "./templates.js";

/**
 * Template manager class
 */
export class TemplateManager {
  constructor(previewElement) {
    this.previewElement = previewElement;
    this.currentTemplate = null;
    this.updateCallback = null;
  }

  /**
   * Set active template
   * @param {string} templateId - Template ID
   */
  setTemplate(templateId) {
    this.currentTemplate = templateId;
    
    // Initialize form fields
    initializeFormFields(templateId);
    
    // Update preview
    this.updatePreview();
    
    // Attach form listeners
    this.updateCallback = () => this.updatePreview();
    attachFormListeners(templateId, this.updateCallback);
  }

  /**
   * Update preview with current form data
   */
  updatePreview() {
    if (!this.currentTemplate || !this.previewElement) return;

    const data = extractFormData(this.currentTemplate);
    const config = TEMPLATE_CONFIG[this.currentTemplate];
    
    // Generate HTML based on template type
    let html = "";
    if (this.currentTemplate === "template1") {
      html = generateTemplate1HTML(data);
    } else if (this.currentTemplate === "template2") {
      html = generateTemplate2HTML(data);
    }

    this.previewElement.innerHTML = html;
  }

  /**
   * Get preview memo element
   * @returns {HTMLElement|null} Memo element
   */
  getPreviewMemoElement() {
    return this.previewElement?.querySelector(".memo") || null;
  }
}


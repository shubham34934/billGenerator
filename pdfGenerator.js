// PDF generation utilities

import { PDF_CONFIG } from "./config.js";

/**
 * Generate PDF from preview element
 * @param {string} templateId - Template ID
 * @param {HTMLElement} previewElement - Preview DOM element
 * @returns {Promise} PDF generation promise
 */
export function generatePDF(templateId, previewElement) {
  if (!previewElement) {
    throw new Error("Preview element not found");
  }

  // Create temporary container
  const container = document.createElement("div");
  container.style.cssText = "padding: 20px; background: white;";

  // Clone the memo element (deep clone to get all styles)
  const clonedMemo = previewElement.cloneNode(true);
  container.appendChild(clonedMemo);
  document.body.appendChild(container);

  // Generate PDF configuration
  const config = {
    ...PDF_CONFIG,
    filename: `cash-memo-${templateId}-${Date.now()}.pdf`,
  };

  // Generate PDF
  return html2pdf()
    .set(config)
    .from(container)
    .save()
    .then(() => {
      document.body.removeChild(container);
      return { success: true, message: "PDF generated successfully!" };
    })
    .catch((error) => {
      document.body.removeChild(container);
      console.error("PDF generation error:", error);
      throw new Error("Error generating PDF. Please try again.");
    });
}


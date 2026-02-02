// Utility functions

/**
 * Format date based on template format
 * @param {string} dateString - ISO date string
 * @param {string} format - Format type: "dd/mm/yy" or "dd-mm-yyyy"
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, format = "dd-mm-yyyy") {
  if (!dateString) return formatDate(new Date().toISOString(), format);
  
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  if (format === "dd/mm/yy") {
    return `${day}/${month}/${String(year).slice(-2)}`;
  }
  return `${day}-${month}-${year}`;
}

/**
 * Format time string (HH:MM)
 * @param {string} timeString - Time string from input
 * @returns {string} Formatted time (HH:MM)
 */
export function formatTime(timeString) {
  if (!timeString) {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }
  const parts = timeString.split(":");
  return `${parts[0]}:${parts[1]}`;
}

/**
 * Get current date in ISO format
 * @returns {string} ISO date string
 */
export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Get current time in HH:MM format
 * @returns {string} Time string
 */
export function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

/**
 * Safely get element value or return default
 * @param {string} id - Element ID
 * @param {any} defaultValue - Default value
 * @param {Function} parser - Optional parser function (e.g., parseFloat, parseInt)
 * @returns {any} Element value or default
 */
export function getFieldValue(id, defaultValue, parser = null) {
  const element = document.getElementById(id);
  if (!element) return defaultValue;
  
  const value = element.value;
  if (!value) return defaultValue;
  
  return parser ? parser(value) : value;
}

/**
 * Calculate total amount
 * @param {number} quantity - Quantity
 * @param {number} rate - Rate per unit
 * @returns {string} Total formatted to 2 decimal places
 */
export function calculateTotal(quantity, rate) {
  return ((quantity || 0) * (rate || 0)).toFixed(2);
}


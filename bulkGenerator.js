// Bulk bill generation with constraints

import { TEMPLATE_CONFIG } from "./config.js";
import { formatDate, formatTime, calculateTotal } from "./utils.js";
import { generateTemplate1HTML, generateTemplate2HTML } from "./templates.js";
import { PETROL_PRICES } from "./constants.js";

/**
 * Generate random number within range
 */
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer within range
 */
function randomIntBetween(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

/**
 * Get dates for a month with minimum gap
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} minGapDays - Minimum gap between dates in days
 * @param {number} maxDates - Maximum number of dates to generate
 * @returns {Date[]} Array of dates
 */
function generateDatesWithGap(year, month, minGapDays = 4, maxDates = 10) {
  const dates = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const minGap = minGapDays;
  
  // Calculate available days considering gap requirement
  const maxPossibleDates = Math.floor((daysInMonth - 1) / (minGap + 1)) + 1;
  const datesToGenerate = Math.min(maxDates, maxPossibleDates);
  
  // Start from a random early day
  let currentDay = randomIntBetween(1, Math.max(1, Math.floor(daysInMonth / 3)));
  
  while (dates.length < datesToGenerate && currentDay <= daysInMonth) {
    dates.push(new Date(year, month - 1, currentDay));
    
    // Add minimum gap plus some random variation (0-2 days)
    const gap = minGap + randomIntBetween(0, 2);
    currentDay += gap;
    
    // Ensure we don't exceed month boundaries
    if (currentDay > daysInMonth && dates.length < datesToGenerate) {
      // Try to fit more dates by starting from different position
      break;
    }
  }
  
  // Sort dates chronologically
  dates.sort((a, b) => a - b);
  
  return dates;
}

/**
 * Generate random time within specified time ranges
 * @param {Array<{startHour: number, startMin: number, endHour: number, endMin: number}>} timeRanges - Array of time ranges
 */
function generateRandomTime(timeRanges = null) {
  // Default range if no ranges provided
  if (!timeRanges || timeRanges.length === 0) {
    const hour = randomIntBetween(6, 22);
    const minute = randomIntBetween(0, 59);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  // Pick a random range
  const range = timeRanges[randomIntBetween(0, timeRanges.length - 1)];
  
  // Convert to minutes for easier calculation
  const startMinutes = range.startHour * 60 + range.startMin;
  let endMinutes = range.endHour * 60 + range.endMin;
  
  // Handle case where end time is before start time (crosses midnight)
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours if crossing midnight
  }
  
  // Generate random time within range
  const totalMinutes = randomIntBetween(startMinutes, endMinutes);
  const finalMinutes = totalMinutes % (24 * 60); // Wrap around if needed
  
  const hour = Math.floor(finalMinutes / 60);
  const minute = finalMinutes % 60;
  
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

/**
 * Generate random realistic data for template1
 */
function generateTemplate1Data(date, month, year, stationNames, pincodes, baseRate, quantityMin, quantityMax, customAddress = null, customPincode = null, customGstNumber = null, timeRanges = null) {
  const station = stationNames[randomIntBetween(0, stationNames.length - 1)];
  const address = customAddress !== null ? customAddress : "MADIWALA";
  const pincode = customPincode !== null ? customPincode : pincodes[randomIntBetween(0, pincodes.length - 1)];
  // Use exact base rate (no random variation)
  const rate = parseFloat(baseRate.toFixed(2));
  const quantity = parseFloat(randomBetween(quantityMin, quantityMax).toFixed(2));
  const total = calculateTotal(quantity, rate);
  
  return {
    station,
    address,
    pincode: String(pincode),
    gstNumber: customGstNumber !== null ? customGstNumber : "",
    mid: randomIntBetween(1, 10),
    date: formatDate(date.toISOString(), "dd/mm/yy"),
    time: generateRandomTime(timeRanges),
    billNo: randomIntBetween(10000, 99999),
    quantity: quantity.toFixed(2),
    rate: rate.toFixed(2),
    total,
  };
}

/**
 * Generate random realistic data for template2
 */
function generateTemplate2Data(date, month, year, stationNames, addresses, pincodes, baseRate, quantityMin, quantityMax, customAddress = null, customPincode = null, customGstNumber = null, timeRanges = null) {
  const stationIndex = randomIntBetween(0, stationNames.length - 1);
  const station = stationNames[stationIndex];
  const address = customAddress !== null ? customAddress : (addresses[stationIndex] || addresses[0]);
  const pincode = customPincode !== null ? customPincode : pincodes[randomIntBetween(0, pincodes.length - 1)];
  // Use exact base rate (no random variation)
  const rate = parseFloat(baseRate.toFixed(2));
  const quantity = parseFloat(randomBetween(quantityMin, quantityMax).toFixed(2));
  const total = calculateTotal(quantity, rate);
  
  // Calculate preset value (slightly less than total, realistic)
  const presetValue = (total * randomBetween(0.95, 0.99)).toFixed(2);
  
  return {
    station,
    address,
    pincode: String(pincode),
    gstNumber: customGstNumber !== null ? customGstNumber : "",
    date: formatDate(date.toISOString(), "dd-mm-yyyy"),
    time: generateRandomTime(timeRanges),
    bayNo: randomIntBetween(1, 4),
    nozzleNo: randomIntBetween(1, 4),
    txnId: randomIntBetween(1000000, 9999999),
    quantity: quantity.toFixed(2),
    rate: rate.toFixed(2),
    total,
    presetValue,
  };
}

/**
 * Generate bulk bills
 * @param {Object} options - Generation options
 * @param {string} options.templateId - Template ID (template1 or template2)
 * @param {number} options.year - Year
 * @param {number} options.month - Month (1-12)
 * @param {number} options.targetAmount - Target total amount
 * @param {number} options.minGapDays - Minimum gap between bills (days)
 * @param {number} options.quantityRange - {min, max} quantity range
 * @param {number} options.startHour - Start hour for time generation
 * @param {number} options.endHour - End hour for time generation
 * @returns {Array} Array of bill data objects
 */
export function generateBulkBills(options) {
  const {
    templateId = "template1",
    templateIds = [],
    year,
    month,
    targetAmount = 20000,
    minGapDays = 4,
    quantityRange = { min: 30, max: 40 },
    startHour = 6,
    endHour = 22,
    customStations = {},
    timeRanges = null,
  } = options;

  const templatePool = templateIds.length
    ? templateIds
    : templateId
    ? [templateId]
    : ["template1"];

  templatePool.forEach((id) => {
    if (!TEMPLATE_CONFIG[id]) {
      throw new Error(`Invalid template ID: ${id}`);
    }
  });

  const normalizedQuantityRange = {
    min: Number(quantityRange?.min ?? 30),
    max: Number(quantityRange?.max ?? 40),
  };

  // Use custom stations or fallback to realistic defaults
  const stations = {
    template1: customStations.template1?.station
      ? [customStations.template1.station]
      : [
          "VENKATESWARA AND CO",
          "BALAJI PETROLEUM",
          "SHREE PETROLEUM",
          "VENKAT PETROLEUM STATION",
        ],
    template2: customStations.template2?.station
      ? [customStations.template2.station]
      : [
          "GURUKRUPA SERVICE STATION",
          "BHARAT PETROLEUM STATION",
          "SRI PETROLEUM SERVICE",
          "LAKSHMI PETROLEUM STATION",
        ],
  };

  const addresses = customStations.template2?.address
    ? [customStations.template2.address]
    : [
        "HOSUR ROAD, SINGASANDARA",
        "ELECTRONIC CITY",
        "MADIWALA MAIN ROAD",
        "BTM LAYOUT",
        "JAYANAGAR",
      ];

  // Use custom pincodes or fallback to defaults
  const pincodes = [];
  if (customStations.template1?.pincode) {
    pincodes.push(parseInt(customStations.template1.pincode) || 560068);
  }
  if (customStations.template2?.pincode) {
    pincodes.push(parseInt(customStations.template2.pincode) || 560114);
  }
  if (pincodes.length === 0) {
    pincodes.push(...[
      560068, 560100, 560102, 560114, 560076, 560037, 560070, 560095,
    ]);
  }

  // Get petrol rates for the month (use custom prices if provided, otherwise use defaults)
  const monthKey = String(month).padStart(2, "0");
  const defaultBaseRate = PETROL_PRICES[monthKey] || 102.0;
  
  // Get custom petrol prices per template
  const template1BaseRate = customStations.template1?.petrolPrice ?? defaultBaseRate;
  const template2BaseRate = customStations.template2?.petrolPrice ?? defaultBaseRate;

  // Generate dates with gap constraint
  const estimatedMaxBills = Math.max(
    1,
    Math.floor(30 / Math.max(1, minGapDays + 1))
  );
  const dates = generateDatesWithGap(
    year,
    month,
    minGapDays,
    estimatedMaxBills
  );

  const bills = [];
  let currentTotal = 0;
  let usedDates = [];
  const sortedDates = [...dates].sort((a, b) => a - b);

  // Generate bills until target amount is reached or exceeded
  while (currentTotal < targetAmount && sortedDates.length > 0) {
    // Pick a random date that hasn't been used
    const availableDates = sortedDates.filter(
      (d, idx) => !usedDates.includes(idx)
    );
    
    if (availableDates.length === 0) break;

    const randomDateIdx = Math.floor(Math.random() * availableDates.length);
    const selectedDate = availableDates[randomDateIdx];
    const originalIdx = sortedDates.indexOf(selectedDate);
    usedDates.push(originalIdx);

    // Randomly pick template for this bill
    const selectedTemplateId =
      templatePool[randomIntBetween(0, templatePool.length - 1)];

    // Generate bill data
    let billData;
    if (selectedTemplateId === "template1") {
      const customAddress = customStations.template1?.address || null;
      const customPincode = customStations.template1?.pincode 
        ? parseInt(customStations.template1.pincode) 
        : null;
      const customGstNumber = customStations.template1?.gstNumber || null;
      billData = generateTemplate1Data(
        selectedDate,
        month,
        year,
        stations.template1,
        pincodes,
        template1BaseRate,
        normalizedQuantityRange.min,
        normalizedQuantityRange.max,
        customAddress,
        customPincode,
        customGstNumber,
        timeRanges
      );
    } else if (selectedTemplateId === "template2") {
      const customAddress = customStations.template2?.address || null;
      const customPincode = customStations.template2?.pincode 
        ? parseInt(customStations.template2.pincode) 
        : null;
      const customGstNumber = customStations.template2?.gstNumber || null;
      billData = generateTemplate2Data(
        selectedDate,
        month,
        year,
        stations.template2,
        addresses,
        pincodes,
        template2BaseRate,
        normalizedQuantityRange.min,
        normalizedQuantityRange.max,
        customAddress,
        customPincode,
        customGstNumber,
        timeRanges
      );
    } else {
      continue;
    }

    // Generate HTML
    const html =
      selectedTemplateId === "template1"
        ? generateTemplate1HTML(billData)
        : generateTemplate2HTML(billData);

    bills.push({
      templateId: selectedTemplateId,
      data: billData,
      html,
      total: parseFloat(billData.total),
      date: selectedDate,
    });

    currentTotal += parseFloat(billData.total);

    // If we're close enough to target (within 5%), stop
    if (currentTotal >= targetAmount * 0.95) {
      break;
    }
  }

  return {
    bills,
    templates: templatePool,
    totalAmount: currentTotal,
    targetAmount,
    count: bills.length,
  };
}

/**
 * Open new page with all bills rendered
 * @param {Object} bulkResult - Result from generateBulkBills
 * @param {string|string[]} templateIds - Template IDs
 * @param {number} year - Year
 * @param {number} month - Month
 */
export function generateBulkPDF(bulkResult, templateIds, year, month) {
  // Get all styles from current page
  const styles = Array.from(document.querySelectorAll('style'))
    .map(style => style.textContent)
    .join('\n');
  
  const styleLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');

  // Build HTML with all bills
  const billsHTML = bulkResult.bills.map(bill => bill.html).join('\n');

  // Create complete HTML page with all styles
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Bulk Bills - ${year}-${String(month).padStart(2, "0")}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${styleLinks}
  <style>
    ${styles}
    body {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      padding: 40px;
      background-color: white;
      margin: 0;
    }
    .memo {
      page-break-after: always;
      page-break-inside: avoid;
    }
    @media print {
      body {
        padding: 0;
        gap: 0;
      }
      .memo {
        margin-bottom: 20px;
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  ${billsHTML}
</body>
</html>`;

  // Open new window with bills
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    return {
      success: true,
      message: `Opened ${bulkResult.count} bills in new window\nTarget: ₹${bulkResult.targetAmount.toFixed(2)}\nActual: ₹${bulkResult.totalAmount.toFixed(2)}`,
    };
  } else {
    throw new Error("Popup blocked. Please allow popups for this site.");
  }
}


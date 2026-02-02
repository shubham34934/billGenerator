// Template configurations

export const TEMPLATE_CONFIG = {
  template1: {
    id: "template1",
    name: "Template 1 - Venkateswara And Co",
    fields: {
      station: { id: "t1_station", type: "text", label: "Station Name", default: "VENKATESWARA AND CO" },
      address: { id: "t1_address", type: "text", label: "Address", default: "MADIWALA" },
      pincode: { id: "t1_pincode", type: "text", label: "Pincode", default: "560068" },
      gstNumber: { id: "t1_gstNumber", type: "text", label: "GST Number", default: "" },
      mid: { id: "t1_mid", type: "number", label: "MID", default: "3", min: 1 },
      date: { id: "t1_date", type: "date", label: "Date", default: null },
      time: { id: "t1_time", type: "time", label: "Time", default: null },
      billNo: { id: "t1_billNo", type: "number", label: "Bill No", default: "98873" },
      quantity: { id: "t1_quantity", type: "number", label: "Quantity (Liters)", default: "35", min: 1, step: 0.01 },
      rate: { id: "t1_rate", type: "number", label: "Rate per Liter", default: "101.35", min: 0, step: 0.01 },
    },
    dateFormat: "dd/mm/yy",
    generateHTML: "generateTemplate1HTML",
  },
  template2: {
    id: "template2",
    name: "Template 2 - Gurukrupa Service Station",
    fields: {
      station: { id: "t2_station", type: "text", label: "Station Name", default: "GURUKRUPA SERVICE STATION" },
      address: { id: "t2_address", type: "text", label: "Address", default: "HOSUR ROAD, SINGASANDARA" },
      pincode: { id: "t2_pincode", type: "text", label: "Pincode", default: "560114" },
      gstNumber: { id: "t2_gstNumber", type: "text", label: "GST Number", default: "" },
      date: { id: "t2_date", type: "date", label: "Date", default: null },
      time: { id: "t2_time", type: "time", label: "Time", default: null },
      bayNo: { id: "t2_bayNo", type: "number", label: "Bay No", default: "1", min: 1 },
      nozzleNo: { id: "t2_nozzleNo", type: "number", label: "Nozzle No", default: "2", min: 1 },
      txnId: { id: "t2_txnId", type: "number", label: "Transaction ID", default: "6853434" },
      quantity: { id: "t2_quantity", type: "number", label: "Quantity (Liters)", default: "37", min: 1, step: 0.01 },
      rate: { id: "t2_rate", type: "number", label: "Rate per Liter", default: "99.84", min: 0, step: 0.01 },
      presetValue: { id: "t2_presetValue", type: "text", label: "Preset Value", default: "3680.45" },
    },
    dateFormat: "dd-mm-yyyy",
    generateHTML: "generateTemplate2HTML",
  },
};

export const PDF_CONFIG = {
  margin: 0.5,
  image: {
    type: "jpeg",
    quality: 0.98,
  },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  },
  jsPDF: {
    unit: "in",
    format: "letter",
    orientation: "portrait",
  },
  pagebreak: { mode: ["avoid-all", "css", "legacy"] },
};


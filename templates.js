// Shared template functions for cash memos

export function generateTemplate1HTML(data) {
  return `
    <div class="memo" style="margin-bottom: 30px;">
      <div class="header">
        <h2>CASH MEMO</h2>
        <h3>${data.station}</h3>
        <p>DEALERS-BHARAT PETROLEUM CORP. LTD</p>
        <p>${data.address || 'MADIWALA'}</p>
        <p>BANGALORE-${data.pincode}</p>
      </div>

      <div class="details">
        <div style="display: flex; justify-content: space-between">
          <p>MID: ${data.mid}</p>
          <p>DATE: ${data.date}</p>
        </div>
        <div style="display: flex; justify-content: space-between">
          <p>BILL NO: ${data.billNo}</p>
          <p>TIME: ${data.time}</p>
        </div>
        <p>NAME:</p>
      </div>

      <div class="separator"></div>

      <div style="display: flex; justify-content: space-between">
        <span>ITEM NAME</span>
        <span>QTY</span>
        <span>PRICE</span>
        <span>AMOUNT</span>
      </div>

      <div class="separator"></div>

      <div style="display: flex; justify-content: space-between">
        <span>M.S.ULP</span>
        <span>${data.quantity}Lt</span>
        <span>${data.rate}</span>
        <span>${data.total}</span>
      </div>

      <div class="separator"></div>

      <div style="display: flex; justify-content: space-between">
        <span>TOTAL ITEM(S):1 /QTY:${data.quantity}</span>
        <span>${data.total}</span>
      </div>

      <div class="separator"></div>

      <div class="total">
        <p>TOTAL: ₹ ${data.total}</p>
      </div>

      <div class="separator"></div>
    </div>`;
}

export function generateTemplate2HTML(data) {
  return `
    <div class="memo" style="margin-bottom: 30px;">
      <img src="image.png" alt="Bharat Petroleum Logo" class="bp-logo" />
      <div class="header">
        <h2 style="margin: 5px 0">CASH MEMO</h2>
        <h3 style="margin: 5px 0">${data.station}</h3>
        <p style="margin: 5px 0">${data.address}</p>
        <p style="margin: 5px 0">BANGALORE ${data.pincode}</p>
      </div>

      <div class="details">
        <div class="receipt-row">
          <span class="receipt-label">Date:</span>
          <span class="receipt-value">${data.date}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Time:</span>
          <span class="receipt-value">${data.time}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">BayNo:</span>
          <span class="receipt-value">${data.bayNo}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">NozzleNo:</span>
          <span class="receipt-value">${data.nozzleNo}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Product:</span>
          <span class="receipt-value">PETROL</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">PayMode:</span>
          <span class="receipt-value">Cash</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Txn Id:</span>
          <span class="receipt-value">${data.txnId}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Attendant:</span>
          <span class="receipt-value"></span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Rate/Ltr:</span>
          <span class="receipt-value">${data.rate}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Volume(Ltr.):</span>
          <span class="receipt-value">${data.quantity}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Amount (Rs.):</span>
          <span class="receipt-value">${data.total}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">PresetType:</span>
          <span class="receipt-value">Local Amount</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">Preset Value:</span>
          <span class="receipt-value">${data.presetValue}</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">VechNo:</span>
          <span class="receipt-value"></span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">MobileNo:</span>
          <span class="receipt-value">+91</span>
        </div>
        <div class="receipt-row">
          <span class="receipt-label">VAT TIN:2739000298 V</span>
          <span class="receipt-value"></span>
        </div>
      </div>

      <div class="thank-you">
        <p>THANK YOU !! VISIT AGAIN !!!</p>
      </div>
    </div>`;
}

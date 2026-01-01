// Export transaksi to PDF using browser's print functionality
export function exportTransaksiToPDF(transaksi: any) {
  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice #${transaksi.id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background: white;
          color: #000;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #000;
          padding-bottom: 20px;
        }
        .invoice-header h1 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .invoice-header p {
          font-size: 14px;
          color: #666;
        }
        .invoice-details {
          margin-bottom: 30px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .detail-label {
          font-weight: 600;
          color: #333;
        }
        .detail-value {
          color: #000;
        }
        .product-section {
          margin: 30px 0;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }
        .product-section h2 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #000;
        }
        .product-item {
          padding: 10px 0;
        }
        .total-section {
          margin-top: 30px;
          padding: 20px;
          background: #000;
          color: white;
          border-radius: 8px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 24px;
          font-weight: bold;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        @media print {
          body {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>INVOICE</h1>
        <p>Transaksi #${transaksi.id}</p>
        <p>${new Date(transaksi.createdAt).toLocaleString('id-ID', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Jakarta'
        })}</p>
      </div>

      <div class="invoice-details">
        <h2 style="margin-bottom: 15px; font-size: 18px;">Detail Pembeli</h2>
        <div class="detail-row">
          <span class="detail-label">Nama Pembeli</span>
          <span class="detail-value">${transaksi.namaPembeli || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${transaksi.emailPembeli || '-'}</span>
        </div>
      </div>

      <div class="product-section">
        <h2>Produk yang Dibeli</h2>
        <div class="product-item">
          <div class="detail-row">
            <span class="detail-label">Nama Produk</span>
            <span class="detail-value">${transaksi.produk?.nama || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Harga</span>
            <span class="detail-value">Rp ${(transaksi.totalHarga || 0).toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <div class="total-section">
        <div class="total-row">
          <span>TOTAL PEMBAYARAN</span>
          <span>Rp ${(transaksi.totalHarga || 0).toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div class="footer">
        <p>Terima kasih atas pembelian Anda!</p>
        <p>Dokumen ini dibuat secara otomatis oleh sistem.</p>
      </div>
    </body>
    </html>
  `;

  // Open new window with the content
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    };
  }
}

// Export multiple transactions to PDF
export function exportMultipleTransaksiToPDF(transaksiList: any[]) {
  const totalRevenue = transaksiList.reduce((sum, t) => sum + (t.totalHarga || 0), 0);
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Laporan Transaksi</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background: white;
          color: #000;
        }
        .report-header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #000;
          padding-bottom: 20px;
        }
        .report-header h1 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .report-header p {
          font-size: 14px;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th {
          background: #000;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        tr:hover {
          background: #f9f9f9;
        }
        .summary {
          margin-top: 30px;
          padding: 20px;
          background: #000;
          color: white;
          border-radius: 8px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
        }
        .summary-row.total {
          font-size: 24px;
          font-weight: bold;
          border-top: 2px solid white;
          padding-top: 15px;
          margin-top: 10px;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="report-header">
        <h1>LAPORAN TRANSAKSI</h1>
        <p>Total ${transaksiList.length} Transaksi</p>
        <p>Dicetak pada: ${new Date().toLocaleString('id-ID', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Jakarta'
        })}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Pembeli</th>
            <th>Email</th>
            <th>Produk</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${transaksiList.map(t => `
            <tr>
              <td>#${t.id}</td>
              <td>${new Date(t.createdAt).toLocaleDateString('id-ID')}</td>
              <td>${t.namaPembeli || '-'}</td>
              <td>${t.emailPembeli || '-'}</td>
              <td>${t.produk?.nama || '-'}</td>
              <td style="text-align: right;">Rp ${(t.totalHarga || 0).toLocaleString('id-ID')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <span>Jumlah Transaksi</span>
          <span>${transaksiList.length}</span>
        </div>
        <div class="summary-row total">
          <span>TOTAL PENDAPATAN</span>
          <span>Rp ${totalRevenue.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div class="footer">
        <p>Laporan ini dibuat secara otomatis oleh sistem.</p>
      </div>
    </body>
    </html>
  `;

  // Open new window with the content
  const printWindow = window.open('', '_blank', 'width=1000,height=800');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}

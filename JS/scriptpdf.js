async function generatePDF() {
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      });
  
      const invoiceContent = document.getElementById("invoice");
      if (!invoiceContent) {
        throw new Error("No se encontró el elemento con ID 'invoice'.");
      }
  
      const canvas = await html2canvas(invoiceContent, {
        scale: 2,
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let position = 0;
  
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  
      let heightLeft = imgHeight - pageHeight;
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Ocurrió un error al generar el PDF. Por favor, intenta nuevamente.");
    }
  }
  
  export { generatePDF };
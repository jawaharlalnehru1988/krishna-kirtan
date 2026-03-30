import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePdf = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    // Optimized scale for balance between resolution and file size
    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true,
    });

    const margin = 40; // Standard padding
    const imgProps = pdf.getImageProperties(imgData);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate printable area
    const contentWidth = pageWidth - (margin * 2);
    const contentHeightPerPage = pageHeight - (margin * 2);
    
    // Scale image to fit contentWidth
    const totalImgHeightInPdf = (imgProps.height * contentWidth) / imgProps.width;

    let heightLeft = totalImgHeightInPdf;
    let position = 0;

    // Helper to mask all margins (to prevent content bleeding into page edges)
    const applyMargins = () => {
      pdf.setFillColor(255, 255, 255);
      // Top mask
      pdf.rect(0, 0, pageWidth, margin, 'F');
      // Bottom mask
      pdf.rect(0, pageHeight - margin, pageWidth, margin, 'F');
      // Side masks
      pdf.rect(0, 0, margin, pageHeight, 'F');
      pdf.rect(pageWidth - margin, 0, margin, pageHeight, 'F');
    };

    // First page
    pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, totalImgHeightInPdf, undefined, 'FAST');
    applyMargins();
    
    heightLeft -= contentHeightPerPage;

    while (heightLeft > 0) {
      position -= contentHeightPerPage;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, margin + position, contentWidth, totalImgHeightInPdf, undefined, 'FAST');
      applyMargins();
      heightLeft -= contentHeightPerPage;
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

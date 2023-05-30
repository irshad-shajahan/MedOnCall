const path = require('path');

const imagePath = path.join(__dirname, '..', 'assets', 'logo.png');

module.exports = {
  generateHeader: (doc,Id) => {
    doc.rect(0, 0, 612, 150).fill("#9dc9e8");
    doc.image(imagePath, 50, 40, { width: 100,height:60 })
      .fillColor("#444444")
      .fontSize(20)
      .text("Med On Call", 155, 62)
      .fontSize(10)
      .text(`Appointment ID: ${Id}`, 200, 65, { align: "right" })
      .text("Kerala, India, 682028", 200, 80, { align: "right" })
      .moveDown();
  },

  generateHr: (doc, y) => {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  },

  generateTableRow: (doc, y, medicine, dosage,slno) => {
    doc
      .fontSize(10)
      .text(slno, 50, y)
      .text(medicine,100, y)
      .text(dosage, 250, y,)
  },
  docDetails: (doc, docName,date,time ,patientName, patientAge,patientGender) => {
    doc
      .text(`Doctor Name: ${docName}`, 50, 200)
      .text(`Date: ${date}`, 50, 215)
      .text(`Time: ${time}`, 50, 230)
      .text(`Patient Name: ${patientName}`, 50, 200, { align: 'right' })
      .text(` Age: ${patientAge}`, 50, 215, { align: 'right' })
      .text(` Gender: ${patientGender}`, 50, 230, { align: 'right' })
      .moveDown();
  },
  DiagnosedCondition: (doc, Condition) => {
    doc
      .text("Diagnosed Condition:", 50, 265)
      .text(Condition, 50, 279)
      .moveDown();
  },
  generateFooter:(doc,y)=> {
  
    // Add the health quote
    const healthQuote = 'Health is a state of complete harmony of the body, mind, and spirit. - B.K.S. Iyengar';
    doc.rect(0, 800, 612, 40).fill("#9dc9e8");
    doc
      .fontSize(8)
      .fillColor('#3775a9')
      .text(healthQuote, 50,y , { align: 'center', width: 512 });
  
    // Add any additional elements or styling as needed
  
    // ...
  }
  
};

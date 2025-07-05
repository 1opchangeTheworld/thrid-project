const fs = require("fs");
const PdfPrinter = require("pdfmake");

const fonts = {
  NotoSansThai: {
    normal: "fonts/NotoSansThai.ttf",
    bold: "fonts/NotoSansThai.ttf",
  },
};

const printer = new PdfPrinter(fonts);

exports.generateTranscriptPDF = (req, res) => {
  const docDefinition = {
    pageSize: "A4",
    pageMargins: [30, 30, 30, 30],
    content: [
      {
        columns: [
          [
            {
              text: "มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ",
              style: "header",
            },
            {
              text: "ตารางการเทียบวิชาเรียนและโอนหน่วยกิตจากการศึกษาในระบบ\nหลักสูตรเทคโนโลยีสารสนเทศและธุรกิจดิจิทัล (เข้าศึกษาปี 2567)",
              style: "subheader",
              margin: [0, 2, 0, 0],
            },
          ],
        ],
        margin: [0, 0, 0, 8],
      },
      // Student info
      {
        columns: [
          { text: "รหัสประจำตัวนักศึกษา: 676051000065-8", style: "info" },
          { text: "ชื่อ-สกุล: นายอนวัช กิมเจริญวิริยะ", style: "info" },
        ],
        margin: [0, 0, 0, 1],
      },
      {
        columns: [
          {
            text: "หลักสูตร: เทคโนโลยีสารสนเทศและธุรกิจดิจิทัล",
            style: "info",
          },
          { text: "คณะ: บริหารธุรกิจ", style: "info" },
        ],
        margin: [0, 0, 0, 8],
      },
      {
        table: {
          headerRows: 2,
          widths: [55, 110, 45, 30, 55, 110, 45, 30, 20, 25],
          body: [
            [
              { text: "รหัสวิชา", style: "tableHeader", rowSpan: 1 },
              { text: "ชื่อวิชา", style: "tableHeader", rowSpan: 1 },
              { text: "หน่วยกิต", style: "tableHeader", rowSpan: 1 },
              { text: "กลุ่ม", style: "tableHeader", rowSpan: 1 },
              {
                text: "รหัสวิชาเทียบเคียง",
                style: "tableHeader",
                colSpan: 1,
                alignment: "center",
              },
              {},
              { text: "ชื่อวิชา", style: "tableHeader", rowSpan: 1 },
              { text: "หน่วยกิต", style: "tableHeader", rowSpan: 1 },
              { text: "เลือก", style: "tableHeader", rowSpan: 1 },
              { text: "เอกสารแนบ", style: "tableHeader", rowSpan: 1 },
            ],
            [
              {},
              {},
              {},
              {},
              { text: "รหัสวิชา", style: "tableHeader" },
              { text: "ชื่อวิชา", style: "tableHeader" },
              {},
              {},
              {},
              {},
            ],
            [
              "5-155-302",
              "การฝึกงาน (Job Training)",
              "3(0-0-40)",
              "1",
              "30202-8001",
              "ฝึกงาน",
              "4",
              "4",
              "✓",
              "CE",
            ],
            [
              "5-151-121",
              "การพัฒนาโปรแกรมคอมพิวเตอร์",
              "3(0-6-3)",
              "1",
              "30204-2005",
              "การเขียนโปรแกรมคอมพิวเตอร์",
              "3",
              "2.5",
              "✓",
              "",
            ],
          ],
        },
        layout: "lightHorizontalLines",
        fontSize: 8,
        margin: [0, 0, 0, 10],
      },
      // Summary and signatures
      {
        columns: [
          {
            text: "สรุปจำนวนรายวิชาที่ขอเทียบโอนแล้ว: 7 .......... วิชา",
            style: "info",
          },
        ],
        margin: [0, 10, 0, 10],
      },
      {
        columns: [
          {
            text: "ลงชื่อ ............................................... กรรมการ\n(นางสมจิตร ศรีสอาด)\nมิถุนายน 2567",
            alignment: "center",
            fontSize: 8,
          },
          {
            text: "ลงชื่อ ............................................... กรรมการ\n(ผู้ช่วยศาสตราจารย์ ดร. คำนวณเพียร)\nมิถุนายน 2567",
            alignment: "center",
            fontSize: 8,
          },
          {
            text: "ลงชื่อ ............................................... กรรมการ\n(นายณัฐวุฒิ กิมเจริญวิริยะ)\nมิถุนายน 2567",
            alignment: "center",
            fontSize: 8,
          },
        ],
        margin: [0, 10, 0, 0],
      },
      {
        text: "สำนักงานส่งเสริมวิชาการและงานทะเบียน\nAcademic Support Center and Registration",
        alignment: "left",
        fontSize: 8,
        margin: [0, 20, 0, 0],
      },
    ],
    styles: {
      header: { fontSize: 14, bold: true, alignment: "center" },
      subheader: { fontSize: 10, alignment: "center" },
      info: { fontSize: 9 },
      tableHeader: { bold: true, fontSize: 8, alignment: "center" },
    },
    defaultStyle: {
      font: "NotoSansThai",
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="transcript.pdf"');
  pdfDoc.pipe(res);
  pdfDoc.end();
};

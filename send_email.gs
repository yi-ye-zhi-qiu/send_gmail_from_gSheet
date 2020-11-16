function send_email() {

  var EMAIL_SENT = "EMAIL_SENT";

  var sheet = SpreadsheetApp.openById("").getSheetByName("");
  var startRow = 1; //first row of data to process
  var numRows = 1; //number of rows to process
  var numCols = 8; //however many columns you use for email customization

  var data1Range = sheet.getRange(startRow, 1, numRows, numCols)
  var data = dataRange.getValues();
  //fetches email data

  for (var i=0; i<data.length; i++){
    var row = data[i]; //row 2, row 3, etc.

    //DEFINE EMAIL DATA
    var emailAddress = row[0] //email Address is in column A of my gSheet
    //parameter input should be 'abc@emaildomain.com', like 'abc@gmail.com'
    var subject = row[1] //email subject
    //parameter input can be anything
    var content = row[2] //has to be written in html if you want it to look nice
    //like var content = row[2] + count
    var emailSent = row[4] //used to mark the email as sent (prevents duplicates)
    var fileId = row[5] //put fileId here
    var fileName = row[6] //put fileName here
    var filetype = row[7] //pdf or not_pdf essentially

    //SEND THE EMAIL
    if (emailSent != EMAIL_SENT) { //prevents duplicates
      var file = DriveApp.getFileById(fileId);
      if(filetype == "png"){
        MailApp.sendEmail({
          to: emailAddress,
          subject: subject,
          htmlBody: content,
          cc: '',
          name: '',
          attachments: [file.getAs(MimeType.PDF)]
        })
      }
      else if(filetype == "pdf") {
        MailApp.sendEmail({
          to: emailAddress,
          subject: subject,
          htmlBody: content,
          cc: '',
          name: '',
          attachments: [file.getBlob()]
        })
      }
      sheet.getRange(startRow + i, 5).setValue(EMAIL_SENT);
      //Make sure cell updates right away in case script is interrupted, like
      //internet disconnects or something.
      SpreadsheetApp.flush();
    }
  }
}

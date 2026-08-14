/**
 * GOOGLE APPS SCRIPT FOR INQUIRY FORM SUBMISSIONS
 * Sheet Columns:
 * Column A: Timestamp
 * Column B: Name
 * Column C: Email
 * Column D: Project Details & Objectives
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var name = data.name || '';
    var email = data.email || '';
    var message = data.message || '';

    // Append row to active Google Sheet
    sheet.appendRow([timestamp, name, email, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

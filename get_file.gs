function get_id_from_url(url) { return url.match(/[-w]{25,}/); }
//used to fetch each id per file in gDrive

function get_file() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName("");

  var fldr = DriveApp.getFolderById("");
  //must have edit permissions to fldr
  var files = fldr.getFiles();
  var names = [],f,str;

  while (files.hasNext()){
    f=files.next();
    name = f.getName();
    var url = f.getUrl()
    str = getIdFromUrl(url)
    names.push([str, name]);
  }
  names.reverse()

  s.getRange(1, 1, 3, 2).setValues(names);
  //note, "3" is equal to # of files in fldr
}

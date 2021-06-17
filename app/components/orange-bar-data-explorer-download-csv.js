import Component from '@ember/component';

export default Component.extend({

  actions: {
    downloadCSV(csv, filename) {
      var csvFile;
      var downloadLink;
  
      // CSV file
      csvFile = new Blob([csv], {type: "text/csv"});
  
      // Download link
      downloadLink = document.createElement("a");
  
      // File name
      downloadLink.download = filename;
  
      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);
  
      // Hide download link
      downloadLink.style.display = "none";
  
      // Add the link to DOM
      document.body.appendChild(downloadLink);
  
      // Click download link
      downloadLink.click();
    },
    exportTableToCSV(filename = 'test.csv') {
      var csv = [];
      var rows = document.querySelectorAll("table tr");
      
      for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        // If a cell spans multiple columns, repeat the contents of that cell in each additional cell
        for (var j = 0; j < cols.length; j++) {
          row.push(cols[j].innerText);
          if(cols[j].colSpan>1) {
            var additionalRepetitions = cols[j].colSpan;
              while(additionalRepetitions>1) {
                row.push(cols[j].innerText);
                additionalRepetitions--;
              }
          }
        }
        csv.push(row.join(","));        
      }
  
      // Download CSV file
      this.actions.downloadCSV(csv.join("\n"), filename);
    }
  },
});
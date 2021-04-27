import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { getProperties } from '@ember/object';

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
      let csv = [];
      let rows = document.querySelectorAll("table tr");
      
      for (var i = 0; i < rows.length; i++) {
          let row = [];
          let headerCols = rows[i].querySelectorAll("th");
          let cols = rows[i].querySelectorAll("td");
          // let cols = rows[i].querySelectorAll("td, th");
          
          for (var j = 0; j < headerCols.length; j++) {
            if(headerCols[j].innerText) {
              row.push(headerCols[j].innerText);
              for (let e = headerCols[j].colSpan; e > 1; e-- ) {
                row.push('x');
              }
            }
          }
          for (var j = 0; j < cols.length; j++) {
            if(cols[j].innerText) {
              row.push(cols[j].innerText.replace(',', ''));
            }
          }      
          
          csv.push(row.join(","));        
      }
  
      // Download CSV file
      this.actions.downloadCSV(csv.join("\n"), filename);
    }
  },
});

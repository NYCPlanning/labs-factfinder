import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
  * @param { Object[] } topics - array of Topic objects.
  * If explorer selected source is acs, then `topics` has
  * TWO levels of nesting of Topic objects (Topics and Subtopics).
  * If explorer selected source is decennial, then `topics` is a
  * 1D array of subtopics.
  * See controller for an example.
*/

export default class DownloadDataDropdown extends Component{
  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
  }

  @action downloadCSV(csv) {
    var csvFile;
    var downloadLink;
    const d = new Date(Date.now());
    var filename = ['popfactfinder.planning.nyc.gov_data', d.getFullYear(), ("0" + (d.getMonth() + 1)).slice(-2), ("0" + d.getDate()).slice(-2) ].join('-').concat('.csv');

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
  }
  @action convertStringForCSV(s) {
    if(s.indexOf(',') !== -1) {
      return '"'.concat(s).concat('"');
    } 
    return s;
  }
  @action exportTableToCSV() {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
      
      // If a cell spans multiple columns, repeat the contents of that cell in each additional cell
      for (var j = 0; j < cols.length; j++) {
        row.push(this.actions.convertStringForCSV(cols[j].innerText));
        if(cols[j].colSpan>1) {
          var additionalRepetitions = cols[j].colSpan;
            while(additionalRepetitions>1) {
              row.push(this.actions.convertStringForCSV(cols[j].innerText));
              additionalRepetitions--;
            }
        }
      }
      csv.push(row.join(","));        
    }

    // Download CSV file
    this.actions.downloadCSV(csv.join("\n"));
  }

  get numSelected() {
    return this.args.topics.reduce((prev, cur) => {
        if (cur.type === 'subtopic' && cur.selected) {
          return prev += 1;
        }

        return prev += cur.children.filter((child) => child.selected).length;
      }, 0);
  }
  get source() {
    return this.args.sources.find(source => source.selected);
  }

  get selectedTopicsList() {
    var list = this.args.topics.map(topic => {
      return {
        label: topic.label,
        children: topic.children.filter(subtopic => subtopic.selected)
      }
    })
    return list.filter(topiary => topiary.children.length > 0);
  }
}

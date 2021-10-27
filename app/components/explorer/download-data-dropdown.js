import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DownloadDataDropdown extends Component{
  @service()
  metrics;

  @tracked open = false;

  @action toggleOpen() {
    this.open = !this.open;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'download_data',
      'toggle' : this.open ? 'Opened' : 'Closed',
    });
    this.metrics.trackEvent('GoogleAnalytics', {
      eventCategory: 'Download Data',
      eventAction: 'Toggle Menu',
      eventLabel: this.open ? 'Opened' : 'Closed',
    });
  }

  @action closeMenu() {
    if (this.open) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'download_data',
        'toggle' : 'Closed',
      });
      this.metrics.trackEvent('GoogleAnalytics', {
        eventCategory: 'Download Data',
        eventAction: 'Toggle Menu',
        eventLabel: 'Closed',
      });
    }
    this.open = false;
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
    if (s.indexOf(',') !== -1) {
      return '"'.concat(s).concat('"');
    } 
    if (s===" ") {
      return "";
    }
    return s;
  }

  @action async exportTableToCSV() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'download_file',
      'filetype' : 'csv',
    });
    this.metrics.trackEvent('GoogleAnalytics', {
      eventCategory: 'Download Data',
      eventAction: 'Download File',
      eventLabel: 'CSV',
    });

    // This toggles the reliability data on if it is not before downloading
    const initialReliabilitySetting = this.args.showReliability;
    if (!initialReliabilitySetting) { 
      await this.args.toggleReliability();
    }


    var csv = [];
    var rowspanCounter = 0;
    var rowspanText;

    var rows = document.querySelectorAll("h3, table tr");
    const geoSelection = document.querySelector(".profile-geographies");
    if (geoSelection) { csv.push(this.actions.convertStringForCSV(geoSelection.innerText)); }
    
    for (var i = 0; i < rows.length; i++) {
      var row = [];

      if (rows[i].nodeName === "H3") {
        //add two blank rows above each table
        csv.push(null, null);
        row.push(this.actions.convertStringForCSV(rows[i].innerText));

      } else {
        var cols = rows[i].querySelectorAll("td, th");

        //if the first cell of a row spans multiple rows, repeat that text in each row that it spans
        if (cols[0].rowSpan>1) {
          rowspanCounter = cols[0].rowSpan - 1;
          rowspanText = this.actions.convertStringForCSV(cols[0].innerText);
        } else if (rowspanCounter>0) {
          row.push(rowspanText);
          rowspanCounter--;
        }
        
        for (var j = 0; j < cols.length; j++) {
          row.push(this.actions.convertStringForCSV(cols[j].innerText));
          // If a cell spans multiple columns, repeat the contents of that cell in each additional cell
          if(cols[j].colSpan>1) {
            var additionalRepetitions = cols[j].colSpan;
              while(additionalRepetitions>1) {
                row.push(this.actions.convertStringForCSV(cols[j].innerText));
                additionalRepetitions--;
              }
          }
        }
      }
      csv.push(row.join(","));        
    }

    // Download CSV file
    this.actions.downloadCSV(csv.join("\n"));

    // This toggles the reliability data back off if it was off before downloading
    if (!initialReliabilitySetting) { 
      this.args.toggleReliability();
    }
  }

  get numSelected() {
    return this.args.topics.reduce((prev, cur) => {
        if (cur.type === 'subtopic' && (cur.selected === "selected")) {
          return prev += 1;
        }

        return prev += cur.children.filter((child) => (child.selected === "selected")).length;
      }, 0);
  }
  
  get source() {
    return this.args.sources.find(source => source.selected);
  }

  get selectedTopicsList() {
    var list = this.args.topics.map(topic => {
      return {
        label: topic.label,
        children: topic.children.filter((subtopic) => (subtopic.selected === "selected"))
      }
    })
    return list.filter(topiary => topiary.children.length > 0);
  }
}

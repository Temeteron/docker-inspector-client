import { Component, Input } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'logs',
  templateUrl: 'logs.html'
})
export class LogsComponent {
  @Input() container: any;              // INPUT OF COMPONENT
  logs: Array<string> = [];             // LOGS ARRAY
  date: Date = new Date();              // CURRENT DATE
  loading: boolean = false;             // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED


  constructor(public api: ApiProvider) {
    // GET LOGS
    setTimeout(() => {
      this.getLogs();
    }, 0);

    // PUSH INIT LOG TO ARRAY OF LOGS
    let dateToPrint = this.getMediumDate();
    let logToAdd = dateToPrint+' ...';
    this.logs.push(logToAdd);

  }

///////////////////////////////////////////////////////////////////////////
// GET LOGS FROM SERVER
///////////////////////////////////////////////////////////////////////////
  getLogs() {
    // CHECK IF CONTAINER IS PASSED
    if (this.container) {
        this.loading = true;
        // CALL TO SERVER
        this.api.getLogsOfContainer(this.container.Id).subscribe(res => {
          // DEBUG MESSAGE
          // console.log('Res getLogsOfContainer: ' + JSON.stringify(res));

          this.loading = false;

          // UPDATE DATE
          this.date = new Date();

          // IF LOG IS NON-EMPTY CONCAT OUTPUT
          if (res) {
              this.addToLogs(res.split('\n'));
          }

          setTimeout(() => {
            this.getLogs();
          }, this.api.TIME_TO_REFRESH);
        },
          err => {
            // DEBUG MESSAGE
            this.loading = false;
            console.error("Error while getLogsOfContainer: " + JSON.stringify(err));
        });
    }
  }

///////////////////////////////////////////////////////////////////////////
// CONCAT LOGS TO OUTPUT - 10 LOGS MAX
///////////////////////////////////////////////////////////////////////////
  addToLogs(log) {
    let helpLogs = this.logs.concat(log);
    this.logs = helpLogs.slice(Math.max(helpLogs.length-10, 0));
  }

///////////////////////////////////////////////////////////////////////////
// FORMAT DATE
///////////////////////////////////////////////////////////////////////////
  getMediumDate() {
    this.date = new Date();
    return '('+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds()+')';
  }

}

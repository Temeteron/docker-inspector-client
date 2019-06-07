import { Component, Input } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'logs',
  templateUrl: 'logs.html'
})
export class LogsComponent {
  @Input() container: any;                        // INPUT OF COMPONENT
  logs: Array<string> = [];                       // LOGS ARRAY
  date: Date = new Date();                        // CURRENT DATE

  constructor(public api: ApiProvider) {
    // GET LOGS
    this.getLogs();

    // PUSH INIT LOG TO ARRAY OF LOGS
    let dateToPrint = this.getMediumDate();
    let logToAdd = dateToPrint+' ...';
    this.logs.push(logToAdd);

    // GET LOGS, EVERY 5 SECOND
    setInterval(() => {
        this.getLogs();
    }, 5000);
  }

///////////////////////////////////////////////////////////////////////////
// GET LOGS FROM SERVER
///////////////////////////////////////////////////////////////////////////
  getLogs() {
    if (this.container) {
        // CALL TO SERVER
        this.api.getLogsOfContainer(this.container.Id).subscribe(res => {
            // UPDATE DATE
            this.date = new Date();
            // IF LOG IS NON-EMPTY CONCAT OUTPUT
            if (res) {
                this.addToLogs(res.split('\n'));
            }
        },
          err => {
            console.error('Error getting logs');
          }
        );
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

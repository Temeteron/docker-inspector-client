import { Component, Input } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsComponent {
  @Input() container: any = null;        // INPUT OF COMPONENT
  stats: any = null;                     // STATS OBJECT

  constructor(public api: ApiProvider) {
    this.getStats();

    // GET STATS EVERY 5 SECONDS
    setInterval(() => {
        this.getStats();
    }, 5000);
  }

///////////////////////////////////////////////////////////////////////////
// GET STATS FOR RUNNING CONTAINER
///////////////////////////////////////////////////////////////////////////
  getStats() {
    // CHECK IF CONTAINER IS PASSED
    if (this.container) {
        // CALL TO SERVER
        this.api.getStatsOfContainer(this.container.Id).subscribe(res => {
            // DEBUG MESSAGE
            // console.log('Res getStatsOfContainer: ' + JSON.stringify(res));

            this.stats = res;
        },
          err => {
            // DEBUG MESSAGE
            console.error("Error while getStatsOfContainer: " + JSON.stringify(err));
        });
    }
  }

}

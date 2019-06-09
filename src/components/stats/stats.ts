import { Component, Input } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsComponent {
  TIME_TO_REFRESH: number = 4000;      // CONSTANT THAT INDICADES HOW OFTEN WE REFRESH CONTAINERS STATE
  @Input() container: any = null;        // INPUT OF COMPONENT
  stats: any = null;                     // STATS OBJECT
  loading: boolean = false;                     // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED

  constructor(public api: ApiProvider) {
    setTimeout(() => {
      this.getStats();
    }, 0);
  }

///////////////////////////////////////////////////////////////////////////
// GET STATS FOR RUNNING CONTAINER
///////////////////////////////////////////////////////////////////////////
  getStats() {
    // CHECK IF CONTAINER IS PASSED
    if (this.container) {
      this.loading = true;
      // CALL TO SERVER
      this.api.getStatsOfContainer(this.container.Id).subscribe(res => {
          // DEBUG MESSAGE
          // console.log('Res getStatsOfContainer: ' + JSON.stringify(res));

          this.stats = res;
          this.loading = false;
          setTimeout(() => {
            this.getStats();
          }, this.TIME_TO_REFRESH);
      },
        err => {
          // DEBUG MESSAGE
          this.loading = false;
          console.error("Error while getStatsOfContainer: " + JSON.stringify(err));
      });
    }
  }

}

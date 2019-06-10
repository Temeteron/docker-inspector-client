import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsComponent {
  @Input() container: any = null;                                            // INPUT OF COMPONENT
  @Output() containerStopped = new EventEmitter<Object>();                    // VAR TO COMMUNICATE WITH PAREMT ABOUT UNEXPECTED ERROR
  stats: any = null;                                                         // STATS OBJECT
  loading: boolean = false;                                                  // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED

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
          this.loading = false;
          
          // DEACTIVATE COMPONENT - CONTAINER HAS STOPPED
          if (!res.pids_stats.current) {
            console.warn('CONTAINER STOPPED - DISABLING STATS');
            this.disableStatsComponent();
          } else {
            this.stats = res;
            setTimeout(() => {
              this.getStats();
            }, this.api.TIME_TO_REFRESH);
          }
      },
        err => {
          // DEBUG MESSAGE
          this.loading = false;
          console.error("Error while getStatsOfContainer: " + JSON.stringify(err));

          // DEACTIVATE COMPONENT - CONTAINER HAS STOPPED
          this.disableStatsComponent();
      });
    }
  }

///////////////////////////////////////////////////////////////////////////
// EMIT EVENT TO PARENT TO DISABLE COMPONENT
///////////////////////////////////////////////////////////////////////////
  disableStatsComponent() {
    this.containerStopped.emit(true);
  }

}

import { Component, Input } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsComponent {
  @Input() container: any = null;
  stats: any = null;

  constructor(public api: ApiProvider) {
  	this.getStats();

  	setInterval(() => {
        this.getStats();
    }, 5000);
  }

  getStats() {
  	if (this.container) {
	  	this.api.getStatsOfContainer(this.container.Id).subscribe(res => {
	  		console.log("Got new Stats");
	  		res.cpu_stats.cpu_usage.total_usage = this.filterCpuValue(res);
	  		this.stats = res;
	  	});
  	}
  }

  filterCpuValue(res) {
  	return res.cpu_stats.cpu_usage.total_usage / 10000000000;
  }
}

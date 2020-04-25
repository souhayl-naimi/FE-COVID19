import {Component, OnInit} from '@angular/core';
import {ServCovidService} from '../services/serv-covid.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public infected;
  public lastStatus;
  public previousStatus;
  public pPreviousStatus;
  chart = [];
  public pop;
  public lastDay;
  public lastCasa;


  constructor(public servCovidService: ServCovidService) {
  }



  ngOnInit(): void {
    this.servCovidService.getInfected()
      .subscribe(data => {
        this.infected = data;
        this.lastStatus = this.infected._embedded.statuses[this.infected._embedded.statuses.length - 1];
        this.previousStatus = this.infected._embedded.statuses[this.infected._embedded.statuses.length - 2];
        this.pPreviousStatus = this.infected._embedded.statuses[this.infected._embedded.statuses.length - 3];
        if(this.lastStatus.lastUpdated.includes("16H00")){
          this.lastDay=this.lastStatus.infected-this.pPreviousStatus.infected;
          this.lastCasa=parseInt(this.lastStatus.casablanca)-parseInt(this.pPreviousStatus.casablanca);
        }else if(this.lastStatus.lastUpdated.includes("10H00")){
          this.lastDay=this.lastStatus.infected-this.previousStatus.infected;
          this.lastCasa=parseInt(this.lastStatus.casablanca)-parseInt(this.previousStatus.casablanca);
        }
      }, error => {
        console.log(error);
      });
    /*this.servCovidService.getRegions().subscribe(data => {
      this.regions = data;
      this.regions.forEach(region => {
        this.rNames.push(region.name);
        this.rNums.push(region.numCases);
      });
      this.chart = new Chart('ctx', {
        type: 'pie',
        data: {
          labels: this.rNames,
          datasets: [
            {
              label: 'First',
              data: this.rNums,
              backgroundColor: [
                '#00876c',
                '#459b75',
                '#6daf7f',
                '#92c38b',
                '#b6d799',
                '#dbebaa',
                '#ffffbd',
                '#f9e39a',
                '#f5c57c',
                '#ea8557',
                '#e16351',
                '#d43d51'],
              fill: true
            }
          ]
        },  options: {
          responsive: true,
          legend: {
            position: 'left',
          }
        }
      });
    }, error => {
      console.log(error);
    });*/
    this.servCovidService.getPopulation().subscribe(data => {
      this.pop = data;
    }, error => {
      console.log(error);
    });

  }

  hide() {
    var x = document.getElementById("cc");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

}

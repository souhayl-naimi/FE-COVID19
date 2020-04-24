import { Component, OnInit } from '@angular/core';
import {ServCovidService} from '../services/serv-covid.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-home-ar',
  templateUrl: './home-ar.component.html',
  styleUrls: ['./home-ar.component.css']
})
export class HomeARComponent implements OnInit {

  public infected;
  public lastStatus;
  public previousStatus;
  public pPreviousStatus;
  chart = [];
  public regions;
  public pop;
  public rNames = [];
  public rNums = [];
  public lastDay;



  constructor(public servCovidService: ServCovidService) {
  }

  ngOnInit(): void {
    this.servCovidService.getInfected()
      .subscribe(data => {
        this.infected = data;
        this.lastStatus = this.infected._embedded.statuses[this.infected._embedded.statuses.length - 1];
        this.previousStatus = this.infected._embedded.statuses[this.infected._embedded.statuses.length - 2];
        this.pPreviousStatus = this.infected._embedded.statuses[this.infected._embedded.statuses.length - 3];
        if(this.lastStatus.lastUpdated.includes("18H00")){
          this.lastDay=this.lastStatus.infected-this.pPreviousStatus.infected;
        }else if(this.lastStatus.lastUpdated.includes("10H00")){
          this.lastDay=this.lastStatus.infected-this.previousStatus.infected;
        }
      }, error => {
        console.log(error);
      });
    this.servCovidService.getRegions().subscribe(data => {
      this.regions = data;
      this.regions.forEach(region => {
        this.rNames.push(region.name);
        this.rNums.push(region.numCases);
      });
      Chart.defaults.global.defaultFontSize = 16;
      Chart.defaults.global.defaultFontStyle = "bold";
      this.chart = new Chart('ctx', {
        type: 'pie',
        data: {
          labels: ['بني ملال - خنيفرة',
            'الدارالبيضاء - سطات',
            'درعة - تافيلالت',
          'الداخلة - وادي الذهب',
            'فاس مكناس',
            'كلميم - واد النون',
            'العيون - الساقية الحمراء',
            'مراكش - اسفي','الشرق',
            'القنيطرة - سلا - الرباط ',
            'سوس - ماسة',
            'طنجة - تطوان - الحسيمة'],
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
            position: 'right'
          }
        }
      });
    }, error => {
      console.log(error);
    });
    this.servCovidService.getPopulation().subscribe(data => {
      this.pop = data;
    }, error => {
      console.log(error);
    });

  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServCovidService {
  public host: string = 'http://localhost:8090';
  constructor(private http: HttpClient) {
  }
  getInfected() {
    return this.http.get(this.host+"/statuses?page=0&size=1000000");
  }
  getRegions(){
    return this.http.get(this.host+"/regions");
  }

  getPopulation() {
    return this.http.get(this.host+"/population");
  }
}

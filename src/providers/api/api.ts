import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// import { ClientInfo } from '../../models/reqClient';


@Injectable()
export class ApiProvider {
  baseApiUrl = 'http://localhost:3000';


  constructor(public http: HttpClient) {}

  // login(username, password): Observable<any> {
  // 	var headers = new Headers();
  // 	headers.append('Content-Type', 'application/json');

  // 	let loginData = { username: username, password: password };

  // 	return this.http.post(`${this.baseApiUrl}/jwt-auth/`, JSON.stringify(loginData), {headers: headers})
  //   	.map(res => <any>(res.json()));
  // }

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// GET //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

  // PULL DOCKER IMAGE BY NAME
  pullImage(repo_name): Observable<any> {
    let data = { repo_name: repo_name };

    return this.http.post(`${this.baseApiUrl}/pull_docker`, data);
  }

  // GET STATS OF CONTAINER
  getStatsOfContainer(id): Observable<any> {

    return this.http.get(`${this.baseApiUrl}/get_stats_of_container/${id}`);
  }

  // GET STATS OF CONTAINER
  getLogsOfContainer(id): Observable<any> {

    return this.http.get(`${this.baseApiUrl}/get_logs_of_container/${id}`);
  }

  // GET LIST OF CONTAINERS
  getListOfContainers(): any {

    return this.http.get(`${this.baseApiUrl}/get_list_of_containers`);
  }

  // GET LIST AVAILABLE IMAGES
  getListOfImages(): Observable<any> {

    return this.http.get(`${this.baseApiUrl}/get_list_of_images`);
  }

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// POST //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

  // CREATE CONTAINER FROM SPECIFIED IMAGE NAME (enhariharan/infinite-loop)
  createContainer(repo_name): Observable<any> {
    let data = { repo_name: repo_name };

// JSON.stringify(loginData), 
    return this.http.post(`${this.baseApiUrl}/create_container`, data);
  }

  // START CONTAINER
  startContainer(id): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.baseApiUrl}/start_container/${id}`, {});
  }

  // STOP CONTAINER
  stopContainer(id): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.baseApiUrl}/stop_container/${id}`, {});
  }

  // DELETE CONTAINER
  deleteContainer(id): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.baseApiUrl}/delete_container/${id}`, {});
  }

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//   getClient(token: string, username: string): Observable<any> {
//     var headers = new Headers();
//     // headers.append('Content-Type', 'application/json');
//     headers.append('Authorization', 'JWT ' + token);
//     let options = new RequestOptions({ headers: headers });

//     return this.http.get(`${this.baseApiUrl}/client/${username}/?format=json`, options)
//       .map(res => <ClientInfo>(res.json()));
//   }


//   createPayment(token: string, payment: any): Observable<any> {
//     var headers = new Headers();
//     headers.append('Authorization', 'JWT ' + token);
//     let options = new RequestOptions({ headers: headers });

//     return this.http.post(`${this.baseApiUrl}/payment_create/`, payment, options)
//       .map(res => <any>(res.json()));
//   }

}

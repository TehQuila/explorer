import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class LayoutService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  getLayout(dims: Map<number, [number, number]>, rels: [number, number][]) {
    const data = JSON.stringify({ "dims": this.mapToObject(dims), "rels": rels })
    return this.http.post( environment.backend_url + '/layout', data, this.options)
  }

  // ES6 Map is not json stringifiable
  private mapToObject(map: Map<number, [number, number]>): Object {
    let obj: { [x: number]: [number, number]; } = {}
    map.forEach((val, key) => {
      obj[key] = val
    });
    return obj
  }

  private static replacer(key: any, value: any) {
    if(value instanceof Map) {
      return Array.from(value.entries())
    } else {
      return value;
    }
  }
}

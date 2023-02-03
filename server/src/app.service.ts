import axios from 'axios'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getEmployees(page:number) {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  }

  async findEmployee(email:string) {
    const response = await axios.get(`https://reqres.in/api/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let employees = response.data.data.filter(e=>e.email === email)

    if(employees?.length > 0){
      return employees
    }
    const totalPages:number = response.data.total_pages
    const promises = Array.from({length: totalPages}, (_, i) => i+1).slice(1,).map(async p=>{
      const resp = await this.getEmployees(p);
      employees = [...employees, ...resp.data.filter(e=>e.email === email)]
      if(employees.length > 0){
        return employees
      }
    })
    await Promise.all(promises)
    return employees
  }
  
  
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TransDetailsService {
  private apiUrl = process.env.URL_LOGIN_API;

  async getTransactions(cookies: any): Promise<any> {
    try {
      let rows = [];
      const url = `${this.apiUrl}/transactions/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-type': 'application/json',
          Cookie: cookieString,
        },
      });
      rows = response.data.data.rows;
      return rows;
    } catch (error) {
      console.error('Error en la solicitud a la API:', error.message);
    }
  }
}

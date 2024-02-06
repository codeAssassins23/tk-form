import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TransactionService {
  private apiUrl = process.env.URL_LOGIN_API;

  async loginAPI(): Promise<any> {
    const url = `${this.apiUrl}/login/submitApiClientKeys`;
    const publicKey = process.env.PUBLIC_KEY_API;
    const secretKey = process.env.SECRET_KEY_API;

    const requestBody = {
      publicKey,
      secretKey,
      _getPage: true,
    };

    try {
      const response = await axios.post(url, requestBody);
      const requestCookie = response.headers['set-cookie'];
      return requestCookie;
    } catch (error) {
      console.error('Error en la solicitud a la API:', error.message);
    }
  }

  async getCurrency(cookies: any): Promise<any> {
    try {
      let rows = [];
      let allCurrency = [];
      const url = `${this.apiUrl}/reference/currencies/getList`;
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
      rows.forEach((element) => {
        let rowsFilter = {
          id: element.id,
          code: element.code,
        };
        allCurrency.push(rowsFilter);
      });
      return allCurrency;
    } catch (error) {}
  }

  async getTransactions(cookies: any): Promise<any> {}
}

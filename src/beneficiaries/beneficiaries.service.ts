import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Console, info } from 'console';
@Injectable()
export class BeneficiariesService {
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

  async getPurpose(cookies: any): Promise<any> {
    try {
      let rows = [];
      const url = `${this.apiUrl}/beneficiaries`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });
      rows = response.data.data.page.purposes;
      return rows;
    } catch (error) {
      console.log(error);
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

  async getCountries(cookies: any): Promise<any> {
    try {
      let rows = [];
      let all = [];
      const url = `${this.apiUrl}/reference/countries/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });
      rows = response.data.data.rows;
      rows.forEach((element) => {
        let rowsFilter = {
          id: element.id,
          name: element.name,
          nameFormat: element.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-'),
        };
        // Verifica si nameFormat coincide con alguna de las condiciones
        if (
          rowsFilter.nameFormat === 'bouvet-island' ||
          rowsFilter.nameFormat === 'svalbard-and-jan-mayen'
        ) {
          rowsFilter.nameFormat = 'default-image';
        }
        all.push(rowsFilter);
      });
      return all;
    } catch (error) {
      console.log(error);
    }
  }

  async getBeneficiaries(cookies: any, page: number): Promise<any> {
    let rows = [];

    let all = [];
    try {
      const requestBody = {
        sort: 'id',
        dir: 'asc',
        page: page,
        limit: 10,
        entityId: 14539,
        currencyId: '',
      };
      const url = `${this.apiUrl}/beneficiaries/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });

      rows = response.data.data.rows;
      let total = response.data.data.total;
      rows.forEach((element) => {
        let rowsFilter = {
          id: '',
          nickname: '',
          currency: '',
          bank_name: '',
          account_number: '',
          status: '',
          color: '',
        };
        rowsFilter.id = element.id;
        rowsFilter.nickname = element.nickname;
        rowsFilter.currency = element.currencyCode;
        rowsFilter.bank_name = element.bankName.slice(0, 30) + '...';
        rowsFilter.account_number = '*****' + element.accountNumber.slice(-4);
        rowsFilter.status = element.approvalStatus;
        if (element.approvalStatus === 'approved') {
          rowsFilter.color = 'success';
        } else {
          rowsFilter.color = 'danger';
        }
        all.push(rowsFilter);
      });
      return { all, total };
    } catch (error) {
      console.log(error);
    }
  }

  async searchGetBeneficiaries(
    cookies: any,
    search: string,
    searchCurrency: string,
    page: number,
  ) {
    let rows = [];

    let all = [];
    try {
      const requestBody = {
        sort: 'id',
        dir: 'asc',
        page: page,
        search: search,
        limit: 10,
        entityId: 14539,
        currencyId: searchCurrency,
      };
      const url = `${this.apiUrl}/beneficiaries/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });

      rows = response.data.data.rows;
      let total = response.data.data.total;
      rows.forEach((element) => {
        let rowsFilter = {
          id: '',
          nickname: '',
          currency: '',
          bank_name: '',
          account_number: '',
          status: '',
          color: '',
        };
        rowsFilter.id = element.id;
        rowsFilter.nickname = element.nickname;
        rowsFilter.currency = element.currencyCode;
        rowsFilter.bank_name = element.bankName.slice(0, 30) + '...';
        rowsFilter.account_number = '*****' + element.accountNumber.slice(-4);
        rowsFilter.status = element.approvalStatus;
        if (element.approvalStatus === 'approved') {
          rowsFilter.color = 'success';
        } else {
          rowsFilter.color = 'danger';
        }
        all.push(rowsFilter);
      });
      return { all, total };
    } catch (error) {
      console.log(error);
    }
  }

  async postBeneficiaries(cookies: any, data: any): Promise<any> {
    try {
      const cookieString = cookies.join('; ');
      const countries = data.countries;
      const currencies = data.currencies;
      const purpose = data.purpose;
      const beneData = data.step1Data;

      const bankData = data.step2Data;

      currencies.forEach((element) => {
        if (element.code === bankData.select2Bank_currency) {
          bankData.bankCurrency = bankData.select2Bank_currency;
          bankData.select2Bank_currency = element.id;
        }
      });
      countries.forEach((element) => {
        if (element.nameFormat === beneData.select2_country) {
          beneData.select2_country = element.id;
        }
      });
      countries.forEach((element) => {
        if (element.nameFormat === bankData.select2Bank_countries) {
          bankData.select2Bank_countries = element.id;
        }
      });

      purpose.forEach((element) => {
        if (element.name === beneData.select2Purpose) {
          beneData.select2Purpose = parseInt(element.id);
        }
      });

      if (bankData.inputMexico_SWIFT !== undefined) {
        bankData.routingCode = bankData.inputMexico_SWIFT;
        bankData.routingCodeType = 'swift';
        bankData.accountNumberType = 'clabe';
        bankData.accountNumber = bankData.inputMexico_clabe;
      }
      if (bankData.ABAunitedOne !== undefined) {
        bankData.routingCode = bankData.ABAunitedOne;
        bankData.routingCodeType = 'aba';
        bankData.accountNumberType = 'accountNumber';
        bankData.accountNumber = bankData.accountUnitedOne;
      }
      if (bankData.SWIFTunitedOne !== undefined) {
        bankData.routingCode = bankData.SWIFTunitedOne;
        bankData.routingCodeType = 'swift';

        if (bankData.accountUnitedTwo.length <= 18) {
          bankData.accountNumberType = 'accountNumber';
        } else {
          bankData.accountNumberType = 'iban';
        }
        bankData.accountNumber = bankData.accountUnitedTwo;
      }
      if (bankData.othersSwiftOne !== undefined) {
        bankData.routingCode = bankData.othersSwiftOne;
        bankData.routingCodeType = 'swift';
        if (bankData.othersAccountOne.length <= 18) {
          bankData.accountNumberType = 'accountNumber';
        } else {
          bankData.accountNumberType = 'iban';
        }
        bankData.accountNumber = bankData.othersAccountOne;
      }
      if (bankData.othersTransitTwo !== undefined) {
        bankData.routingCode = bankData.othersTransitTwo;
        bankData.routingCodeType = 'transitCode';
        bankData.accountNumberType = 'accountNumber';
        bankData.accountNumber = bankData.othersAccountTwo;
      }

      if (bankData.instructionsOtherstTwo !== undefined) {
        bankData.instructions = bankData.instructionsOtherstTwo;
      } else if (bankData.instructionsOtherstOne !== undefined) {
        bankData.instructions = bankData.instructionsOtherstOne;
      } else if (bankData.instructionsUSDOne !== undefined) {
        bankData.instructions = bankData.instructionsUSDOne;
      } else if (bankData.instructionsUSDTwo !== undefined) {
        bankData.instructions = bankData.instructionsUSDTwo;
      } else if (bankData.instructionsMXN !== undefined) {
        bankData.instructions = bankData.instructionsMXN;
      } else if (bankData.instruction !== undefined) {
        bankData.instructions = bankData.instruction;
      }
      const requestBodyBank = {
        accountNumber: bankData.accountNumber,
        accountNumberType: bankData.accountNumberType,
        type: 'main',
        countryId: bankData.select2Bank_countries,
        currencyCode: bankData.bankCurrency,
        routingCodeType: bankData.routingCodeType,
        routingCode: bankData.routingCode,
      };
      let responseBank = await axios({
        method: 'post',
        url: `${this.apiUrl}/beneficiaries/getBank`,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBodyBank,
      });

      let infoBank = responseBank.data;
      if (infoBank.err !== undefined) {
        return 'error';
      }
      if (beneData.purpose === undefined) {
        beneData.purpose = beneData.input_textArea;
      }

      const requestBodyBene = {
        currencyId: bankData.select2Bank_currency,
        name: beneData.text_name,
        nickname: beneData.text_nickname,
        countryId: beneData.select2_country,
        address1: beneData.text_address,
        address2: '',
        city: beneData.text_city,
        province: beneData.text_state,
        postal: beneData.text_postal,
        email: beneData.text_email,
        purposeId: beneData.select2Purpose,
        purposeDescription: beneData.purpose,
        mainBank: {
          routingCode: bankData.routingCode,
          routingCodeType: bankData.routingCodeType,
          accountNumber: bankData.accountNumber,
          accountNumberType: bankData.accountNumberType,
          name: bankData.bankName,
          address1: infoBank.data.address1,
          address2: infoBank.data.address2,
          city: infoBank.data.city,
          province: infoBank.data.province,
          countryId: bankData.select2Bank_countries,
          postCode: infoBank.data.postCode,
          instructions: bankData.instructions,
          key: infoBank.data.key,
        },
        furtherName: null,
        furtherAccountNumber: null,
      };
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/beneficiaries/save`,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBodyBene,
      });
      if (response.data.err !== undefined) {
        return 'error';
      }
      return 'success';
    } catch (error) {
      console.log(error);
    }
  }

  async putBeneficiaries(
    cookies: any,
    data: any,
    beneficiarie: any,
  ): Promise<any> {
    try {
      const cookieString = cookies.join('; ');
      const countries = data.countries;
      const currencies = data.currencies;
      const purpose = data.purpose;
      const beneData = data.step1Data;
      const bankData = data.step2Data;
      currencies.forEach((element) => {
        if (element.code === bankData.select2Bank_currency) {
          bankData.bankCurrency = bankData.select2Bank_currency;
          bankData.select2Bank_currency = element.id;
        }
      });
      countries.forEach((element) => {
        if (element.nameFormat === beneData.select2_country) {
          beneData.select2_country = element.id;
        }
      });
      countries.forEach((element) => {
        if (element.nameFormat === bankData.select2Bank_countries) {
          bankData.select2Bank_countries = element.id;
        }
      });

      purpose.forEach((element) => {
        if (element.name === beneData.select2Purpose) {
          beneData.select2Purpose = parseInt(element.id);
        }
      });

      if (bankData.inputMexico_SWIFT !== undefined) {
        bankData.routingCode = bankData.inputMexico_SWIFT;
        bankData.routingCodeType = 'swift';
        bankData.accountNumberType = 'clabe';
        bankData.accountNumber = bankData.inputMexico_clabe;
      }

      if (bankData.ABAunitedOne !== undefined) {
        bankData.routingCode = bankData.ABAunitedOne;
        bankData.routingCodeType = 'aba';
        bankData.accountNumberType = 'accountNumber';
        bankData.accountNumber = bankData.accountUnitedOne;
      }

      if (bankData.SWIFTunitedOne !== undefined) {
        bankData.routingCode = bankData.SWIFTunitedOne;
        bankData.routingCodeType = 'swift';

        if (bankData.accountUnitedTwo.length <= 18) {
          bankData.accountNumberType = 'accountNumber';
        } else {
          bankData.accountNumberType = 'iban';
        }
        bankData.accountNumber = bankData.accountUnitedTwo;
      }

      if (bankData.othersSwiftOne !== undefined) {
        bankData.routingCode = bankData.othersSwiftOne;
        bankData.routingCodeType = 'swift';
        if (bankData.othersAccountOne.length <= 18) {
          bankData.accountNumberType = 'accountNumber';
        } else {
          bankData.accountNumberType = 'iban';
        }
        bankData.accountNumber = bankData.othersAccountOne;
      }
      if (bankData.othersTransitTwo !== undefined) {
        bankData.routingCode = bankData.othersTransitTwo;
        bankData.routingCodeType = 'transitCode';
        bankData.accountNumberType = 'accountNumber';
        bankData.accountNumber = bankData.othersAccountTwo;
      }

      if (bankData.instructionsOtherstTwo !== undefined) {
        bankData.instructions = bankData.instructionsOtherstTwo;
      } else if (bankData.instructionsOtherstOne !== undefined) {
        bankData.instructions = bankData.instructionsOtherstOne;
      } else if (bankData.instructionsUSDOne !== undefined) {
        bankData.instructions = bankData.instructionsUSDOne;
      } else if (bankData.instructionsUSDTwo !== undefined) {
        bankData.instructions = bankData.instructionsUSDTwo;
      } else if (bankData.instructionsMXN !== undefined) {
        bankData.instructions = bankData.instructionsMXN;
      } else if (bankData.instruction !== undefined) {
        bankData.instructions = bankData.instruction;
      }

      if (beneData.purpose === undefined) {
        beneData.purpose = beneData.input_textArea;
      }

      const requestBodyBene = {
        id: beneficiarie.id,
        currencyId: bankData.select2Bank_currency,
        name: beneData.text_name,
        nickname: beneData.text_nickname,
        countryId: beneData.select2_country,
        address1: beneData.text_address,
        address2: '',
        city: beneData.text_city,
        province: beneData.text_state,
        postal: beneData.text_postal,
        email: beneData.text_email,
        purposeId: beneData.select2Purpose,
        purposeDescription: beneData.purpose,
        mainBank: {
          routingCode: bankData.routingCode,
          routingCodeType: bankData.routingCodeType,
          accountNumber: bankData.accountNumber,
          accountNumberType: bankData.accountNumberType,
          name: bankData.bankName,
          address1: bankData.bankAdressLine,
          address2: beneficiarie.mainBank.address2,
          city: beneficiarie.mainBank.city,
          province: beneficiarie.mainBank.province,
          countryId: bankData.select2Bank_countries,
          postCode: beneficiarie.mainBank.postCode,
          instructions: bankData.instructions,
          key: beneficiarie.mainBank.key,
        },
        furtherName: beneficiarie.furtherName,
        furtherAccountNumber: beneficiarie.furtherAccountNumber,
        isEnabled: beneficiarie.isEnabled,
      };

      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/beneficiaries/save`,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBodyBene,
      });
      if (response.data.err !== undefined) {
        return 'error';
      }
      return 'success';
    } catch (error) {
      console.log(error);
    }
  }

  async getViewBeneficiary(
    cookies: any,
    beneId: number,
    currencies: any,
    countries: any,
  ): Promise<any> {
    try {
      let rows = [];
      const url = `${this.apiUrl}/beneficiaries/view/${beneId}`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });

      let countryBene: string;
      let countryBank: string;
      let currencyBank: string;
      countries.forEach((element) => {
        if (response.data.data.page.bene.countryId === element.id) {
          countryBene = element.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-');
        }
        if (response.data.data.page.bene.mainBank.countryId === element.id) {
          countryBank = element.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-');
        }
      });
      response.data.data.page.bene.countryName = countryBene;
      response.data.data.page.bene.mainBank.countryName = countryBank;

      currencies.forEach((element) => {
        if (response.data.data.page.bene.currencyId === element.id) {
          currencyBank = element.code;
        }
      });
      response.data.data.page.bene.currencyName = currencyBank;
      rows = response.data.data.page;
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getViewEditBeneficiary(
    cookies: any,
    beneId: number,
    currencies: any,
    countries: any,
  ): Promise<any> {
    try {
      let rows = [];
      const url = `${this.apiUrl}/beneficiaries/edit/${beneId}`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });

      let countryBene: string;
      let countryBank: string;
      let currencyBank: string;
      countries.forEach((element) => {
        if (response.data.data.page.bene.countryId === element.id) {
          countryBene = element.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-');
        }
        if (response.data.data.page.bene.mainBank.countryId === element.id) {
          countryBank = element.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-');
        }
      });
      response.data.data.page.bene.countryName = countryBene;
      response.data.data.page.bene.mainBank.countryName = countryBank;

      currencies.forEach((element) => {
        if (response.data.data.page.bene.currencyId === element.id) {
          currencyBank = element.code;
        }
      });
      response.data.data.page.bene.currencyName = currencyBank;
      rows = response.data.data.page;
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

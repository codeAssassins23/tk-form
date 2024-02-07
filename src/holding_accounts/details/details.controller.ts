import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DetailService } from './details.service';
import { Roles } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/authRole.guard';
@Controller('/admin')
@UseGuards(RolesGuard)
export class DetailHolddingAccounts {
  constructor(private readonly detailService: DetailService) {}

  @Roles('ADMIN')
  @Get('/getHoldingAccounts/detail/:currencyCode')
  @Render('holding_accounts/detail_holding_account')
  async index(
    @Req() request: Request,
    @Param('currencyCode') currencyId: string,
  ) {
    const cookies = await this.detailService.loginAPI();
    const response = await this.detailService.getFlagCurrency(
      currencyId,
      cookies,
    );

    const flagNameCustom = '' + response.currencyCode;
    const user = request['user'];
    return {
      user: user,
      currencyCode: currencyId,
      balanceCurrency: response.balanceCurrency,
      flagname: flagNameCustom,
    };
  }

  @Roles('ADMIN')
  @Get('/holdingAccounts/detail/:currencyCode')
  async holddingAccount(
    @Query() queryParams,
    @Param('currencyCode') currencyCode: string,
  ) {
    const page = queryParams.start / 10;
    const dateFrom = queryParams.columns[1]?.search?.value;
    const dateTo = queryParams.columns[1]?.search?.regex;
    let search = queryParams.columns[0]?.search?.value;
    let currencyDeal = queryParams.columns[0]?.search?.regex;
    const cookies = await this.detailService.loginAPI();
    if (search !== '') {
      const responseSearch = await this.detailService.getSearchHolddingAccount(
        cookies,
        search,
        currencyDeal,
      );
      return { data: responseSearch.rows, recordsTotal: 1, recordsFiltered: 1 };
    }

    const response = await this.detailService.getDetailHoldingAccount(
      dateFrom,
      dateTo,
      currencyCode,
      page,
      cookies,
    );

    if (dateFrom === '' && dateTo === 'false') {
      return { data: response.rows, recordsTotal: 100, recordsFiltered: 100 };
    }
    return { data: response.rows, recordsTotal: 300, recordsFiltered: 300 };
  }
}

import {
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './holding.service';
import { Roles } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/authRole.guard';

@Controller('/admin')
@UseGuards(RolesGuard)
export class HoldingAccounts {
  constructor(private readonly apiService: ApiService) {}

  @Roles('ADMIN')
  @Get('/getHoldingAccounts')
  @Render('holding_accounts/holding')
  async index(@Req() request: Request) {
    const cookies = await this.apiService.loginAPI();
    const flags = await this.apiService.getHoldingFlags(cookies);
    const user = request['user'];
    return {
      user: user,
      flags: flags,
    };
  }

  @Roles('ADMIN')
  @Get('/getHolddingAccountTest')
  async holddingAccount(@Query() queryParams) {
    const cookies = await this.apiService.loginAPI();
    //pages
    const page = queryParams.start / 10;
    const holddingAccounts = await this.apiService.getHoldingAccounts(
      cookies,
      page,
    );
    if (holddingAccounts.length === 0) {
      return {
        data: holddingAccounts.data,
        recordsTotal: 40,
        recordsFiltered: 40,
      };
    }

    //search
    let search = queryParams.columns[0]?.search?.value;
    if (page) {
      search = '';
    }
    if (search !== '' && search !== 'All') {
      const resultSearch = await this.apiService.getHoldingSearchCurrency(
        cookies,
        search,
      );
      return { data: resultSearch.rows, recordsTotal: 1, recordsFiltered: 1 };
    } else {
      return {
        data: holddingAccounts.data,
        recordsTotal: 40,
        recordsFiltered: 40,
      };
    }
  }
}

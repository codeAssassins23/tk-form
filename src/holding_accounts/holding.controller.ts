import { Controller, Get, Render, Req } from '@nestjs/common';

@Controller('/admin')
export class HoldingAccounts {
  @Get('/getHoldingAccounts')
  @Render('holding_accounts/holding')
  index(@Req() request: Request) {
    const user = request['user'];
    return { user: user };
  }
}

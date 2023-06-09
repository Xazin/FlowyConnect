import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards';

export function AuthGuard(): <T extends () => void, Y>(
    target: Record<string, any> | T,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<Y>,
) => void {
    return applyDecorators(ApiBearerAuth('Authorization'), UseGuards(JwtAuthGuard));
}

export const CurrentUser = createParamDecorator((_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
});

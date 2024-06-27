import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { PAGE_MAX_SIZE, PAGE_MIN_SIZE } from './contants';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { limit, page } = value;

    // Ensure limit and page are valid numbers
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    if (isNaN(parsedLimit) || isNaN(parsedPage)) {
      throw new BadRequestException('Limit and page must be valid numbers');
    }

    // Validate the limit value
    if (parsedLimit > PAGE_MAX_SIZE || parsedLimit < PAGE_MIN_SIZE) {
      throw new BadRequestException(
        `The limit query parameter must be between ${PAGE_MIN_SIZE} and ${PAGE_MAX_SIZE}`,
      );
    }

    // Validate the page value
    if (parsedPage < 1) {
      throw new BadRequestException(
        'The page query parameter must be a positive number',
      );
    }

    return { limit: parsedLimit, page: parsedPage };
  }
}

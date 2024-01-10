import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  //todo - придумать механизм безопасности, чтобы не завалить сервер картинками
  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  findAll(): string {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.imageService.findOne(+id);
  }
}

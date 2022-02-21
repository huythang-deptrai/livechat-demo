import { Routes } from '@nestjs/core';
import { MessagesService } from './mesages.service';

export const appRoutes: Routes = [
  {
    path: 'messages',
    module: MessagesService,
    children: [],
  },
];
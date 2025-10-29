import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface VkPhotoSize {
  url: string;
  width: number;
  height: number;
  type: string;
}

interface VkPhoto {
  id: number;
  album_id: number;
  owner_id: number;
  sizes: VkPhotoSize[];
  text: string;
  date: number;
}

interface VkPhotosResponse {
  response?: {
    count: number;
    items: VkPhoto[];
  };
  error?: {
    error_code: number;
    error_msg: string;
  };
}

@Injectable()
export class VkService {
  constructor(private readonly configService: ConfigService) {}

  async getPhotos(): Promise<string[]> {
    const token = this.configService.get<string>('VK_TOKEN');
    const owner_id = -55673870; // ID группы 

    try {
      const response: AxiosResponse<VkPhotosResponse> = await axios.get(
        'https://api.vk.com/method/photos.get',
        {
          params: {
            owner_id,
            album_id: 'wall',
            count: 5,
            v: '5.199',
            access_token: token,
          },
        },
      );

      if (response.data.error) {
        throw new InternalServerErrorException(response.data.error.error_msg);
      }

      const items = response.data.response?.items ?? [];

      const photos = items.map((photo) => {
        const biggest = photo.sizes.at(-1);
        return biggest ? biggest.url : '';
      });

      return photos.filter((url) => url.length > 0);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: { error_msg: string } }>;
        const msg =
          axiosErr.response?.data?.error?.error_msg ?? 'Ошибка сети VK API';
        throw new InternalServerErrorException(msg);
      }

      console.error('Неизвестная ошибка VK API:', err);
      throw new InternalServerErrorException(
        'Не удалось получить фото из VK API',
      );
    }
  }
}

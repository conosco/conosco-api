export class ResponseDTO<T> {
  timestamp: string;
  statusCode: number;
  path: string;
  method: string;
  data: any;
  error: boolean;
  message: string;
}

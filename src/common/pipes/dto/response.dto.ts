export class ResponseDTO<T> {
  timestamp: string;
  statusCode: number;
  path: string;
  method: string;
  data: object;
  error: boolean;
  message: string;
}

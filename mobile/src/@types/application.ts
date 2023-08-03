export interface ApplicationBody {
  application: Application;
}

export interface Application {
  id: string;
  name: string;
  version: string;
  download_link: string;
  updated_at: Date;
}

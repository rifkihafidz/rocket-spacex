export interface DataRocket {
  name: string;
  type: string;
  cost_per_launch: number;
  first_flight: string;
  country: string;
  flickr_images: string[];
  description: string;
  id: string;
}

export class ConvertDataRocket {
  public static toRocketList(json: string): DataRocket[] {
    return JSON.parse(json)
  }

  public static toDataRocket(json: string): DataRocket {
    return JSON.parse(json)
  }

  public static rocketToJson(value: DataRocket | DataRocket[]): string {
    return JSON.stringify(value)
  }
}

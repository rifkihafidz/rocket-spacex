
export interface DataRocket {
  height:           Diameter;
  diameter:         Diameter;
  mass:             Mass;
  first_stage:      FirstStage;
  second_stage:     SecondStage;
  engines:          Engines;
  landing_legs:     LandingLegs;
  name:             string;
  type:             string;
  active:           boolean;
  stages:           number;
  boosters:         number;
  cost_per_launch:  number;
  success_rate_pct: number;
  first_flight:     Date;
  country:          string;
  company:          string;
  payload_weights:  PayloadWeight[];
  flickr_images:    string[];
  wikipedia:        string;
  description:      string;
  id:               string;
}

export interface Diameter {
  meters: number;
  feet:   number;
}

export interface Engines {
  isp:              ISP;
  thrust_sea_level: Thrust;
  thrust_vacuum:    Thrust;
  number:           number;
  type:             string;
  version:          string;
  layout:           string;
  engine_loss_max:  number;
  propellant_1:     string;
  propellant_2:     string;
  thrust_to_weight: number;
}

export interface ISP {
  sea_level: number;
  vacuum:    number;
}

export interface Thrust {
  kN:  number;
  lbf: number;
}

export interface FirstStage {
  thrust_sea_level: Thrust;
  thrust_vacuum:    Thrust;
  reusable:         boolean;
  engines:          number;
  fuel_amount_tons: number;
  burn_time_sec:    number;
}

export interface LandingLegs {
  number:   number;
  material: null;
}

export interface Mass {
  kg: number;
  lb: number;
}

export interface PayloadWeight {
  id:   string;
  name: string;
  kg:   number;
  lb:   number;
}

export interface SecondStage {
  thrust:           Thrust;
  payloads:         Payloads;
  reusable:         boolean;
  engines:          number;
  fuel_amount_tons: number;
  burn_time_sec:    number;
}

export interface Payloads {
  composite_fairing: CompositeFairing;
  option_1:          string;
}

export interface CompositeFairing {
  height:   Diameter;
  diameter: Diameter;
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

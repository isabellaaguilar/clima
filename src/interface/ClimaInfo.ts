export interface ClimaInfo {
    main: {
      temp: number;
      humidity: number;
     
    };
    weather: {
      description: string;
    }[];
    visibility: number;
  }
  
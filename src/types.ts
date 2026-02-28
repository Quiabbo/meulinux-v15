export interface Distro {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  categories: string[];
  basedOn: string;
  country: string;
  architecture: string;
  isoSize: string;
  officialSite: string;
  description: string;
  desktopEnvironments: string;
  mainFeatures: string;
  packageManager: string;
  preInstalledSoftware: string;
  hardwareCompatibility: string;
  communitySupport: string;
  comparison: string;
  screenshots?: string[];
}

export interface DistroMatchFilters {
  processor: string;
  memory: string;
  experience: string;
  objective: string;
  video: string;
}

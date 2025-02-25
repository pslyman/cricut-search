export interface Machine extends MachineAPIResponse {
  image: string;
}

export interface Tags {
  projectTags: string[];
  cutTypeTags: string[];
  toolTags: string[];
  materialTags: string[];
  specTags: string[];
  // for any later on
  [key: string]: string[];
}

export interface MachineAPIResponse {
  rank: number;
  id: number;
  name: string;
  description: string;
  tags: Tags;
  url: string;
}

export interface MachineImageAPIResponse {
  id: number;
  image: string;
}